import { useSelectedCharactersStore } from '../../store/store';
import {
  StyledFlyoutActions,
  StyledFlyoutButton,
  StyledFlyoutContent,
  StyledSelectedItemsFlyout,
} from './SelectedItemsFlyout.style';

export function SelectedItemsFlyout() {
  const selectedCount = useSelectedCharactersStore(
    (state) => state.selectedCharacters.length
  );

  const clearSelection = useSelectedCharactersStore(
    (state) => state.clearCharacters
  );

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
          <StyledFlyoutButton>Download</StyledFlyoutButton>
        </StyledFlyoutActions>
      </StyledFlyoutContent>
    </StyledSelectedItemsFlyout>
  );
}
