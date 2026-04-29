import React from 'react';
import type { Character } from '../App';
import './Results.css';

interface ResultsProps {
  items: Character[];
  isLoading: boolean;
  error: string | null;
}
export class Results extends React.Component<ResultsProps> {
  render() {
    const { items, isLoading, error } = this.props;

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
          <article className="result-card" key={item.id}>
            <h3>Name: {item.name}</h3>
            <p>Description: {item.species} character with {item.status} status.</p>
          </article>
        ))}
      </section>
    );
  }
}
