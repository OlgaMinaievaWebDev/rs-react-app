'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from '../../i18n/navigation';
import {
  StyledPaginationButton,
  StyledPaginationControls,
  StyledPaginationLabel,
} from './Home.styles';
import { createPageUrl } from './createPageUrl';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  hasResults: boolean;
};

export function PaginationControls({
  currentPage,
  totalPages,
  searchTerm,
  hasResults,
}: PaginationControlsProps) {
  const t = useTranslations('Home');
  const router = useRouter();

  const handleNextClick = () => {
    router.push(createPageUrl(currentPage + 1, searchTerm));
  };

  const handlePrevClick = () => {
    router.push(createPageUrl(currentPage - 1, searchTerm));
  };

  const handleRefreshClick = () => {
    router.refresh();
  };

  return (
    <StyledPaginationControls>
      {hasResults && (
        <>
          <StyledPaginationButton
            type="button"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            {t('prev')}
          </StyledPaginationButton>
          <StyledPaginationLabel>
            {t('page', { currentPage, totalPages })}
          </StyledPaginationLabel>
          <StyledPaginationButton
            type="button"
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </StyledPaginationButton>
        </>
      )}
      <StyledPaginationButton type="button" onClick={handleRefreshClick}>
        {t('refresh')}
      </StyledPaginationButton>
    </StyledPaginationControls>
  );
}
