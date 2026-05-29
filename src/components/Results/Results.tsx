import { useSearchParams } from 'react-router-dom';

import { useSelectedCharactersStore } from '../../store/store';
import { Loader } from '../Loader';
import type { ResultsProps } from './Result.interfaces';
import {
  StyledCheckbox,
  StyledResultCard,
  StyledResultsSection,
} from './Results.styles';

export function Results({ items, isLoading, error }: ResultsProps) {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const selectedCharacters = useSelectedCharactersStore(
    (state) => state.selectedCharacters
  );

  const addCharacter = useSelectedCharactersStore(
    (state) => state.addCharacter
  );

  const removeCharacter = useSelectedCharactersStore(
    (state) => state.removeCharacter
  );

  return (
    <StyledResultsSection>
      {isLoading && (
        <>
          <Loader />
          <p>Loading...</p>
        </>
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && !items.length && <p>No results</p>}
      {!isLoading &&
        !error &&
        items.map((item) => {
          const isSelected = selectedCharacters.some(
            (character) => character.id === item.id
          );

          return (
            <StyledResultCard to={`details/${item.id}?${params}`} key={item.id}>
              <h3>{item.name}</h3>
              <StyledCheckbox
                type="checkbox"
                aria-label={`Select ${item.name}`}
                checked={isSelected}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={() => {
                  if (isSelected) {
                    removeCharacter(item.id);
                  } else {
                    addCharacter(item);
                  }
                }}
              />
              <p>{item.species}</p>
            </StyledResultCard>
          );
        })}
    </StyledResultsSection>
  );
}
