'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from '../styles/GlobalStyles';
import { ThemeProvider } from '../context/ThemeContext';
import { useState } from 'react';
import { config } from '../config';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({children}:ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: config.queryCacheTtlMs,
            gcTime: config.queryCacheTtlMs,
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
