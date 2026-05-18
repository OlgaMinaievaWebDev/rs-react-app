import {
  Outlet,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import Results from '../components/Results';
import Search from '../components/Search';
import './../App.css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
}

interface CharactersResponse {
  results: Character[];
  info: { pages: number };
}

export function Home() {
  const [search, setSearch] = useLocalStorage('input');
  const [submittedSearch, setSubmittedSearch] = useState(search);

  const [items, setItems] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const currentPage = parsedPage > 0 ? parsedPage : 1;

  const location = useLocation();
  const navigate = useNavigate();

  const isDetails = location.pathname.includes('/details');

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
          setTotalPages(data.info.pages);
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
    setSearch(trimmed);
    setSubmittedSearch(trimmed);
    navigate('/?page=1');
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    if (currentPage < totalPages) {
      navigate(`?page=${nextPage}`);
    }
  };

  const handlePrevClick = () => {
    const prevPage = currentPage - 1;
    if (currentPage > 1) {
      navigate(`?page=${prevPage}`);
    }
  };

  return (
    <>
      <ErrorBoundary>
        <Search
          value={search}
          onChange={handleSearch}
          onSearch={handleSearchClick}
        />
        <main
          className={isDetails ? 'main-layout details-open' : 'main-layout'}
        >
          <div className="left">
            {!isLoading && !error && items.length > 0 && (
              <p>
                {' '}
                current page {currentPage} of {totalPages} pages
              </p>
            )}
            <button onClick={handlePrevClick} disabled={currentPage === 1}>
              Prev
            </button>
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <Results items={items} isLoading={isLoading} error={error} />
          </div>

          <div className="right">
            <Outlet />
          </div>
        </main>
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}

export default Home;
