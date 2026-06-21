import { useSyncExternalStore } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { appThemes } from '../../styles/theme';
import { ThemeContext } from './ThemeContext';
import { ThemeType, type ThemeProviderProps } from './ThemeContext.interfaces';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

const getStoredTheme = (): ThemeType => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === ThemeType.DARK ? ThemeType.DARK : ThemeType.LIGHT;
};

const getServerTheme = (): ThemeType => ThemeType.LIGHT;

const subscribeToTheme = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme
  );

  const toggleTheme = () => {
    const nextTheme =
      theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={appThemes[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
