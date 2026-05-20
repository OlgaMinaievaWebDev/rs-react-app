import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import type { Character } from '../Home/Home.interfaces';

import { StyledCloseButton, StyledHeader, StyledPanel } from './Details.styles';

const fetchCharacter = async (id: string): Promise<Character> => {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  const data: Character = await response.json();
  return data;
};

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryString = searchParams.toString();

  const handleClose = () => {
    if (queryString) {
      navigate(`/?${queryString}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!id) return;

    const loadCharacter = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCharacter(id);
        setCharacter(data);
      } catch {
        setError('Unable to load character.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadCharacter();
  }, [id]);

  if (!id) {
    return <p>Unable to load character.</p>;
  }

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
    <StyledPanel>
      <StyledHeader>{character.name}</StyledHeader>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <StyledCloseButton onClick={handleClose}>Close</StyledCloseButton>
    </StyledPanel>
  );
}
