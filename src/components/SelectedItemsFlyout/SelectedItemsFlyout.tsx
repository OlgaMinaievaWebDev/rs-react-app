import { useTranslations } from 'next-intl';

import { useSelectedCharactersStore } from '../../store/store';
import { createCharactersCsv, downloadFile } from '../../utils/csv';
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

  const handleDownload = () => {
    const csvContent = createCharactersCsv(
      selectedCharacters,
      window.location.origin
    );

    downloadFile(csvContent, `${selectedCount}_items.csv`);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <StyledSelectedItemsFlyout>
      <StyledFlyoutContent>
        <span>{t('selected', { count: selectedCount })}</span>
        <StyledFlyoutActions>
          <StyledFlyoutButton onClick={clearSelection}>
            {t('unselectAll')}
          </StyledFlyoutButton>
          <StyledFlyoutButton onClick={handleDownload}>
            {t('download')}
          </StyledFlyoutButton>
        </StyledFlyoutActions>
      </StyledFlyoutContent>
    </StyledSelectedItemsFlyout>
  );
}
