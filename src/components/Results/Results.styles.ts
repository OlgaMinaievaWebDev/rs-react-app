import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledResultsSection = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
`;

export const StyledResultCard = styled(Link)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 16px;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--border);
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
    border-color: var(--focus);
    box-shadow: 0 8px 24px var(--shadow);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    grid-column: 1;
  }

  p {
    grid-column: 1;
  }
`;

export const StyledCheckbox = styled.input`
  grid-column: 2;
  grid-row: 1 / span 2;
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--focus);
`;
