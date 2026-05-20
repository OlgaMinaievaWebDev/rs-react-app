import type { SearchProps } from './Search.interfaces';
import './Search.css';

export function Search({ value, onChange, onSearch }: SearchProps) {
  return (
    <header className="search-section">
      <input
        value={value}
        onChange={onChange}
        className="search-input"
        type="text"
        placeholder="Search for item"
      />
      <button className="search-button" type="button" onClick={onSearch}>
        Search
      </button>
    </header>
  );
}
