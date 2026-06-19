import { useTranslations } from 'next-intl';

import { Loader } from '../../../components/Loader';
import { StyledPanel } from '../Details.styles';

export function DetailsLoading() {
  const t = useTranslations('Details');

  return (
    <StyledPanel role="status" aria-label={t('loadingLabel')}>
      <Loader />
      <p>{t('loading')}</p>
    </StyledPanel>
  );
}
