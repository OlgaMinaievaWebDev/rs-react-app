import { create } from 'zustand';
import type { Character } from '../api/characters.interfaces';

interface SelectedCharactersState {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  clearCharacters: () => void;
  isSelected: (id: number) => boolean;
}

export const useSelectedCharactersStore = create<SelectedCharactersState>(
  (set, get) => ({
    selectedCharacters: [],

    addCharacter: (character) =>
      set((state) => {
        const isAlreadySelected = state.selectedCharacters.some(
          (selectedCharacter) => selectedCharacter.id === character.id
        );

        if (isAlreadySelected) {
          return state;
        }

        return {
          selectedCharacters: [...state.selectedCharacters, character],
        };
      }),

    removeCharacter: (id) =>
      set((state) => ({
        selectedCharacters: state.selectedCharacters.filter(
          (character) => character.id !== id
        ),
      })),

    clearCharacters: () => set({ selectedCharacters: [] }),

    isSelected: (id) =>
      get().selectedCharacters.some((character) => character.id === id),
  })
);
