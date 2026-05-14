import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import Results from './Results';

describe('Results component', () => {
  it('should show loading state', () => {
    const { container } = render(<Results items={[]} isLoading error={null} />);
    const loader = container.querySelector('.loader');
    expect(loader).toBeInTheDocument();
  });
  it('should show error message', () => {
    render(
      <Results items={[]} isLoading={false} error="Something went wrong" />
    );
    const errorMessage = screen.getByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should show empty state when there are no items', () => {
    render(<Results items={[]} isLoading={false} error={null} />);
    const emptyMessage = screen.getByText('No results');
    expect(emptyMessage).toBeInTheDocument();
  });
  it('should render character items', () => {
    const item = {
      id: 1,
      name: 'Rick',
      species: 'Human',
      status: 'Alive',
    };
    render(<Results items={[item]} isLoading={false} error={null} />);
    const name = screen.getByText(`Name: ${item.name}`);
    const description = screen.getByText(
      `Description: ${item.species} character with ${item.status} status.`
    );
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
