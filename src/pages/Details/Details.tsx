import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { fetchCharacterById } from '../../api/characters';
import type { Character } from '../../api/characters.interfaces';
import { Loader } from '../../components/Loader';

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

  useEffect(() => {
    if (!id) return;

    const loadCharacter = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch {
        setError('Unable to load character.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadCharacter();
  }, [id]);

  return !id ? (
    <p>Unable to load character.</p>
  ) : isLoading ? (
    <StyledPanel role="status" aria-label="Loading character details">
      <Loader />
      <p>Loading...</p>
    </StyledPanel>
  ) : error ? (
    <p>{error}</p>
  ) : !character ? (
    <p>No character</p>
  ) : (
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
