import type { Character } from "../../pages/Home";

export interface ResultsProps {
  items: Character[];
  isLoading: boolean;
  error: string | null;
}
