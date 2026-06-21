const DEFAULT_API_URL = 'https://rickandmortyapi.com/api/character';

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL,
} as const;
