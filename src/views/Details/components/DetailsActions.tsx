'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from '../../../i18n/navigation';
import {
  StyledDetailsActions,
  StyledDetailsButton,
} from '../Details.styles';

type DetailsActionsProps = {
  queryString: string;
};

export function DetailsActions({ queryString }: DetailsActionsProps) {
  const t = useTranslations('Details');
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  const handleClose = () => {
    router.push(queryString ? `/?${queryString}` : '/');
  };

  return (
    <StyledDetailsActions>
      <StyledDetailsButton type="button" onClick={handleRefresh}>
        {t('refresh')}
      </StyledDetailsButton>
      <StyledDetailsButton type="button" onClick={handleClose}>
        {t('close')}
      </StyledDetailsButton>
    </StyledDetailsActions>
  );
}
