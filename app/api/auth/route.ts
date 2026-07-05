import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { htmlResponse, renderHandshakePage } from './handshake';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
export const STATE_COOKIE = 'decap_oauth_state';

// Starts the GitHub OAuth handshake Decap CMS's `github` backend expects when
// config.yml points auth_endpoint at this route instead of Netlify's hosted one.
export async function GET(request: NextRequest) {
  const clientId = process.env.DECAP_OAUTH_CLIENT_ID;
  if (!clientId) {
    // This route runs inside the popup Decap opens, not the main window — a plain error
    // response would leave the popup showing raw JSON with nothing posted to the opener,
    // so the CMS login screen would hang. Use the same handshake page as the callback route.
    return htmlResponse(renderHandshakePage('error', { message: 'DECAP_OAUTH_CLIENT_ID is not configured' }));
  }

  const state = randomBytes(16).toString('hex');
  const redirectUri = new URL('/api/auth/callback', request.url).toString();

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo');
  authorizeUrl.searchParams.set('state', state);

  const response = NextResponse.redirect(authorizeUrl);
  // Short-lived, httpOnly: only used to verify the state round-trip against CSRF on callback.
  // secure is tied to NODE_ENV rather than always true — `npm run dev` serves over plain HTTP,
  // and browsers silently drop `Secure` cookies there, breaking the whole flow locally.
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/api/auth',
  });
  return response;
}
