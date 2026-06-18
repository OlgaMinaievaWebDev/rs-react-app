import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';

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
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const currentPage = parsedPage > 0 ? parsedPage : 1;

  const { data, isLoading, error } = useCharactersQuery(
    activeSearch,
    currentPage
  );
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const items = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;
  const errorMessage = error
    ? 'Unable to load characters right now. Check your connection and try again.'
    : null;
  const isDetails = pathname.startsWith('/details');

  const shouldShowPagination = !isLoading && !errorMessage && items.length > 0;
  const shouldShowRefresh = !isLoading;

  useEffect(() => {
    if (!pageParam) {
      router.replace('/?page=1');
    }
  }, [pageParam, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = search.trim();
    setSearch(trimmed);
    setActiveSearch(trimmed);
    router.push('/?page=1');
  };

  const handleNextClick = () => {
    router.push(`/?page=${currentPage + 1}`);
  };

  const handlePrevClick = () => {
    router.push(`/?page=${currentPage - 1}`);
  };

  const handleRefreshClick = () => {
    void queryClient.invalidateQueries({
      queryKey: ['characters', activeSearch, currentPage],
    });
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
            {(shouldShowPagination || shouldShowRefresh) && (
              <StyledPaginationControls>
                {shouldShowPagination && (
                  <>
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
                  </>
                )}
                {shouldShowRefresh && (
                  <StyledPaginationButton
                    type="button"
                    onClick={handleRefreshClick}
                  >
                    Refresh
                  </StyledPaginationButton>
                )}
              </StyledPaginationControls>
            )}

            <Results items={items} isLoading={isLoading} error={errorMessage} />
            <SelectedItemsFlyout />
          </StyledResultsColumn>

          <StyledDetailsColumn
            $alignWithResults={shouldShowPagination}
          ></StyledDetailsColumn>
        </StyledMainLayout>
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}
