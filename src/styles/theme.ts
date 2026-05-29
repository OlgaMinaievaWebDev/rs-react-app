import { ThemeType } from '../context/ThemeContext/ThemeContext.interfaces';

export const appThemes = {
  [ThemeType.LIGHT]: {
    background: '#f4f6f8',
    text: '#1a1a1a',
    surface: '#ffffff',
    border: '#d7dfe8',
    mutedText: '#334155',
    hoverSurface: '#eef5fb',
    primary: '#1f2a37',
    primaryText: '#ffffff',
    focus: '#0f5ea8',
    shadow: 'rgba(31, 42, 55, 0.12)',
    link: '#0f5ea8',
    error: '#d9534f',
    errorSurface: '#fff3f3',
    errorBorder: '#f0b4b4',
    errorText: '#9f1d1d',
  },
  [ThemeType.DARK]: {
    background: '#121212',
    text: '#f9fafb',
    surface: '#1f2937',
    border: '#374151',
    mutedText: '#cbd5e1',
    hoverSurface: '#334155',
    primary: '#f9fafb',
    primaryText: '#111827',
    focus: '#60a5fa',
    shadow: 'rgba(0, 0, 0, 0.32)',
    link: '#60a5fa',
    error: '#f87171',
    errorSurface: '#3f1d1d',
    errorBorder: '#7f2d2d',
    errorText: '#fecaca',
  },
} as const;

export type AppTheme = (typeof appThemes)[keyof typeof appThemes];
