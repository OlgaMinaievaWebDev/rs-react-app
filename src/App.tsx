import React from 'react';
import { Search } from './components/Search';
import { Results } from './components/Results';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

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

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
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

    this.fetchItems(savedInput);
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearchClick = () => {
    const trimmed = this.state.search.trim();
    const saved = localStorage.getItem('input') ?? '';

    this.setState({
      search: trimmed,
    });

    if (trimmed === saved) {
      return;
    }

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

    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new ApiError('No characters found. Try another search term.', 404);
            }

            throw new ApiError(
              `Request failed with status ${response.status}. Please try again later.`,
              response.status
            );
          }
          return response.json();
        })
        .then((data: CharactersResponse) => {
          this.setState({
            items: data.results,
            isLoading: false,
          });
        })
        .catch((error: unknown) => {
          const message =
            error instanceof ApiError
              ? error.message
              : 'Unable to load characters right now. Check your connection and try again.';

          this.setState({
            isLoading: false,
            error: message,
            items: [],
          });
        });
    }, 300);
  };

  render() {
    return (
      <>
        <ErrorBoundary>
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
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
