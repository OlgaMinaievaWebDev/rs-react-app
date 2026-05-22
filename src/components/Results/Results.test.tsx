import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Results } from './Results';

describe('Results component', () => {
  it('should show loading state', () => {
    render(
      <MemoryRouter>
        <Results items={[]} isLoading error={null} />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should show error message', () => {
    render(
      <MemoryRouter>
        <Results items={[]} isLoading={false} error="Something went wrong" />
      </MemoryRouter>
    );
    const errorMessage = screen.getByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should show empty state when there are no items', () => {
    render(
      <MemoryRouter>
        <Results items={[]} isLoading={false} error={null} />;
      </MemoryRouter>
    );
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
    render(
      <MemoryRouter>
        <Results items={[item]} isLoading={false} error={null} />
      </MemoryRouter>
    );
    const name = screen.getByText(item.name);
    const species = screen.getByText(item.species);
    expect(name).toBeInTheDocument();
    expect(species).toBeInTheDocument();
  });
});
