import { fetchContentfulArticles } from './contentful';
import { fetchSanityArticles } from './sanity';
import type { NewsArticle } from '../../shared/types';

export async function fetchCmsArticles(): Promise<NewsArticle[]> {
  const provider = process.env.VITE_CMS_PROVIDER?.toLowerCase();

  try {
    if (provider === 'sanity' && process.env.VITE_SANITY_PROJECT_ID) {
      return await fetchSanityArticles();
    }

    if (
      provider === 'contentful' &&
      process.env.VITE_CONTENTFUL_SPACE_ID &&
      process.env.VITE_CONTENTFUL_ACCESS_TOKEN
    ) {
      return await fetchContentfulArticles();
    }
  } catch (error) {
    console.warn('[cms] Falha ao buscar artigos do CMS:', error);
  }

  return [];
}
