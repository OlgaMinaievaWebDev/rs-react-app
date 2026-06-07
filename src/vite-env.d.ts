/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUERY_CACHE_TTL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
