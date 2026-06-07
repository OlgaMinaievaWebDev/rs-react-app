import { NavLink, useLocation } from 'react-router-dom';

import type { NavItemProps } from './Navbar.interfaces';
import { StyledLink } from './Navbar.styles';

export function NavItem({ children, to }: NavItemProps) {
  const location = useLocation();
  const isNestedHomeRoute =
    to === '/' && location.pathname.startsWith('/details');

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <StyledLink $isActive={isActive || isNestedHomeRoute}>
          {children}
        </StyledLink>
      )}
    </NavLink>
  );
}
