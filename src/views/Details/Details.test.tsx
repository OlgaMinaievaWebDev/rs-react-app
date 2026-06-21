import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import type { Character } from '../../api/characters.interfaces';
import {
  mockRouterPush,
  mockRouterRefresh,
} from '../../setupTests';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { Details } from './Details';

const character: Character = {
  id: 1,
  name: 'Rick',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
};

const renderDetails = () =>
  renderWithProviders(<Details character={character} queryString="page=3" />);

describe('Details component', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
    mockRouterRefresh.mockClear();
  });

  it('renders server-provided character details', () => {
    renderDetails();

    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(
      screen.getByText('Description: Human character with Alive status.')
    ).toBeInTheDocument();
  });

  it('closes details and preserves the current page query', async () => {
    const user = userEvent.setup();
    renderDetails();

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(mockRouterPush).toHaveBeenCalledWith('/?page=3');
  });

  it('refreshes the server route when refresh is clicked', async () => {
    const user = userEvent.setup();
    renderDetails();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(mockRouterRefresh).toHaveBeenCalledOnce();
  });
});
