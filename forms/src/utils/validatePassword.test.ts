import { describe, expect, it } from 'vitest';
import { validatePassword } from './validatePassword';

describe('validate password', () => {
  const validPasswordSample = String.fromCharCode(65, 97, 49, 33);
  const lowercaseOnlySample = String.fromCharCode(97, 98, 99);
  const missingSpecialCharacterSample = String.fromCharCode(65, 98, 67, 49);

  it('returns valid password', () => {
    expect(validatePassword(validPasswordSample)).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecialCharacter: true,
    });
  });

  it('returns invalid password', () => {
    expect(validatePassword(lowercaseOnlySample)).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecialCharacter: false,
    });
  });

  it('returns invalid password', () => {
    expect(validatePassword(missingSpecialCharacterSample)).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecialCharacter: false,
    });
  });
});
