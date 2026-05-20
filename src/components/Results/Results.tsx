import { Link, useSearchParams } from 'react-router-dom';

import type { ResultsProps } from './Result.interfaces';
import './Results.css';

export function Results({ items, isLoading, error }: ResultsProps) {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  if (isLoading) {
    return (
      <section className="results-section">
        <div className="loader"></div>
      </section>
    );
  }
  if (error) {
    return <section className="results-section">{error}</section>;
  }

  if (!items.length) {
    return <section className="results-section">No results</section>;
  }

  return (
    <section className="results-section">
      {items.map((item) => (
        <Link
          to={`details/${item.id}?${params}`}
          className="result-card"
          key={item.id}
        >
          <h3>Name: {item.name}</h3>
          <p>
            Description: {item.species} character with {item.status} status.
          </p>
        </Link>
      ))}
    </section>
  );
}
