import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Search } from './Search';

describe('Search component', () => {
  it('should render input and button', () => {
    const mock = vi.fn();
    render(<Search value="" onChange={mock} onSearch={mock} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    const userInput = screen.getByRole('textbox');
    expect(userInput).toBeInTheDocument();
  });
  it('should call onChange when user types', async () => {
    const event = userEvent.setup();
    const mock = vi.fn();
    render(<Search value="" onChange={mock} onSearch={mock} />);
    const searchInput = screen.getByRole('textbox');
    await event.type(searchInput, 'rick');
    expect(mock).toHaveBeenCalled();
  });
  it('should call onSearch when button clicked', async () => {
    const event = userEvent.setup();
    const onChangeMock = vi.fn();
    const onSearchMock = vi.fn();
    render(<Search value="" onChange={onChangeMock} onSearch={onSearchMock} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await event.click(searchButton);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
