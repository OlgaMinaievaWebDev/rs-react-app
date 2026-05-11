import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
      }),
    });
  });

  it('loads with empty localStorage and fetches initial characters', async () => {
    localStorage.clear();
    vi.useFakeTimers();
    render(<App />);
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
    render(<App />);
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
    vi.useFakeTimers();
    render(<App />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    const input = screen.getByRole('textbox');
    await event.type(input, ' rick ');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await event.click(searchButton);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(localStorage.getItem('input')).toBe('rick');
    expect(fetch).toHaveBeenLastCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1&name=rick'
    );
  });
});
