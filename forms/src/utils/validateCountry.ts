export function validateCountry(country: string, countries: string[]): boolean {
  return countries.includes(country.trim());
}
