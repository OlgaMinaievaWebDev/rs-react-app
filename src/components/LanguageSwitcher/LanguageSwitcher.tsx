'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import {
  StyledLanguageButton,
  StyledLanguageSwitcher,
} from './LanguageSwitcher.styles';
import type { routing } from '../../i18n/routing';

type Locale = (typeof routing.locales)[number];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }

    router.replace(pathname, { locale });
  };

  return (
    <StyledLanguageSwitcher>
      <StyledLanguageButton
        type="button"
        $isActive={currentLocale === 'en'}
        disabled={currentLocale === 'en'}
        onClick={() => handleLocaleChange('en')}
      >
        EN
      </StyledLanguageButton>
      <StyledLanguageButton
        type="button"
        $isActive={currentLocale === 'ru'}
        disabled={currentLocale === 'ru'}
        onClick={() => handleLocaleChange('ru')}
      >
        RU
      </StyledLanguageButton>
    </StyledLanguageSwitcher>
  );
}
