'use client';

import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyles';
import { ThemeProvider } from '../context/ThemeContext';
import { useState } from 'react';
import { config } from '../config';

export function ClientApp() {
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
