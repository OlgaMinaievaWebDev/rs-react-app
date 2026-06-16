import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNotFoundSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  color: var(--text);
`;

export const StyledNotFoundHeader = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: var(--text);
`;

export const StyledNotFoundParagraph = styled.p`
  margin: 0;
  color: var(--muted-text);
`;

export const StyledNotFoundLink = styled(Link)`
  text-decoration: none;
  color: var(--link);
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
