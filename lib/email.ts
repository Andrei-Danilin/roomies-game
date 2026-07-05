// Shared between NotifyForm's client-side check (UX only) and /api/notify's server-side check
// (the real boundary) so the two can't silently drift out of sync.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}
