import { useTranslations } from 'next-intl';

import type { SearchProps } from './Search.interfaces';

import {
  StyledInput,
  StyledSearchButton,
  StyledSearchHeader,
} from './Search.styles';

export function Search({ value, onChange, onSearch }: SearchProps) {
  const t = useTranslations('Search');

  return (
    <StyledSearchHeader>
      <StyledInput
        value={value}
        onChange={onChange}
        type="text"
        placeholder={t('placeholder')}
      />
      <StyledSearchButton type="button" onClick={onSearch}>
        {t('button')}
      </StyledSearchButton>
    </StyledSearchHeader>
  );
}
