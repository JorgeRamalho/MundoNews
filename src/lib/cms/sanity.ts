import { createClient } from '@sanity/client';
import { normalizeCmsArticle, type CmsArticleInput } from './types';
import type { NewsArticle } from '../../shared/types';

const ARTICLE_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  content,
  category,
  author,
  authorRole,
  publishedAt,
  "imageUrl": coalesce(image.asset->url, mainImage.asset->url, ""),
  imageAlt,
  tags,
  isBreaking,
  isFeatured,
  gallery[]{
    "url": asset->url,
    alt,
    caption
  }
}`;

export async function fetchSanityArticles(): Promise<NewsArticle[]> {
  const projectId = process.env.VITE_SANITY_PROJECT_ID;
  if (!projectId) return [];

  const client = createClient({
    projectId,
    dataset: process.env.VITE_SANITY_DATASET ?? 'production',
    apiVersion: process.env.VITE_SANITY_API_VERSION ?? '2024-01-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
  });

  const rows = await client.fetch<CmsArticleInput[]>(ARTICLE_QUERY);
  return rows
    .map((row) => normalizeCmsArticle(row))
    .filter((article): article is NewsArticle => article !== null);
}
