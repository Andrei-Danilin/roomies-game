import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/email';
import { MailerLiteError, subscribeToWaitlist } from '@/lib/mailerlite';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).email : undefined;

  // The client already validates with the same pattern, but a Route Handler must never trust
  // client input — this is the actual boundary check.
  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await subscribeToWaitlist(email.trim());
  } catch (error) {
    if (error instanceof MailerLiteError) {
      // Log the real cause server-side (Vercel function logs) — the client only ever gets
      // the generic message below, never MailerLite's specific error detail.
      console.error(`MailerLite subscribe failed (status ${error.status}): ${error.message}`);
      return NextResponse.json({ error: 'Could not add you to the waitlist. Please try again.' }, { status: 502 });
    }
    throw error;
  }

  return NextResponse.json({ ok: true });
}
