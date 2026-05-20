export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
}

export interface CharactersResponse {
  results: Character[];
  info: { pages: number };
}