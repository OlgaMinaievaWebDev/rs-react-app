import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { ErrorButton } from '../../components/ErrorButton';
import { Results } from '../../components/Results';
import { Search } from '../../components/Search';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Character, CharactersResponse } from './Home.interfaces';
import {
  StyledDetailsColumn,
  StyledMainLayout,
  StyledPaginationButton,
  StyledPaginationControls,
  StyledPaginationLabel,
  StyledResultsColumn,
} from './Home.styles';

const fetchCharacter = async (
  searchTerm: string,
  page: number
): Promise<CharactersResponse> => {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const params = new URLSearchParams({ page: page.toString() });
  if (searchTerm) {
    params.set('name', searchTerm);
  }
  const url = `${baseUrl}/?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  const data: CharactersResponse = await response.json();
  return data;
};

export function Home() {
  const [search, setSearch] = useLocalStorage('input');
  const [activeSearch, setActiveSearch] = useState(search);

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
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCharacter(activeSearch, currentPage);
        setItems(data.results);
        setTotalPages(data.info.pages);
      } catch {
        setError(
          'Unable to load characters right now. Check your connection and try again.'
        );
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCharacters();
  }, [activeSearch, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = search.trim();
    setSearch(trimmed);
    setActiveSearch(trimmed);
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
        <StyledMainLayout $isDetailsOpen={isDetails}>
          <StyledResultsColumn $isDetailsOpen={isDetails}>
            {!isLoading && !error && items.length > 0 && (
              <StyledPaginationControls>
                <StyledPaginationButton
                  onClick={handlePrevClick}
                  disabled={currentPage === 1}
                >
                  Prev
                </StyledPaginationButton>
                <StyledPaginationLabel>
                  Page {currentPage} of {totalPages}
                </StyledPaginationLabel>
                <StyledPaginationButton
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                >
                  Next
                </StyledPaginationButton>
              </StyledPaginationControls>
            )}
            <Results items={items} isLoading={isLoading} error={error} />
          </StyledResultsColumn>

          <StyledDetailsColumn>
            <Outlet />
          </StyledDetailsColumn>
        </StyledMainLayout>
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}
