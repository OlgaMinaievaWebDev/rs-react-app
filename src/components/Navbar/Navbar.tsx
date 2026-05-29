import { useTheme } from '../../context/ThemeContext';
import { ThemeType } from '../../context/ThemeContext/ThemeContext.interfaces';
import { NavItem } from './NavItem';
import { StyledNavbar, StyledThemeButton } from './Navbar.styles';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledNavbar>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/about">About</NavItem>
      <StyledThemeButton type="button" onClick={toggleTheme}>
        {theme === ThemeType.LIGHT ? 'Dark' : 'Light'}
      </StyledThemeButton>
    </StyledNavbar>
  );
}
