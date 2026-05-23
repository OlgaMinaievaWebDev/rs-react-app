import { useSelectedCharactersStore } from '../../store/store';
import {
  StyledFlyoutActions,
  StyledFlyoutButton,
  StyledFlyoutContent,
  StyledSelectedItemsFlyout,
} from './SelectedItemsFlyout.style';

export function SelectedItemsFlyout() {
  const selectedCharacters = useSelectedCharactersStore(
    (state) => state.selectedCharacters
  );

  const selectedCount = selectedCharacters.length;

  const clearSelection = useSelectedCharactersStore(
    (state) => state.clearCharacters
  );

  const handleDownload = () => {
    const headers = ['id', 'name', 'status', 'species'];
    const headerRow = headers.join(',');
    const escapeCsvValue = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;
    const rows = selectedCharacters.map((character) =>
      [
        escapeCsvValue(character.id),
        escapeCsvValue(character.name),
        escapeCsvValue(character.status),
        escapeCsvValue(character.species),
      ].join(',')
    );
    const csvContent = [headerRow, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected-characters.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <StyledSelectedItemsFlyout>
      <StyledFlyoutContent>
        <span>{selectedCount} selected</span>
        <StyledFlyoutActions>
          <StyledFlyoutButton onClick={clearSelection}>
            Unselect all
          </StyledFlyoutButton>
          <StyledFlyoutButton onClick={handleDownload}>
            Download
          </StyledFlyoutButton>
        </StyledFlyoutActions>
      </StyledFlyoutContent>
    </StyledSelectedItemsFlyout>
  );
}
