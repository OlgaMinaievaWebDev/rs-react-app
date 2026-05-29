import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { ThemeProvider } from './context/ThemeContext';

const queryCacheTtl = Number(import.meta.env.VITE_QUERY_CACHE_TTL) || 300000;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryCacheTtl,
      gcTime: queryCacheTtl,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
