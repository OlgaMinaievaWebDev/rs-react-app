import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Results } from './Results';

describe('Results component', () => {
  it('should show loading state', () => {
    render(
      <Results items={[]} isLoading error={null} queryString="page=1" />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should show error message', () => {
    render(
      <Results
        items={[]}
        isLoading={false}
        error="Something went wrong"
        queryString="page=1"
      />
    );
    const errorMessage = screen.getByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should show empty state when there are no items', () => {
    render(
      <Results
        items={[]}
        isLoading={false}
        error={null}
        queryString="page=1"
      />
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
      <Results
        items={[item]}
        isLoading={false}
        error={null}
        queryString="page=1"
      />
    );
    const name = screen.getByText(item.name);
    const species = screen.getByText(item.species);
    expect(name).toBeInTheDocument();
    expect(species).toBeInTheDocument();
  });
});
