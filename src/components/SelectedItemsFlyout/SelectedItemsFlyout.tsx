'use client';

import { useTranslations } from 'next-intl';

import { useSelectedCharactersStore } from '../../store/store';
import {
  StyledFlyoutActions,
  StyledFlyoutButton,
  StyledFlyoutContent,
  StyledSelectedItemsFlyout,
} from './SelectedItemsFlyout.style';

export function SelectedItemsFlyout() {
  const t = useTranslations('Flyout');
  const selectedCharacters = useSelectedCharactersStore(
    (state) => state.selectedCharacters
  );

  const selectedCount = selectedCharacters.length;

  const clearSelection = useSelectedCharactersStore(
    (state) => state.clearCharacters
  );

  if (selectedCount === 0) {
    return null;
  }

  return (
    <StyledSelectedItemsFlyout>
      <StyledFlyoutContent>
        <span>{t('selected', { count: selectedCount })}</span>
        <StyledFlyoutActions>
          <StyledFlyoutButton type="button" onClick={clearSelection}>
            {t('unselectAll')}
          </StyledFlyoutButton>
          <form action="/api/csv" method="POST">
            <input
              type="hidden"
              name="characters"
              value={JSON.stringify(selectedCharacters)}
            />
            <StyledFlyoutButton type="submit">
              {t('download')}
            </StyledFlyoutButton>
          </form>
        </StyledFlyoutActions>
      </StyledFlyoutContent>
    </StyledSelectedItemsFlyout>
  );
}
