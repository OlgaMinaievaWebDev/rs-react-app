import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { Search } from './Search';
import { render, screen } from '@testing-library/react';

describe('Search component', () => {
  it('should render input and button', () => {
    const mock = vi.fn();
    render(<Search value="" onChange={mock} onSearch={mock} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    const userInput = screen.getByRole('textbox');
    expect(userInput).toBeInTheDocument();
  });
  it('should call onChange when user types', () => {});
  it('should call onSearch when button clicked', () => {});
});
