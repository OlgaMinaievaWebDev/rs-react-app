import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { fetchCharacters } from '../../api/characters';
import type { Character } from '../../api/characters.interfaces';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ErrorButton } from '../../components/ErrorButton';
import { Results } from '../../components/Results';
import { Search } from '../../components/Search';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  StyledDetailsColumn,
  StyledMainLayout,
  StyledPaginationButton,
  StyledPaginationControls,
  StyledPaginationLabel,
  StyledResultsColumn,
} from './Home.styles';
import { SelectedItemsFlyout } from '../../components/SelectedItemsFlyout';
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
  const shouldShowPagination = !isLoading && !error && items.length > 0;

  useEffect(() => {
    if (!pageParam) {
      setSearchParams({ page: '1' });
    }
  }, [pageParam, setSearchParams]);

  const loadCharacters = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCharacters(activeSearch, currentPage);
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
  }, [activeSearch, currentPage]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadCharacters();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadCharacters]);

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
    navigate(`?page=${currentPage + 1}`);
  };

  const handlePrevClick = () => {
    navigate(`?page=${currentPage - 1}`);
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
            {shouldShowPagination && (
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
            <SelectedItemsFlyout />
          </StyledResultsColumn>

          <StyledDetailsColumn $alignWithResults={shouldShowPagination}>
            <Outlet />
          </StyledDetailsColumn>
        </StyledMainLayout>
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}
