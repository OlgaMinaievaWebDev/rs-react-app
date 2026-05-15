import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Character } from './Home';

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const userId = params.id as string;

  useEffect(() => {
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const url = `${baseUrl}/${userId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data: Character) => {
        setIsLoading(false);
        setCharacter(data);
      })
      .catch(() => {
        const message = 'Unable to load character.';
        setError(message);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!character) {
    return <p>No character</p>;
  }

  return (
    <div>
      <p>{character.name}</p>
      <p>{character.species}</p>
      <p>{character.status}</p>
    </div>
  );
}
