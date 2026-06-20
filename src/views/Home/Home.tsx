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
};

export function Home({ initialData, currentPage, searchTerm }: HomeProps) {
  const items = initialData.results;
  const totalPages = initialData.info.pages;
  const hasResults = items.length > 0;

  return (
    <ErrorBoundary>
      <SearchControls searchTerm={searchTerm} />
      <StyledMainLayout $isDetailsOpen={false}>
        <StyledResultsColumn $isDetailsOpen={false}>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            searchTerm={searchTerm}
            hasResults={hasResults}
          />
          <Results items={items} isLoading={false} error={null} />
          <SelectedItemsFlyout />
        </StyledResultsColumn>

        <StyledDetailsColumn $alignWithResults={hasResults} />
      </StyledMainLayout>
      <ErrorButton />
    </ErrorBoundary>
  );
}
