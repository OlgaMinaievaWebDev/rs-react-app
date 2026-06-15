import { describe, expect, it } from 'vitest';
import { validateCountry } from './validateCountry';

describe('validateCountry', () => {
  const countries = ['Canada', 'Ukraine', 'Poland'];

  it('returns true when country exists in the list', () => {
    expect(validateCountry('Ukraine', countries)).toBe(true);
  });

  it('returns false when country is not in the list', () => {
    expect(validateCountry('Spain', countries)).toBe(false);
  });

  it('returns false for an empty country', () => {
    expect(validateCountry('', countries)).toBe(false);
  });
});
