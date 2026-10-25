import { describe, expect, test } from 'vitest';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

describe('email validation', () => {
  test('accepts a valid email address', () => {
    expect(validateEmail('hello@djitt.co.uk')).toBe(true);
  });

  test('rejects an invalid email address', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
