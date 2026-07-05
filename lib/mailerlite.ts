import type { WaitlistSubscriber } from './subscriber-export';

const MAILERLITE_BASE_URL = 'https://connect.mailerlite.com/api';
const LIST_PAGE_LIMIT = 1000; // MailerLite's documented maximum per page

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

function requireConfig(): { apiKey: string; groupId: string } {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    throw new MailerLiteError('MailerLite is not configured', 500);
  }
  return { apiKey, groupId };
}

async function throwForErrorResponse(response: Response): Promise<never> {
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

// Upserts a subscriber into the configured waitlist group. MailerLite returns 201 for a new
// subscriber and 200 for an existing one it just updated — both are success per their API,
// not a "duplicate" error to special-case.
export async function subscribeToWaitlist(email: string): Promise<void> {
  const { apiKey, groupId } = requireConfig();

  const response = await fetch(`${MAILERLITE_BASE_URL}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, groups: [groupId] }),
  });

  if (!response.ok) {
    await throwForErrorResponse(response);
  }
}

interface SubscribersPage {
  data: { email: string; subscribed_at?: string | null }[];
  links: { next: string | null };
}

// Fetches every subscriber in the configured waitlist group, following cursor pagination —
// used by the weekly export job, not the per-signup /api/notify path.
export async function listGroupSubscribers(): Promise<WaitlistSubscriber[]> {
  const { apiKey, groupId } = requireConfig();

  const subscribers: WaitlistSubscriber[] = [];
  let url: string | null = `${MAILERLITE_BASE_URL}/groups/${groupId}/subscribers?limit=${LIST_PAGE_LIMIT}`;

  while (url) {
    const response: Response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
    });

    if (!response.ok) {
      await throwForErrorResponse(response);
    }

    const page: SubscribersPage = await response.json();
    for (const subscriber of page.data) {
      subscribers.push({ email: subscriber.email, subscribedAt: subscriber.subscribed_at ?? null });
    }
    url = page.links.next;
  }

  return subscribers;
}
