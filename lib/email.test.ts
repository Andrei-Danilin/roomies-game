import { describe, expect, it } from 'vitest';
import { isValidEmail } from './email';

describe('isValidEmail', () => {
  it('accepts well-formed emails', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('name.surname@sub.example.co')).toBe(true);
  });

  it('rejects malformed input', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('@b.com')).toBe(false);
    expect(isValidEmail('a@b .com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
