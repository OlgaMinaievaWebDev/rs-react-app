import { useTranslations } from 'next-intl';

import type { SearchProps } from './Search.interfaces';

import {
  StyledInput,
  StyledSearchButton,
  StyledSearchHeader,
} from './Search.styles';

export function Search({
  value,
  onChange,
  onSubmit,
  action,
  locale,
}: SearchProps) {
  const t = useTranslations('Search');

  return (
    <StyledSearchHeader action={action} onSubmit={onSubmit}>
      <input type="hidden" name="locale" value={locale} />
      <StyledInput
        name="search"
        value={value}
        onChange={onChange}
        type="text"
        placeholder={t('placeholder')}
      />
      <StyledSearchButton type="submit">
        {t('button')}
      </StyledSearchButton>
    </StyledSearchHeader>
  );
}
