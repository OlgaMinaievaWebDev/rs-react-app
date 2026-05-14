import Search from './components/Search';
import Results from './components/Results';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

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

export function App() {
  const [search, setSearch] = useState(() => {
    return localStorage.getItem('input') ?? '';
  });
  const [items, setItems] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = (searchItems: string) => {
    setIsLoading(true);
    setError(null);
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const params = new URLSearchParams({ page: '1' });

    if (searchItems) {
      params.set('name', searchItems);
    }

    const url = `${baseUrl}/?${params.toString()}`;

    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new ApiError(
                'No characters found. Try another search term.',
                404
              );
            }

            throw new ApiError(
              `Request failed with status ${response.status}. Please try again later.`,
              response.status
            );
          }
          return response.json();
        })
        .then((data: CharactersResponse) => {
          setItems(data.results);
          setIsLoading(false);
        })
        .catch((error: unknown) => {
          const message =
            error instanceof ApiError
              ? error.message
              : 'Unable to load characters right now. Check your connection and try again.';

          setIsLoading(false);
          setError(message);
          setItems([]);
        });
    }, 300);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmed = search.trim();
    const saved = localStorage.getItem('input') ?? '';

    setSearch(trimmed);

    if (trimmed === saved) {
      return;
    }

    localStorage.setItem('input', trimmed);
    fetchItems(trimmed);
  };

  return (
    <>
      <ErrorBoundary>
        <Search
          value={search}
          onChange={handleSearch}
          onSearch={handleSearchClick}
        />
        <Results items={items} isLoading={isLoading} error={error} />
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}

export default App;
