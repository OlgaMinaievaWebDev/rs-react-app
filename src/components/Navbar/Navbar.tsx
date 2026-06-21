'use client';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import { ThemeType } from '../../context/ThemeContext/ThemeContext.interfaces';
import { NavItem } from './NavItem';
import { StyledNavbar, StyledThemeButton } from './Navbar.styles';
import { LanguageSwitcher } from '../LanguageSwitcher';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Navigation');

  return (
    <StyledNavbar>
      <NavItem to="/">{t('home')}</NavItem>
      <NavItem to="/about">{t('about')}</NavItem>
      <StyledThemeButton type="button" onClick={toggleTheme}>
        {theme === ThemeType.LIGHT ? t('themeDark') : t('themeLight')}
      </StyledThemeButton>
      <LanguageSwitcher />
    </StyledNavbar>
  );
}
