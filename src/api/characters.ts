import type {
  Character,
  CharactersResponse,
} from './../pages/Home'

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<CharactersResponse> => {
  const params = new URLSearchParams({ page: page.toString() });

  if (searchTerm) {
    params.set('name', searchTerm);
  }

  const response = await fetch(`${BASE_URL}/?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  const data: CharactersResponse = await response.json();
  return data;
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  const data: Character = await response.json();
  return data;
};
