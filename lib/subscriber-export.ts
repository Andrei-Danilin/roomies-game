// Shared shape between MailerLite's subscriber list and a Google Sheets row — both
// lib/mailerlite.ts and lib/google-sheets.ts import this type rather than each declaring
// their own structurally-identical interface.
export interface WaitlistSubscriber {
  email: string;
  subscribedAt: string | null;
}

// Pure diff: which MailerLite subscribers aren't in the sheet yet. Kept separate from the
// MailerLite/Sheets clients so this logic (the actual "what counts as new" decision) can be
// unit tested without mocking HTTP calls.
export function findNewSubscribers(
  subscribers: WaitlistSubscriber[],
  existingEmails: Set<string>,
): WaitlistSubscriber[] {
  return subscribers.filter((subscriber) => !existingEmails.has(subscriber.email));
}
