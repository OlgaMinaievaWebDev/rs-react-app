import type { Character } from '../../api/characters.interfaces';

export interface ResultsProps {
  items: Character[];
  isLoading: boolean;
  error: string | null;
}
