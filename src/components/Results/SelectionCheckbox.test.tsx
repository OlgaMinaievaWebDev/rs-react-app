import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Character } from '../../api/characters.interfaces';
import { useSelectedCharactersStore } from '../../store/store';
import { SelectionCheckbox } from './SelectionCheckbox';

const character: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://example.com/rick.png',
  species: 'Human',
  status: 'Alive',
};

describe('SelectionCheckbox', () => {
  beforeEach(() => {
    useSelectedCharactersStore.setState({ selectedCharacters: [] });
  });

  it('adds and removes a selected character', async () => {
    const user = userEvent.setup();
    render(<SelectionCheckbox character={character} label="Select Rick" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Select Rick' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(useSelectedCharactersStore.getState().selectedCharacters).toEqual([
      character,
    ]);

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(useSelectedCharactersStore.getState().selectedCharacters).toEqual([]);
  });

  it('does not pass checkbox clicks to its parent', async () => {
    const parentClick = vi.fn();
    const user = userEvent.setup();
    render(
      <div onClick={parentClick}>
        <SelectionCheckbox character={character} label="Select Rick" />
      </div>
    );

    await user.click(screen.getByRole('checkbox', { name: 'Select Rick' }));
    expect(parentClick).not.toHaveBeenCalled();
  });
});
