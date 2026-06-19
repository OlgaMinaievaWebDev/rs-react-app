import styled from 'styled-components';

export const StyledLanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type StyledLanguageButtonProps = {
  $isActive: boolean;
};

export const StyledLanguageButton = styled.button<StyledLanguageButtonProps>`
  display: inline-block;
  padding: 6px 10px;
  border: 0;
  border-radius: 999px;
  background: ${({ $isActive }) =>
    $isActive ? 'var(--primary)' : 'transparent'};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--primary-text)' : 'var(--muted-text)'};
  cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
  font-weight: 700;

  &:hover:not(:disabled) {
    background: var(--hover-surface);
    color: var(--text);
  }
`;
