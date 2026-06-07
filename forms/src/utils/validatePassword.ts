interface PasswordStrengthResult {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialCharacter: boolean;
}

export function validatePassword(password: string): PasswordStrengthResult {
  const specialCharacters = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '+',
    '-',
    '=',
    '[',
    ']',
    '{',
    '}',
    ';',
    ':',
    "'",
    '"',
    ',',
    '.',
    '<',
    '>',
    '/',
    '?',
    '\\',
    '|',
    '`',
    '~',
  ];
  const result = {
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialCharacter: false,
    hasNumber: false,
  };

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      result.hasUppercase = true;
    } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      result.hasLowercase = true;
    } else if (specialCharacters.includes(char)) {
      result.hasSpecialCharacter = true;
    } else if (char >= '0' && char <= '9') {
      result.hasNumber = true;
    }
  }

  return result;
}
