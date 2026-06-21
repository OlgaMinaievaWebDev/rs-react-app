'use client';

import { useLocale } from 'next-intl';

import { searchCharacters } from '../../app/[locale]/actions';
import { Search } from '../../components/Search';
import useLocalStorage from '../../hooks/useLocalStorage';

type SearchControlsProps = {
  searchTerm: string;
};

export function SearchControls({ searchTerm }: SearchControlsProps) {
  const [search, setSearch] = useLocalStorage('input', searchTerm);
  const locale = useLocale();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setSearch(search.trim());
  };

  return (
    <Search
      value={search}
      onChange={handleSearch}
      onSubmit={handleSubmit}
      action={searchCharacters}
      locale={locale}
    />
  );
}
