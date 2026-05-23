import { useTheme } from '../../context/ThemeContext';
import { NavItem } from './NavItem';
import { StyledNavbar, StyledThemeButton } from './Navbar.styles';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledNavbar>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/about">About</NavItem>
      <StyledThemeButton type="button" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </StyledThemeButton>
    </StyledNavbar>
  );
}
