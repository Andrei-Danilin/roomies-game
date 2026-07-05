import { createSign } from 'crypto';
import type { WaitlistSubscriber } from './subscriber-export';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
// Column A holds email, column B the MailerLite subscribed_at date — row 1 is a header.
// Assumes the sheet's tab is still named "Sheet1" (Google Sheets' default) — see the
// setup steps in CLAUDE.md, which now warn against renaming it.
const EMAIL_RANGE = 'Sheet1!A2:A';
const APPEND_RANGE = 'Sheet1!A:B';

export class GoogleSheetsError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'GoogleSheetsError';
  }
}

interface GoogleSheetsConfig {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

function requireConfig(): GoogleSheetsConfig {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const spreadsheetId = process.env.SUBSCRIBER_BACKUP_SPREADSHEET_ID;
  if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
    throw new GoogleSheetsError('Google Sheets export is not configured', 500);
  }
  // Vercel env vars can't hold literal newlines cleanly — the key is stored with escaped \n.
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
  return { clientEmail, privateKey, spreadsheetId };
}

// Server-to-server auth: signs a short-lived JWT with the service account's private key and
// exchanges it for an OAuth2 access token — no interactive consent flow, unlike the GitHub
// OAuth Decap CMS proxy in app/api/auth. See Google's "service account" auth docs.
async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: nowSeconds,
    exp: nowSeconds + 3600,
  };

  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = createSign('RSA-SHA256').update(signingInput).sign(privateKey);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new GoogleSheetsError(`Google token exchange failed with status ${response.status}`, response.status);
  }

  const body: { access_token?: string } = await response.json();
  if (!body.access_token) {
    throw new GoogleSheetsError('Google token exchange did not return an access token', 502);
  }
  return body.access_token;
}

async function authorizedFetch(config: GoogleSheetsConfig, url: string, init: RequestInit): Promise<Response> {
  const accessToken = await getAccessToken(config.clientEmail, config.privateKey);
  return fetch(url, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${accessToken}` },
  });
}

// Reads every email already recorded in the backup sheet, so the caller can dedup before
// appending — the sheet is a running history, not a snapshot that gets overwritten each run.
export async function readExistingEmails(): Promise<Set<string>> {
  const config = requireConfig();
  const url = `${SHEETS_BASE_URL}/${config.spreadsheetId}/values/${encodeURIComponent(EMAIL_RANGE)}`;

  const response = await authorizedFetch(config, url, { method: 'GET' });
  if (!response.ok) {
    throw new GoogleSheetsError(`Failed to read the backup sheet (status ${response.status})`, response.status);
  }

  const body: { values?: string[][] } = await response.json();
  const emails = (body.values ?? []).map((row) => row[0]).filter((email): email is string => Boolean(email));
  return new Set(emails);
}

// Appends new rows after the sheet's existing content — never overwrites, so a partial
// previous run or manual edits in the sheet are never clobbered.
export async function appendRows(rows: WaitlistSubscriber[]): Promise<void> {
  if (rows.length === 0) {
    return;
  }
  const config = requireConfig();
  const url = `${SHEETS_BASE_URL}/${config.spreadsheetId}/values/${encodeURIComponent(APPEND_RANGE)}:append?valueInputOption=RAW`;

  const response = await authorizedFetch(config, url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: rows.map((row) => [row.email, row.subscribedAt ?? '']) }),
  });

  if (!response.ok) {
    throw new GoogleSheetsError(`Failed to append to the backup sheet (status ${response.status})`, response.status);
  }
}
