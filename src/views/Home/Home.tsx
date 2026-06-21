import type { ReactNode } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ErrorButton } from '../../components/ErrorButton';
import { Results } from '../../components/Results';
import { SelectedItemsFlyout } from '../../components/SelectedItemsFlyout';
import type { CharactersResponse } from '../../api/characters.interfaces';
import {
  StyledDetailsColumn,
  StyledMainLayout,
  StyledResultsColumn,
} from './Home.styles';
import { PaginationControls } from './PaginationControls';
import { SearchControls } from './SearchControls';

export type HomeProps = {
  initialData: CharactersResponse;
  currentPage: number;
  searchTerm: string;
  detailsPanel?: ReactNode;
};

export function Home({
  initialData,
  currentPage,
  searchTerm,
  detailsPanel,
}: HomeProps) {
  const items = initialData.results;
  const totalPages = initialData.info.pages;
  const hasResults = items.length > 0;
  const resultParams = new URLSearchParams({ page: String(currentPage) });

  const isDetailsOpen = Boolean(detailsPanel);
  if (searchTerm) {
    resultParams.set('search', searchTerm);
  }

  const queryString = resultParams.toString();

  return (
    <ErrorBoundary>
      <SearchControls searchTerm={searchTerm} />
      <StyledMainLayout $isDetailsOpen={isDetailsOpen}>
        <StyledResultsColumn $isDetailsOpen={isDetailsOpen}>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
            hasResults={hasResults}
          />
          <Results
            items={items}
            isLoading={false}
            error={null}
            queryString={queryString}
          />
          <SelectedItemsFlyout />
        </StyledResultsColumn>

        <StyledDetailsColumn $alignWithResults={hasResults}>
          {detailsPanel}
        </StyledDetailsColumn>
      </StyledMainLayout>
      <ErrorButton />
    </ErrorBoundary>
  );
}
