import { describe, it, expect, beforeEach } from 'vitest';

import { useSelectedCharactersStore } from './store';
import type { Character } from '../api/characters.interfaces';

const character: Character = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
};

const secondCharacter: Character = {
  id: 2,
  name: 'Morty Smith',
  species: 'Human',
  status: 'Alive',
};

describe('selected characters store', () => {
  beforeEach(() => {
    useSelectedCharactersStore.setState({ selectedCharacters: [] });
  });

  it('should start with empty selected characters', () => {
    const state = useSelectedCharactersStore.getState();
    expect(state.selectedCharacters).toEqual([]);
  });

  it('should add character', () => {
    const addCharacter = useSelectedCharactersStore.getState().addCharacter;
    addCharacter(character);
    const state = useSelectedCharactersStore.getState();
    expect(state.selectedCharacters).toEqual([character]);
  });

  it('should not add duplicate character', () => {
    const addCharacter = useSelectedCharactersStore.getState().addCharacter;
    addCharacter(character);
    addCharacter(character);
    const state = useSelectedCharactersStore.getState();
    expect(state.selectedCharacters).toEqual([character]);
  });

  it('should remove character', () => {
    const { addCharacter, removeCharacter } =
      useSelectedCharactersStore.getState();
    addCharacter(character);
    addCharacter(secondCharacter);
    removeCharacter(character.id);
    const state = useSelectedCharactersStore.getState();
    expect(state.selectedCharacters).toEqual([secondCharacter]);
  });

  it('should clear all characters', () => {
    const { addCharacter, clearCharacters } =
      useSelectedCharactersStore.getState();
    addCharacter(character);
    addCharacter(secondCharacter);
    clearCharacters();
    const state = useSelectedCharactersStore.getState();
    expect(state.selectedCharacters).toEqual([]);
  });

  it('should check if character is selected', () => {
    const { addCharacter, isSelected } = useSelectedCharactersStore.getState();
    addCharacter(character);
    expect(isSelected(character.id)).toBe(true);
    expect(isSelected(secondCharacter.id)).toBe(false);
  });
});
