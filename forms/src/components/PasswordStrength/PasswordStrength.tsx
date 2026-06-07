import { validatePassword } from '../../utils/validatePassword';

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = validatePassword(password);

  return (
    <div>
      <p>Number: {strength.hasNumber ? 'Yes ' : 'Missing'}</p>
      <p>Uppercase: {strength.hasUppercase ? 'Yes ' : 'Missing'}</p>
      <p>Lowercase: {strength.hasLowercase ? 'Yes ' : 'Missing'}</p>
      <p>
        Special character: {strength.hasSpecialCharacter ? 'Yes ' : 'Missing'}
      </p>
    </div>
  );
}
