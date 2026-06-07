import { useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { appThemes } from '../../styles/theme';
import { ThemeContext } from './ThemeContext';
import { ThemeType, type ThemeProviderProps } from './ThemeContext.interfaces';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={appThemes[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
