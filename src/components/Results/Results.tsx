import { useTranslations } from 'next-intl';

import { SelectionCheckbox } from './SelectionCheckbox';
import { Loader } from '../Loader';
import type { ResultsProps } from './Result.interfaces';
import { StyledResultCard, StyledResultsSection } from './Results.styles';

export function Results({
  items,
  isLoading,
  error,
  queryString,
}: ResultsProps) {
  const t = useTranslations('Results');

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
          return (
            <StyledResultCard
              href={`/details/${item.id}${queryString ? `?${queryString}` : ''}`}
              key={item.id}
            >
              <h3>{item.name}</h3>
              <SelectionCheckbox
                character={item}
                label={t('select', { name: item.name })}
              />
              <p>{item.species}</p>
            </StyledResultCard>
          );
        })}
    </StyledResultsSection>
  );
}
