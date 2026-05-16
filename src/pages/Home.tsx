import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import Results from '../components/Results';
import Search from '../components/Search';
import './../App.css';
import { useEffect, useState } from 'react';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
}

interface CharactersResponse {
  results: Character[];
}

export function Home() {
  const [search, setSearch] = useState(() => {
    return localStorage.getItem('input') ?? '';
  });
  const [submittedSearch, setSubmittedSearch] = useState(() => {
    return localStorage.getItem('input') ?? '';
  });

  const [items, setItems] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const currentPage = parsedPage > 0 ? parsedPage : 1;

  const navigate = useNavigate();

  useEffect(() => {
    if (!pageParam) {
      setSearchParams({ page: '1' });
    }
  }, [pageParam, setSearchParams]);

  useEffect(() => {
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const params = new URLSearchParams({ page: currentPage.toString() });

    if (submittedSearch) {
      params.set('name', submittedSearch);
    }
    const url = `${baseUrl}/?${params.toString()}`;

    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      setError(null);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Request failed');
          }
          return response.json();
        })
        .then((data: CharactersResponse) => {
          setItems(data.results);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError(
            'Unable to load characters right now. Check your connection and try again.'
          );
          setItems([]);
        });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [submittedSearch, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = search.trim();
    const saved = localStorage.getItem('input') ?? '';

    setSearch(trimmed);
    setSubmittedSearch(trimmed);

    navigate('/?page=1');

    if (trimmed === saved) {
      return;
    }

    localStorage.setItem('input', trimmed);
  };

  return (
    <>
      <ErrorBoundary>
        <Search
          value={search}
          onChange={handleSearch}
          onSearch={handleSearchClick}
        />
        <Results items={items} isLoading={isLoading} error={error} />
        <Outlet />
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}

export default Home;
