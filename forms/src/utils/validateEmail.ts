export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  const splitEmail = email.split('@');
  if (splitEmail.length !== 2) return false;

  const localPart = splitEmail[0];
  const domainPart = splitEmail[1];

  if (localPart.trim().length === 0) return false;
  if (domainPart.trim().length === 0 || !domainPart.trim().includes('.'))
    return false;
  return true;
}
