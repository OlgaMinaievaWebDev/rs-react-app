import { StyledLink, StyledNavbar } from './Navbar.styles';

export function Navbar() {
  return (
    <StyledNavbar>
      <StyledLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </StyledLink>
      <StyledLink
        to={'/about'}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        About
      </StyledLink>
    </StyledNavbar>
  );
}
