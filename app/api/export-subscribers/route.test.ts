import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as googleSheets from '@/lib/google-sheets';
import * as mailerlite from '@/lib/mailerlite';
import { GET } from './route';

function requestWithAuth(secret: string | null) {
  const headers = new Headers();
  if (secret !== null) {
    headers.set('authorization', `Bearer ${secret}`);
  }
  return new NextRequest('http://localhost:3000/api/export-subscribers', { headers });
}

describe('GET /api/export-subscribers', () => {
  const originalSecret = process.env.CRON_SECRET;

  beforeEach(() => {
    process.env.CRON_SECRET = 'test-secret';
  });

  afterEach(() => {
    process.env.CRON_SECRET = originalSecret;
    vi.restoreAllMocks();
  });

  it('rejects a request without the correct CRON_SECRET', async () => {
    const response = await GET(requestWithAuth('wrong-secret'));
    expect(response.status).toBe(401);
  });

  it('rejects a request when CRON_SECRET is not configured', async () => {
    delete process.env.CRON_SECRET;
    const response = await GET(requestWithAuth('anything'));
    expect(response.status).toBe(401);
  });

  it('rejects a request with no authorization header at all', async () => {
    const response = await GET(requestWithAuth(null));
    expect(response.status).toBe(401);
  });

  it('fetches subscribers and existing emails, appends only the new ones', async () => {
    vi.spyOn(mailerlite, 'listGroupSubscribers').mockResolvedValue([
      { email: 'a@b.com', subscribedAt: '2026-01-01' },
      { email: 'c@d.com', subscribedAt: '2026-01-02' },
    ]);
    vi.spyOn(googleSheets, 'readExistingEmails').mockResolvedValue(new Set(['a@b.com']));
    const appendSpy = vi.spyOn(googleSheets, 'appendRows').mockResolvedValue(undefined);

    const response = await GET(requestWithAuth('test-secret'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, appended: 1 });
    expect(appendSpy).toHaveBeenCalledWith([{ email: 'c@d.com', subscribedAt: '2026-01-02' }]);
  });

  it('excludes a subscriber that appeared in the sheet between the first and second read', async () => {
    // Simulates an overlapping/duplicate cron invocation: another run already appended
    // c@d.com by the time this run re-checks right before its own append call.
    vi.spyOn(mailerlite, 'listGroupSubscribers').mockResolvedValue([
      { email: 'a@b.com', subscribedAt: '2026-01-01' },
      { email: 'c@d.com', subscribedAt: '2026-01-02' },
    ]);
    vi.spyOn(googleSheets, 'readExistingEmails')
      .mockResolvedValueOnce(new Set(['a@b.com']))
      .mockResolvedValueOnce(new Set(['a@b.com', 'c@d.com']));
    const appendSpy = vi.spyOn(googleSheets, 'appendRows').mockResolvedValue(undefined);

    const response = await GET(requestWithAuth('test-secret'));
    const body = await response.json();

    expect(body).toEqual({ ok: true, appended: 0 });
    expect(appendSpy).toHaveBeenCalledWith([]);
  });

  it('returns a 502 without throwing when a dependency fails', async () => {
    vi.spyOn(mailerlite, 'listGroupSubscribers').mockRejectedValue(new Error('MailerLite down'));
    vi.spyOn(googleSheets, 'readExistingEmails').mockResolvedValue(new Set());

    const response = await GET(requestWithAuth('test-secret'));
    expect(response.status).toBe(502);
  });
});
