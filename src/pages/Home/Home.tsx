import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ErrorButton } from '../../components/ErrorButton';
import { Results } from '../../components/Results';
import { Search } from '../../components/Search';
import { SelectedItemsFlyout } from '../../components/SelectedItemsFlyout';

import useLocalStorage from '../../hooks/useLocalStorage';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';

import {
  StyledDetailsColumn,
  StyledMainLayout,
  StyledPaginationButton,
  StyledPaginationControls,
  StyledPaginationLabel,
  StyledResultsColumn,
} from './Home.styles';

export function Home() {
  const [search, setSearch] = useLocalStorage('input');
  const [activeSearch, setActiveSearch] = useState(search);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const currentPage = parsedPage > 0 ? parsedPage : 1;

  const { data, isLoading, error } = useCharactersQuery(
    activeSearch,
    currentPage
  );
  const items = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;
  const errorMessage = error
    ? 'Unable to load characters right now. Check your connection and try again.'
    : null;

  const location = useLocation();
  const navigate = useNavigate();

  const isDetails = location.pathname.includes('/details');
  const shouldShowPagination = !isLoading && !errorMessage && items.length > 0;

  useEffect(() => {
    if (!pageParam) {
      setSearchParams({ page: '1' });
    }
  }, [pageParam, setSearchParams]);

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
            <Results items={items} isLoading={isLoading} error={errorMessage} />
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
