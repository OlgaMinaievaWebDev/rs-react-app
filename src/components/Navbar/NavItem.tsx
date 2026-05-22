import { NavLink } from 'react-router-dom';

import type { NavItemProps } from './Navbar.interfaces';
import { StyledLink } from './Navbar.styles';

export function NavItem({ children, to }: NavItemProps) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <StyledLink $isActive={isActive}>{children}</StyledLink>
      )}
    </NavLink>
  );
}
