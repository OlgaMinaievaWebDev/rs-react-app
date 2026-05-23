import styled from 'styled-components';

export const StyledSelectedItemsFlyout = styled.aside`
  position: sticky;
  bottom: 16px;
  z-index: 10;
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  box-shadow: 0 8px 24px var(--shadow);
`;

export const StyledFlyoutContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StyledFlyoutActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledFlyoutButton = styled.button`
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
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
