import React from 'react';

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}
export class Search extends React.Component<SearchProps> {
  render() {
    const { value, onChange, onSearch } = this.props;

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
}
