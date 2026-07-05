import { createHash, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { appendRows, readExistingEmails } from '@/lib/google-sheets';
import { listGroupSubscribers } from '@/lib/mailerlite';
import { findNewSubscribers } from '@/lib/subscriber-export';

// Hashing both sides to a fixed-length digest before comparing avoids leaking the secret's
// length via timingSafeEqual (which requires equal-length buffers and throws otherwise) —
// a plain string comparison would be timing-attackable, however low the practical risk here.
function secureCompare(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest();
  const digestB = createHash('sha256').update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

// Triggered weekly by Vercel Cron (see vercel.json). Vercel automatically sends
// `Authorization: Bearer ${CRON_SECRET}` for cron-triggered requests — this route rejects
// anything else, so it can't be invoked by a guessed/public URL.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  if (!cronSecret || !authHeader || !secureCompare(authHeader, `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [subscribers, existingEmails] = await Promise.all([listGroupSubscribers(), readExistingEmails()]);
    const newRows = findNewSubscribers(subscribers, existingEmails);

    // Vercel Cron delivery is best-effort and can occasionally double-invoke (see Vercel's
    // own cron docs). Re-reading existing emails immediately before appending — rather than
    // relying solely on the snapshot read above — shrinks (but doesn't eliminate, short of a
    // distributed lock, which isn't worth the added infra for a low-traffic weekly job) the
    // window in which two overlapping runs could both append the same new subscriber twice.
    const freshExistingEmails = await readExistingEmails();
    const rowsToAppend = findNewSubscribers(newRows, freshExistingEmails);

    await appendRows(rowsToAppend);
    return NextResponse.json({ ok: true, appended: rowsToAppend.length });
  } catch (error) {
    // No user-facing surface for a cron job — log the real cause for Vercel's function logs
    // rather than surfacing it anywhere, but never fail silently with no trace.
    console.error('Subscriber export failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Export failed' }, { status: 502 });
  }
}
