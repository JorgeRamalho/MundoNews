import type { NewsArticle, NewsCategory } from '../../shared/types';

export type CmsProvider = 'sanity' | 'contentful';

export interface CmsArticleInput {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  gallery?: Array<{ url: string; alt: string; caption?: string }>;
}

const VALID_CATEGORIES: NewsCategory[] = [
  'brasil',
  'mundo',
  'opiniao',
  'artigo',
  'esporte',
  'breaking',
];

export function normalizeCmsArticle(input: CmsArticleInput): NewsArticle | null {
  if (!input.slug || !input.title) return null;

  const category = VALID_CATEGORIES.includes(input.category as NewsCategory)
    ? (input.category as NewsCategory)
    : 'mundo';

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt ?? '',
    content: input.content ?? '',
    category,
    author: input.author ?? 'Redação',
    authorRole: input.authorRole ?? 'Mundo News',
    publishedAt: input.publishedAt ?? new Date().toISOString(),
    imageUrl: input.imageUrl ?? '',
    imageAlt: input.imageAlt ?? input.title,
    tags: input.tags ?? [],
    isBreaking: input.isBreaking ?? false,
    isFeatured: input.isFeatured ?? false,
    gallery: input.gallery,
  };
}

export function getCmsProvider(): CmsProvider | null {
  const provider = import.meta.env.VITE_CMS_PROVIDER?.toLowerCase();
  if (provider === 'sanity' || provider === 'contentful') return provider;
  return null;
}

export function isCmsConfigured(): boolean {
  const provider = getCmsProvider();
  if (provider === 'sanity') {
    return Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);
  }
  if (provider === 'contentful') {
    return Boolean(
      import.meta.env.VITE_CONTENTFUL_SPACE_ID &&
        import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    );
  }
  return false;
}
