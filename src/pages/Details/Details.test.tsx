import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Details } from './Details';

function LocationDisplay() {
  const location = useLocation();

  return <p>{location.search}</p>;
}

describe('Details component', () => {
  it('shows loading state before character data is loaded', () => {
    render(
      <MemoryRouter initialEntries={['/details/1?page=3']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders character details after successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick',
        species: 'Human',
        status: 'Alive',
      }),
    } as Response);
    render(
      <MemoryRouter initialEntries={['/details/1?page=3']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Rick/)).toBeInTheDocument();
  });

  it('shows an error message when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);
    render(
      <MemoryRouter initialEntries={['/details/1?page=3']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    expect(
      await screen.findByText(/Unable to load character/)
    ).toBeInTheDocument();
  });

  it('closes details and preserves the current page query', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick',
        species: 'Human',
        status: 'Alive',
      }),
    } as Response);
    const event = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/details/1?page=3']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Rick/)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /close/i });
    await event.click(closeBtn);
    expect(await screen.findByText('?page=3')).toBeInTheDocument();
  });
});
