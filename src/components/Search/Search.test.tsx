import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Search } from './Search';

const renderSearch = (
  onChange = vi.fn(),
  onSubmit = vi.fn(),
  action = vi.fn()
) =>
  render(
    <Search
      value=""
      onChange={onChange}
      onSubmit={onSubmit}
      action={action}
      locale="en"
    />
  );

describe('Search component', () => {
  it('renders a search form', () => {
    renderSearch();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderSearch(onChange);

    await user.type(screen.getByRole('textbox'), 'rick');

    expect(onChange).toHaveBeenCalled();
  });

  it('submits the form action', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const action = vi.fn();
    renderSearch(vi.fn(), onSubmit, action);

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(action).toHaveBeenCalledOnce();
  });
});
