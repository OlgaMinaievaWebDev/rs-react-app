import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/characters';

export const useCharactersQuery = (searchTerm: string, page: number) => {
  return useQuery({
    queryKey: ['characters', searchTerm, page],
    queryFn: () => fetchCharacters(searchTerm, page),
  });
};
