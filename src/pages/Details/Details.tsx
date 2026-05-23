import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { fetchCharacterById } from '../../api/characters';
import type { Character } from '../../api/characters.interfaces';

import { DetailsLoading } from './components';
import { StyledCloseButton, StyledHeader, StyledPanel } from './Details.styles';

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

  const loadCharacter = useCallback(async (characterId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCharacterById(characterId);
      setCharacter(data);
    } catch {
      setError('Unable to load character.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const timeoutId = window.setTimeout(() => {
      void loadCharacter(id);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [id, loadCharacter]);

  if (!id) {
    return <p>Unable to load character.</p>;
  }

  if (isLoading) {
    return <DetailsLoading />;
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
      <p>
        Description: {character.species} character with {character.status}{' '}
        status.
      </p>
      <StyledCloseButton onClick={handleClose}>Close</StyledCloseButton>
    </StyledPanel>
  );
}
