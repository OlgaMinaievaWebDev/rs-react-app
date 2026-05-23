import styled from 'styled-components';

export const StyledSearchHeader = styled.header`
  display: flex;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: var(--focus);
    box-shadow: 0 0 0 3px rgba(15, 94, 168, 0.12);
  }
`;

export const StyledSearchButton = styled.button`
  padding: 10px 18px;
  cursor: pointer;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted-text);
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-surface);
    color: var(--text);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus {
    outline: 2px solid var(--focus);
  }
`;
