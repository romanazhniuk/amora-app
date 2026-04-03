/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Django origin (no trailing slash). Leave unset to use same-origin /api (Vite proxy in dev). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
