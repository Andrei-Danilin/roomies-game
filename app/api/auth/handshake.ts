import { NextResponse } from 'next/server';

// The popup-window handshake Decap CMS's authenticator expects: post a ready signal to the
// opener, wait for its ack, then reply with the actual token payload. See Decap's docs on
// implementing a custom `github` backend OAuth client for the exact message format.
//
// The reply only goes to the opener if its origin matches this page's own origin: the popup
// and the admin page it was opened from are always same-origin in this flow (both served by
// this app), so anything else asking first is treated as untrusted and ignored rather than
// handed the token/error payload.
export function renderHandshakePage(status: 'success' | 'error', payload: Record<string, unknown>): string {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html>
<html>
<body>
<script>
(function () {
  function receiveMessage(e) {
    if (e.origin !== window.location.origin) {
      return;
    }
    window.opener.postMessage(
      ${JSON.stringify(message)},
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;
}

export function htmlResponse(body: string) {
  return new NextResponse(body, { headers: { 'Content-Type': 'text/html' } });
}
