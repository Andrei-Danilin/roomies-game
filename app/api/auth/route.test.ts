import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it } from 'vitest';
import { GET, STATE_COOKIE } from './route';

describe('GET /api/auth', () => {
  const originalClientId = process.env.DECAP_OAUTH_CLIENT_ID;

  afterEach(() => {
    process.env.DECAP_OAUTH_CLIENT_ID = originalClientId;
  });

  it('renders the popup handshake error page when DECAP_OAUTH_CLIENT_ID is not configured', async () => {
    delete process.env.DECAP_OAUTH_CLIENT_ID;
    const response = await GET(new NextRequest('http://localhost:3000/api/auth'));
    const body = await response.text();
    // Not a plain error response: this route runs inside Decap's popup, so a bare 500/JSON
    // response would leave the popup showing raw text with nothing posted to window.opener.
    expect(body).toContain('authorization:github:error');
    expect(body).toContain('DECAP_OAUTH_CLIENT_ID is not configured');
  });

  it('redirects to GitHub with client_id, redirect_uri, scope and a state param', async () => {
    process.env.DECAP_OAUTH_CLIENT_ID = 'test-client-id';
    const response = await GET(new NextRequest('http://localhost:3000/api/auth'));

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location')!);
    expect(location.origin).toBe('https://github.com');
    expect(location.pathname).toBe('/login/oauth/authorize');
    expect(location.searchParams.get('client_id')).toBe('test-client-id');
    expect(location.searchParams.get('redirect_uri')).toBe('http://localhost:3000/api/auth/callback');
    expect(location.searchParams.get('scope')).toBe('repo');
    expect(location.searchParams.get('state')).toBeTruthy();
  });

  it('sets an httpOnly state cookie matching the redirect state', async () => {
    process.env.DECAP_OAUTH_CLIENT_ID = 'test-client-id';
    const response = await GET(new NextRequest('http://localhost:3000/api/auth'));

    const location = new URL(response.headers.get('location')!);
    const cookie = response.cookies.get(STATE_COOKIE);
    expect(cookie?.value).toBe(location.searchParams.get('state'));
    expect(cookie?.httpOnly).toBe(true);
  });
});
