import styled from 'styled-components';

export const StyledPanel = styled.div`
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  background: var(--surface);
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--focus);
    box-shadow: 0 8px 24px var(--shadow);
  }
`;

export const StyledHeader = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--text);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
`;

export const StyledDetailsActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const StyledDetailsButton = styled.button`
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 8px 14px;
  background: var(--surface);
  color: var(--muted-text);
  cursor: pointer;

  &:hover {
    background: var(--hover-surface);
    color: var(--text);
  }

  &:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
`;

export const StyledImageWrapper = styled.div`
  overflow: hidden;
  align-self: flex-start;
  border-radius: 14px;
  border: 1px solid var(--border);

  img {
    display: block;
  }
`;
