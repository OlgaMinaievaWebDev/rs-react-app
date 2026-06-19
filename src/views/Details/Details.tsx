'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from '../../i18n/navigation';
import Image from 'next/image';

import { DetailsLoading } from './components';

import { useCharacterQuery } from '../../hooks/useCharacterQuery';

import {
  StyledDetailsActions,
  StyledDetailsButton,
  StyledHeader,
  StyledPanel,
  StyledImageWrapper,
} from './Details.styles';

export function Details() {
  const t = useTranslations('Details');
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
    return <p>{t('unableToLoad')}</p>;
  }

  if (isLoading) {
    return <DetailsLoading />;
  }

  if (!character) {
    return <p>{t('empty')}</p>;
  }

  return (
    <StyledPanel>
      <StyledImageWrapper>
        <Image
          src={character.image}
          alt={t('imageAlt', { name: character.name })}
          width={220}
          height={220}
        />
      </StyledImageWrapper>
      <StyledHeader>{character.name}</StyledHeader>
      <p>{t('species', { species: character.species })}</p>
      <p>{t('status', { status: character.status })}</p>
      <p>
        {t('description', {
          species: character.species,
          status: character.status,
        })}
      </p>
      <StyledDetailsActions>
        <StyledDetailsButton type="button" onClick={handleRefreshClick}>
          {t('refresh')}
        </StyledDetailsButton>
        <StyledDetailsButton type="button" onClick={handleClose}>
          {t('close')}
        </StyledDetailsButton>
      </StyledDetailsActions>
    </StyledPanel>
  );
}
