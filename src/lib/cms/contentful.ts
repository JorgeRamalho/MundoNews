import { createClient } from 'contentful';
import { normalizeCmsArticle, type CmsArticleInput } from './types';
import type { NewsArticle } from '../../shared/types';

interface ContentfulArticleFields {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  authorRole?: string;
  publishedAt?: string;
  imageUrl?: string;
  imageAlt?: string;
  tags?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
}

export async function fetchContentfulArticles(): Promise<NewsArticle[]> {
  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !accessToken) return [];

  const client = createClient({
    space: spaceId,
    accessToken,
    environment: process.env.VITE_CONTENTFUL_ENVIRONMENT ?? 'master',
  });

  const response = await client.getEntries({
    content_type: 'article',
    order: ['-fields.publishedAt'],
    limit: 100,
  });

  const rows = response.items
    .map((item) => {
      const fields = item.fields as ContentfulArticleFields;
      if (!fields.slug || !fields.title) return null;

      const row: CmsArticleInput = {
        id: item.sys.id,
        slug: fields.slug,
        title: fields.title,
        excerpt: fields.excerpt ?? '',
        content: fields.content ?? '',
        category: fields.category ?? 'mundo',
        author: fields.author ?? 'Redação',
        authorRole: fields.authorRole ?? 'Mundo News',
        publishedAt: fields.publishedAt ?? new Date().toISOString(),
        imageUrl: fields.imageUrl ?? '',
        imageAlt: fields.imageAlt ?? fields.title,
        tags: fields.tags ?? [],
        isBreaking: fields.isBreaking,
        isFeatured: fields.isFeatured,
      };
      return row;
    })
    .filter((row): row is CmsArticleInput => row !== null);

  return rows
    .map((row) => normalizeCmsArticle(row))
    .filter((article): article is NewsArticle => article !== null);
}
