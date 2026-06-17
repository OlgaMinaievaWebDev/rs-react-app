import { useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

import { DetailsLoading } from './components';

import { useCharacterQuery } from '../../hooks/useCharacterQuery';

import {
  StyledDetailsActions,
  StyledDetailsButton,
  StyledHeader,
  StyledPanel,
} from './Details.styles';

export function Details() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  const { data: character, isLoading, error } = useCharacterQuery(id);
  const queryString = searchParams.toString();
  const queryClient = useQueryClient();

  const handleClose = () => {
    if (queryString) {
      router.push(`/?${queryString}`);
    } else {
      router.push('/');
    }
  };

  const handleRefreshClick = () => {
    void queryClient.invalidateQueries({
      queryKey: ['character', id],
    });
  };

  if (!id || error) {
    return <p>Unable to load character.</p>;
  }

  if (isLoading) {
    return <DetailsLoading />;
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
      <StyledDetailsActions>
        <StyledDetailsButton type="button" onClick={handleRefreshClick}>
          Refresh
        </StyledDetailsButton>
        <StyledDetailsButton type="button" onClick={handleClose}>
          Close
        </StyledDetailsButton>
      </StyledDetailsActions>
    </StyledPanel>
  );
}
