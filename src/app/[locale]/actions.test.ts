import { beforeEach, describe, expect, it } from 'vitest';

import { mockRedirect } from '../../setupTests';
import { searchCharacters } from './actions';

describe('searchCharacters', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  it('redirects to localized search results', async () => {
    const formData = new FormData();
    formData.set('locale', 'ru');
    formData.set('search', '  rick  ');

    await searchCharacters(formData);

    expect(mockRedirect).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { page: '1', search: 'rick' },
      },
      locale: 'ru',
    });
  });

  it('redirects without an empty search parameter', async () => {
    const formData = new FormData();
    formData.set('locale', 'en');
    formData.set('search', '   ');

    await searchCharacters(formData);

    expect(mockRedirect).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { page: '1' },
      },
      locale: 'en',
    });
  });

  it('falls back to English for an unsupported locale', async () => {
    const formData = new FormData();
    formData.set('locale', 'de');

    await searchCharacters(formData);

    expect(mockRedirect).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { page: '1' },
      },
      locale: 'en',
    });
  });
});
