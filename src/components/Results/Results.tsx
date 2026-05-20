import { useSearchParams } from 'react-router-dom';

import type { ResultsProps } from './Result.interfaces';
import {
  StyledLoader,
  StyledResultCard,
  StyledResultsSection,
} from './Results.styles';

export function Results({ items, isLoading, error }: ResultsProps) {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  if (isLoading) {
    return (
      <StyledResultsSection>
        <StyledLoader className="loader" />
      </StyledResultsSection>
    );
  }
  if (error) {
    return <StyledResultsSection>{error}</StyledResultsSection>;
  }

  if (!items.length) {
    return <StyledResultsSection>No results</StyledResultsSection>;
  }

  return (
    <StyledResultsSection>
      {items.map((item) => (
        <StyledResultCard to={`details/${item.id}?${params}`} key={item.id}>
          <h3>Name: {item.name}</h3>
          <p>
            Description: {item.species} character with {item.status} status.
          </p>
        </StyledResultCard>
      ))}
    </StyledResultsSection>
  );
}
