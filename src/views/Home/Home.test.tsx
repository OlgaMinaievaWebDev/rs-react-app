import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import type { CharactersResponse } from '../../api/characters.interfaces';
import { mockRedirect } from '../../setupTests';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { Home } from '.';

const emptyInitialData: CharactersResponse = {
  results: [],
  info: { pages: 1 },
};

describe('Home component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockRedirect.mockClear();
  });

  it('renders characters provided by the server', () => {
    const initialData: CharactersResponse = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          species: 'Human',
          status: 'Alive',
        },
      ],
      info: { pages: 1 },
    };

    renderWithProviders(
      <Home initialData={initialData} currentPage={1} searchTerm="" />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('loads a saved search term from localStorage', () => {
    localStorage.setItem('input', 'rick');

    renderWithProviders(
      <Home initialData={emptyInitialData} currentPage={1} searchTerm="" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('rick');
  });

  it('stores a trimmed search term and submits the server action', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Home initialData={emptyInitialData} currentPage={1} searchTerm="" />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, ' rick ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('input')).toBe('rick');
    expect(mockRedirect).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { page: '1', search: 'rick' },
      },
      locale: 'en',
    });
  });
});
