/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CMS_PROVIDER?: 'sanity' | 'contentful';
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_CONTENTFUL_SPACE_ID?: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN?: string;
  readonly VITE_CONTENTFUL_ENVIRONMENT?: string;
  readonly VITE_GISCUS_REPO?: string;
  readonly VITE_GISCUS_REPO_ID?: string;
  readonly VITE_GISCUS_CATEGORY_ID?: string;
  readonly VITE_GISCUS_CATEGORY?: string;
  readonly VITE_GISCUS_MAPPING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
