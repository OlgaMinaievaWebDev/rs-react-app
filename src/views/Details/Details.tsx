import { useTranslations } from 'next-intl';
import Image from 'next/image';

import type { Character } from '../../api/characters.interfaces';
import {
  StyledHeader,
  StyledImageWrapper,
  StyledPanel,
} from './Details.styles';
import { DetailsActions } from './components';

type DetailsProps = {
  character: Character;
  queryString: string;
};

export function Details({ character, queryString }: DetailsProps) {
  const t = useTranslations('Details');

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
      <DetailsActions queryString={queryString} />
    </StyledPanel>
  );
}
