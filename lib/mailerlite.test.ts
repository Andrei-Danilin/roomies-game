import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MailerLiteError, subscribeToWaitlist } from './mailerlite';

describe('subscribeToWaitlist', () => {
  const originalApiKey = process.env.MAILERLITE_API_KEY;
  const originalGroupId = process.env.MAILERLITE_GROUP_ID;

  beforeEach(() => {
    process.env.MAILERLITE_API_KEY = 'test-key';
    process.env.MAILERLITE_GROUP_ID = 'test-group';
  });

  afterEach(() => {
    process.env.MAILERLITE_API_KEY = originalApiKey;
    process.env.MAILERLITE_GROUP_ID = originalGroupId;
    vi.restoreAllMocks();
  });

  it('throws MailerLiteError when env vars are not configured', async () => {
    delete process.env.MAILERLITE_API_KEY;
    await expect(subscribeToWaitlist('a@b.com')).rejects.toThrow(MailerLiteError);
  });

  it('posts to the subscribers endpoint with Bearer auth and the group id', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 201 }));

    await subscribeToWaitlist('a@b.com');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://connect.mailerlite.com/api/subscribers',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer test-key' }),
        body: JSON.stringify({ email: 'a@b.com', groups: ['test-group'] }),
      }),
    );
  });

  it('resolves for both 201 (new) and 200 (existing subscriber updated)', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    await expect(subscribeToWaitlist('a@b.com')).resolves.toBeUndefined();
  });

  it('surfaces MailerLite validation errors', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'The given data was invalid.', errors: { email: ['bad email'] } }), {
        status: 422,
      }),
    );

    await expect(subscribeToWaitlist('a@b.com')).rejects.toThrow('bad email');
  });

  it('surfaces a generic error when the response has no JSON body', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('gateway error', { status: 502 }));
    await expect(subscribeToWaitlist('a@b.com')).rejects.toThrow('MailerLite request failed with status 502');
  });
});
