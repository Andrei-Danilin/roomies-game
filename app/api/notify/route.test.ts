import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MailerLiteError } from '@/lib/mailerlite';
import * as mailerlite from '@/lib/mailerlite';
import { POST } from './route';

function postRequest(body: unknown) {
  return new NextRequest('http://localhost:3000/api/notify', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/notify', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects a missing email', async () => {
    const response = await POST(postRequest({}));
    expect(response.status).toBe(400);
  });

  it('rejects an invalid email', async () => {
    const response = await POST(postRequest({ email: 'not-an-email' }));
    expect(response.status).toBe(400);
  });

  it('rejects an unparsable request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/notify', { method: 'POST', body: 'not json' });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('calls subscribeToWaitlist with the trimmed email and returns ok on success', async () => {
    const spy = vi.spyOn(mailerlite, 'subscribeToWaitlist').mockResolvedValue(undefined);

    const response = await POST(postRequest({ email: '  a@b.com  ' }));
    const body = await response.json();

    expect(spy).toHaveBeenCalledWith('a@b.com');
    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
  });

  it('returns a 502 without leaking internal details when MailerLite fails', async () => {
    vi.spyOn(mailerlite, 'subscribeToWaitlist').mockRejectedValue(new MailerLiteError('secret internal detail', 422));

    const response = await POST(postRequest({ email: 'a@b.com' }));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error).not.toContain('secret internal detail');
  });

  it('rethrows unexpected (non-MailerLiteError) failures', async () => {
    vi.spyOn(mailerlite, 'subscribeToWaitlist').mockRejectedValue(new Error('boom'));
    await expect(POST(postRequest({ email: 'a@b.com' }))).rejects.toThrow('boom');
  });
});
