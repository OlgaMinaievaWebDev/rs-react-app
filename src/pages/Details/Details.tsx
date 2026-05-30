import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { DetailsLoading } from './components';

import { useCharacterQuery } from '../../hooks/useCharacterQuery';

import { StyledCloseButton, StyledHeader, StyledPanel } from './Details.styles';

export function Details() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: character, isLoading, error } = useCharacterQuery(id);
  const queryString = searchParams.toString();

  const handleClose = () => {
    if (queryString) {
      navigate(`/?${queryString}`);
    } else {
      navigate('/');
    }
  };

  if (!id) {
    return <p>Unable to load character.</p>;
  }

  if (isLoading) {
    return <DetailsLoading />;
  }

  if (error) {
    return <p>Unable to load character.</p>;
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
