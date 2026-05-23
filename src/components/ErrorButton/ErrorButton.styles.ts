import styled from 'styled-components';

export const StyledErrorButton = styled.button`
  align-self: flex-end;
  padding: 10px 16px;
  border: 1px solid var(--error);
  border-radius: 8px;
  background: var(--surface);
  color: var(--error);
  cursor: pointer;

  &:hover {
    background: var(--error-surface);
  }
`;
