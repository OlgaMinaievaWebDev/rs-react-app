import React from 'react';
import { Search } from './components/Search';
import { Results } from './components/Results';
import './App.css';

interface AppState {
  search: string;
  items: Character[];
  isLoading: boolean;
  error: string | null;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
}

interface CharactersResponse {
  results: Character[];
}
class App extends React.Component<object, AppState> {
  state: AppState = {
    search: '',
    items: [],
    isLoading: false,
    error: null,
  };

  componentDidMount(): void {
    const savedInput = localStorage.getItem('input') ?? '';

    this.setState({
      search: savedInput,
    });

    this.fetchItems(this.state.search);
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearchClick = () => {
    const trimmed = this.state.search.trim();
    const saved = localStorage.getItem('input');
    if (trimmed === saved) {
      return;
    }
    this.setState({
      search: trimmed,
    });
    localStorage.setItem('input', trimmed);
    this.fetchItems(trimmed);
  };

  fetchItems = (searchItems: string) => {
    this.setState({
      isLoading: true,
      error: null,
    });
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const url = searchItems ? `${baseUrl}/?name=${searchItems}` : baseUrl;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data: CharactersResponse) => {
        this.setState({
          items: data.results,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: 'Something went wrong',
          items: [],
        });
      });
  };

  render() {
    return (
      <>
        <Search
          value={this.state.search}
          onChange={this.handleSearch}
          onSearch={this.handleSearchClick}
        />
        <Results
          items={this.state.items}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
      </>
    );
  }
}

export default App;
