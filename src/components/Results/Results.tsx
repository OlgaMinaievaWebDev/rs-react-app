import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useSelectedCharactersStore } from '../../store/store';
import { Loader } from '../Loader';
import type { ResultsProps } from './Result.interfaces';
import {
  StyledCheckbox,
  StyledResultCard,
  StyledResultsSection,
} from './Results.styles';

export function Results({ items, isLoading, error }: ResultsProps) {
  const t = useTranslations('Results');
  const searchParams = useSearchParams() ?? new URLSearchParams();
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
          <p>{t('loading')}</p>
        </>
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && !items.length && <p>{t('empty')}</p>}
      {!isLoading &&
        !error &&
        items.map((item) => {
          const isSelected = selectedCharacters.some(
            (character) => character.id === item.id
          );

          return (
            <StyledResultCard
              href={`/details/${item.id}${params ? `?${params}` : ''}`}
              key={item.id}
            >
              <h3>{item.name}</h3>
              <StyledCheckbox
                type="checkbox"
                aria-label={t('select', { name: item.name })}
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
