import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/characters';

export const useCharacterQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id as string),
    enabled: Boolean(id),
  });
};
