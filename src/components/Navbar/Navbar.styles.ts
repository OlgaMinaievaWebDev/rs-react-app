import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #d7dfe8;
  border-radius: 14px;
  background: #ffffff;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #334155;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #eef5fb;
    color: #1f2a37;
  }

  &.active {
    background: #1f2a37;
    color: #ffffff;
  }
`;
