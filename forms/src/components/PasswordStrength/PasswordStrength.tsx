import { validatePassword } from '../../utils/validatePassword';

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = validatePassword(password);

  const renderStatus = (isValid: boolean) => (
    <span style={{ color: isValid ? '#166534' : '#b91c1c' }}>
      {isValid ? 'Yes' : 'Missing'}
    </span>
  );

  return (
    <div>
      <p>Number: {renderStatus(strength.hasNumber)}</p>
      <p>Uppercase: {renderStatus(strength.hasUppercase)}</p>
      <p>Lowercase: {renderStatus(strength.hasLowercase)}</p>
      <p>Special character: {renderStatus(strength.hasSpecialCharacter)}</p>
    </div>
  );
}
