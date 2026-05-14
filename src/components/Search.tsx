import React from 'react';
import './Search.css';
interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function Search({ value, onChange, onSearch }: SearchProps) {
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
