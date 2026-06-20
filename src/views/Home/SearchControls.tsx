'use client';

import { useRouter } from '../../i18n/navigation';
import { Search } from '../../components/Search';
import useLocalStorage from '../../hooks/useLocalStorage';
import { createPageUrl } from './createPageUrl';

type SearchControlsProps = {
  searchTerm: string;
};

export function SearchControls({ searchTerm }: SearchControlsProps) {
  const [search, setSearch] = useLocalStorage('input', searchTerm);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = search.trim();
    setSearch(trimmed);
    router.push(createPageUrl(1, trimmed));
  };

  return (
    <Search
      value={search}
      onChange={handleSearch}
      onSearch={handleSearchClick}
    />
  );
}
