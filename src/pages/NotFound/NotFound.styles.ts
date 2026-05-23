import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNotFoundSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  border: 1px solid #d7dfe8;
  border-radius: 18px;
  background: #f8fbff;
`;

export const StyledNotFoundHeader = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #1f2a37;
`;

export const StyledNotFoundParagraph = styled.p`
  margin: 0;
  color: #475569;
`;

export const StyledNotFoundLink = styled(Link)`
  text-decoration: none;
  color: #0f5ea8;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
