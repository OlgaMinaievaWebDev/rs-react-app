const DEFAULT_API_URL = 'https://rickandmortyapi.com/api/character';
const DEFAULT_QUERY_CACHE_TTL_MS = 300000;

const parsedQueryCacheTtl = Number(import.meta.env.VITE_QUERY_CACHE_TTL);

export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
  queryCacheTtlMs:
    Number.isFinite(parsedQueryCacheTtl) && parsedQueryCacheTtl >= 0
      ? parsedQueryCacheTtl
      : DEFAULT_QUERY_CACHE_TTL_MS,
} as const;
