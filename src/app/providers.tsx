'use client';

import { ThemeProvider } from '../context/ThemeContext';
import { GlobalStyles } from '../styles/GlobalStyles';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
