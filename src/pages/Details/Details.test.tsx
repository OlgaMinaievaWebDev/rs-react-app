import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Details } from './Details';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

function LocationDisplay() {
  const location = useLocation();

  return <p>{location.search}</p>;
}

const renderDetails = (initialEntry = '/details/1?page=3') => {
  return renderWithProviders(
    <Routes>
      <Route path="/details/:id" element={<Details />} />
      <Route path="/" element={<LocationDisplay />} />
    </Routes>,
    { initialEntries: [initialEntry] }
  );
};

describe('Details component', () => {
  it('shows loading state before character data is loaded', () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(
      new Promise(() => {}) as Promise<Response>
    );
    renderDetails();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.getByRole('status', { name: /loading character details/i })
    ).toBeInTheDocument();
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
    renderDetails();
    expect(await screen.findByText(/Rick/)).toBeInTheDocument();
    expect(
      screen.getByText('Description: Human character with Alive status.')
    ).toBeInTheDocument();
  });

  it('shows an error message when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);
    renderDetails();
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
    renderDetails();

    expect(await screen.findByText(/Rick/)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /close/i });
    await event.click(closeBtn);
    expect(await screen.findByText('?page=3')).toBeInTheDocument();
  });

  it('refetches character when refresh is clicked', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick',
        species: 'Human',
        status: 'Alive',
      }),
    } as Response);
    const event = userEvent.setup();
    renderDetails();
    expect(await screen.findByText(/Rick/)).toBeInTheDocument();
    const refreshBtn = screen.getByRole('button', { name: /refresh/i });
    const callsBeforeRefresh = fetchMock.mock.calls.length;

    await event.click(refreshBtn);

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBeGreaterThan(callsBeforeRefresh);
    });
    expect(
      screen.getByText('Description: Human character with Alive status.')
    ).toBeInTheDocument();
  });
});
