import styled, { css } from 'styled-components';

interface StyledLinkProps {
  $isActive: boolean;
}

export const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
`;

export const StyledLink = styled.span<StyledLinkProps>`
  display: inline-block;
  text-decoration: none;
  color: var(--muted-text);
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: var(--hover-surface);
    color: var(--text);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: var(--primary);
      color: var(--primary-text);
    `}
`;

export const StyledThemeButton = styled.button`
  margin-left: auto;
  background: var(--surface);
  color: var(--muted-text);
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: var(--hover-surface);
    color: var(--text);
    border-color: var(--muted-text);
  }

  &:active {
    background: var(--border);
  }
`;
