import { NextRequest } from 'next/server';
import { htmlResponse, renderHandshakePage } from '../handshake';
import { STATE_COOKIE } from '../route';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = request.cookies.get(STATE_COOKIE)?.value;

  const clientId = process.env.DECAP_OAUTH_CLIENT_ID;
  const clientSecret = process.env.DECAP_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse(renderHandshakePage('error', { message: 'OAuth client is not configured' }));
  }

  if (!code || !state || !savedState || state !== savedState) {
    const response = htmlResponse(renderHandshakePage('error', { message: 'Invalid or missing OAuth state' }));
    response.cookies.delete(STATE_COOKIE);
    return response;
  }

  let tokenData: { access_token?: string; error?: string; error_description?: string };
  try {
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: new URL('/api/auth/callback', request.url).toString(),
      }),
    });
    if (!tokenResponse.ok) {
      throw new Error(`GitHub responded with ${tokenResponse.status}`);
    }
    tokenData = await tokenResponse.json();
  } catch {
    // Network failure or a non-JSON body — without this, the exception would propagate out
    // of the Route Handler and Next would serve its generic error page instead of the
    // handshake page Decap's popup flow is waiting on, leaving the CMS login hung forever.
    const response = htmlResponse(renderHandshakePage('error', { message: 'GitHub token exchange failed' }));
    response.cookies.delete(STATE_COOKIE);
    return response;
  }

  if (tokenData.error || !tokenData.access_token) {
    const response = htmlResponse(
      renderHandshakePage('error', { message: tokenData.error_description || 'GitHub token exchange failed' }),
    );
    response.cookies.delete(STATE_COOKIE);
    return response;
  }

  const response = htmlResponse(
    renderHandshakePage('success', { token: tokenData.access_token, provider: 'github' }),
  );
  response.cookies.delete(STATE_COOKIE);
  return response;
}
