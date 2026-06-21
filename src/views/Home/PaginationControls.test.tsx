import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { mockRouterPush, mockRouterRefresh } from '../../setupTests';
import { PaginationControls } from './PaginationControls';

describe('PaginationControls', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
    mockRouterRefresh.mockClear();
  });

  it('navigates between pages and refreshes the current page', async () => {
    const user = userEvent.setup();
    render(
      <PaginationControls
        currentPage={2}
        totalPages={3}
        searchTerm="rick"
        hasResults
      />
    );

    await user.click(screen.getByRole('button', { name: 'Prev' }));
    expect(mockRouterPush).toHaveBeenLastCalledWith('/?page=1&search=rick');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockRouterPush).toHaveBeenLastCalledWith('/?page=3&search=rick');

    await user.click(screen.getByRole('button', { name: 'Refresh' }));
    expect(mockRouterRefresh).toHaveBeenCalledOnce();
  });

  it('disables navigation at the only available page', () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={1}
        searchTerm=""
        hasResults
      />
    );

    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('shows only refresh when there are no results', () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={0}
        searchTerm="missing"
        hasResults={false}
      />
    );

    expect(screen.queryByRole('button', { name: 'Prev' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });
});
