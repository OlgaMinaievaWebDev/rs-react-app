'use server';

import { hasLocale } from 'next-intl';

import { redirect } from '../../i18n/navigation';
import { routing } from '../../i18n/routing';

export async function searchCharacters(formData: FormData) {
  const localeValue = formData.get('locale');
  const locale = hasLocale(routing.locales, localeValue)
    ? localeValue
    : routing.defaultLocale;
  const searchValue = formData.get('search');
  const searchTerm =
    typeof searchValue === 'string' ? searchValue.trim() : '';
  const query = searchTerm
    ? { page: '1', search: searchTerm }
    : { page: '1' };

  redirect({
    href: { pathname: '/', query },
    locale,
  });
}
