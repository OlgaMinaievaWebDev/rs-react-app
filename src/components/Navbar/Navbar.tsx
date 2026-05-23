import { NavItem } from './NavItem';
import { StyledNavbar } from './Navbar.styles';

export function Navbar() {
  return (
    <StyledNavbar>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/about">About</NavItem>
    </StyledNavbar>
  );
}
