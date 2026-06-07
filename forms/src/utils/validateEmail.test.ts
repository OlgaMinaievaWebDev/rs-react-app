import { describe, expect, it } from 'vitest';
import { validateEmail } from './validateEmail';

describe('validate email', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('user@test.com')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(validateEmail('not-an-email')).toBe(false);
  });

  it('returns false for common invalid email formats', () => {
    const invalidEmails = ['', 'user', 'user@', '@test.com', 'user@test'];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
