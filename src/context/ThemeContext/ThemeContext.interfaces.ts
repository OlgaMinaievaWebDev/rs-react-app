import type { ReactNode } from 'react';

export const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeType = (typeof ThemeType)[keyof typeof ThemeType];

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
