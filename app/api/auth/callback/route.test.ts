import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STATE_COOKIE } from '../route';
import { GET } from './route';

function requestWithState(url: string, state: string | null) {
  const request = new NextRequest(url);
  if (state) {
    request.cookies.set(STATE_COOKIE, state);
  }
  return request;
}

describe('GET /api/auth/callback', () => {
  const originalClientId = process.env.DECAP_OAUTH_CLIENT_ID;
  const originalClientSecret = process.env.DECAP_OAUTH_CLIENT_SECRET;

  beforeEach(() => {
    process.env.DECAP_OAUTH_CLIENT_ID = 'test-client-id';
    process.env.DECAP_OAUTH_CLIENT_SECRET = 'test-client-secret';
  });

  afterEach(() => {
    process.env.DECAP_OAUTH_CLIENT_ID = originalClientId;
    process.env.DECAP_OAUTH_CLIENT_SECRET = originalClientSecret;
    vi.restoreAllMocks();
  });

  it('rejects a request with a state that does not match the cookie, and clears it', async () => {
    const request = requestWithState(
      'http://localhost:3000/api/auth/callback?code=abc&state=mismatch',
      'expected-state',
    );
    const response = await GET(request);
    const body = await response.text();
    expect(body).toContain('Invalid or missing OAuth state');
    expect(response.cookies.get(STATE_COOKIE)?.value).toBe('');
  });

  it('rejects a request missing the code param', async () => {
    const request = requestWithState('http://localhost:3000/api/auth/callback?state=s', 's');
    const response = await GET(request);
    const body = await response.text();
    expect(body).toContain('Invalid or missing OAuth state');
  });

  it('exchanges a valid code for a token and posts the success handshake', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ access_token: 'gho_test_token' }), { status: 200 }),
    );

    const request = requestWithState('http://localhost:3000/api/auth/callback?code=abc&state=s', 's');
    const response = await GET(request);
    const body = await response.text();

    expect(body).toContain('authorization:github:success');
    expect(body).toContain('gho_test_token');
  });

  it('surfaces a GitHub token-exchange error via the failure handshake', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'bad_verification_code', error_description: 'code expired' }), {
        status: 200,
      }),
    );

    const request = requestWithState('http://localhost:3000/api/auth/callback?code=abc&state=s', 's');
    const response = await GET(request);
    const body = await response.text();

    expect(body).toContain('authorization:github:error');
    expect(body).toContain('code expired');
  });

  it('renders the failure handshake instead of throwing when the token request itself fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));

    const request = requestWithState('http://localhost:3000/api/auth/callback?code=abc&state=s', 's');
    const response = await GET(request);
    const body = await response.text();

    expect(body).toContain('authorization:github:error');
    expect(body).toContain('GitHub token exchange failed');
  });

  it('renders the failure handshake when GitHub responds with a non-2xx status', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('rate limited', { status: 502 }));

    const request = requestWithState('http://localhost:3000/api/auth/callback?code=abc&state=s', 's');
    const response = await GET(request);
    const body = await response.text();

    expect(body).toContain('authorization:github:error');
  });

  it('only relays the handshake message to a same-origin reply', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ access_token: 'gho_test_token' }), { status: 200 }),
    );

    const request = requestWithState('http://localhost:3000/api/auth/callback?code=abc&state=s', 's');
    const response = await GET(request);
    const body = await response.text();

    expect(body).toContain('e.origin !== window.location.origin');
  });
});
