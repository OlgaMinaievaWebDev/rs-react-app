import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { Home } from '.';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
        info: { pages: 1 },
      }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads with empty localStorage and fetches initial characters', async () => {
    localStorage.clear();
    vi.useFakeTimers();
    renderWithProviders(<Home />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(fetch).toHaveBeenLastCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  });

  it('loads saved search term from localStorage', async () => {
    localStorage.setItem('input', 'rick');
    vi.useFakeTimers();
    renderWithProviders(<Home />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('rick');
    expect(fetch).toHaveBeenLastCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1&name=rick'
    );
  });

  it('saves trimmed search term to localStorage when search button is clicked', async () => {
    const event = userEvent.setup();

    renderWithProviders(<Home />);

    const input = screen.getByRole('textbox');
    await event.type(input, ' rick ');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await event.click(searchButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
    });

    expect(localStorage.getItem('input')).toBe('rick');
    expect(fetch).toHaveBeenLastCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1&name=rick'
    );
  });
});
