import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledResultsSection = styled.section`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
`;

export const StyledResultCard = styled(Link)`
  display: block;
  padding: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: #9fb5cc;
    box-shadow: 0 8px 24px rgba(31, 42, 55, 0.12);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #0f5ea8;
    outline-offset: 2px;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    margin-bottom: 8px;
  }
`;
