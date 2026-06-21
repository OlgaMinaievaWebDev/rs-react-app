'use client';

import type { Character } from '../../api/characters.interfaces';
import { useSelectedCharactersStore } from '../../store/store';
import { StyledCheckbox } from './Results.styles';

type SelectedCheckboxProps = {
  character: Character;
  label: string;
};

export function SelectionCheckbox({ character, label }: SelectedCheckboxProps) {
  const selectedCharacters = useSelectedCharactersStore(
    (state) => state.selectedCharacters
  );
  const addCharacter = useSelectedCharactersStore(
    (state) => state.addCharacter
  );
  const removeCharacter = useSelectedCharactersStore(
    (state) => state.removeCharacter
  );
  const isSelected = selectedCharacters.some(
    (item) => item.id === character.id
  );

  const handleChange = () => {
    if (isSelected) {
      removeCharacter(character.id);
      return;
    }
    addCharacter(character);
  };

  return (
    <StyledCheckbox
      type="checkbox"
      aria-label={label}
      checked={isSelected}
      onClick={(e) => e.stopPropagation()}
      onChange={handleChange}
    />
  );
}
