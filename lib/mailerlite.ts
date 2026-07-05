const MAILERLITE_SUBSCRIBERS_URL = 'https://connect.mailerlite.com/api/subscribers';

export class MailerLiteError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'MailerLiteError';
  }
}

interface MailerLiteErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

// Upserts a subscriber into the configured waitlist group. MailerLite returns 201 for a new
// subscriber and 200 for an existing one it just updated — both are success per their API,
// not a "duplicate" error to special-case.
export async function subscribeToWaitlist(email: string): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    throw new MailerLiteError('MailerLite is not configured', 500);
  }

  const response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, groups: [groupId] }),
  });

  if (response.ok) {
    return;
  }

  let body: MailerLiteErrorBody = {};
  try {
    body = await response.json();
  } catch {
    // Non-JSON error body — fall through with the generic message below.
  }

  const message =
    body.errors?.email?.[0] || body.message || `MailerLite request failed with status ${response.status}`;
  throw new MailerLiteError(message, response.status);
}
