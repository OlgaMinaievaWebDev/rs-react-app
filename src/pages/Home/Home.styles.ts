import styled from 'styled-components';

export const StyledMainLayout = styled.main<{ $isDetailsOpen: boolean }>`
  display: ${({ $isDetailsOpen }) => ($isDetailsOpen ? 'flex' : 'block')};
  gap: 24px;
  align-items: flex-start;
`;

export const StyledResultsColumn = styled.div<{ $isDetailsOpen: boolean }>`
  width: 100%;
  flex: ${({ $isDetailsOpen }) => ($isDetailsOpen ? '0 0 70%' : 'initial')};
`;

export const StyledDetailsColumn = styled.div`
  flex: 0 0 30%;
`;

export const StyledPaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StyledPaginationLabel = styled.p`
  margin: 0;
  font-weight: 600;
`;

export const StyledPaginationButton = styled.button`
  border: 1px solid #c7d3e0;
  border-radius: 999px;
  padding: 8px 14px;
  background: #ffffff;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
