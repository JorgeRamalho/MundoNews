import type { NewsArticle } from '../../../shared/types';
import { articles as staticArticles, correspondents } from './news';
import { cmsArticles } from './cms-articles.generated';

export { correspondents };

function getAllArticles(): NewsArticle[] {
  return cmsArticles.length > 0 ? cmsArticles : staticArticles;
}

function sortByDate(items: NewsArticle[]): NewsArticle[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: NewsArticle['category']): NewsArticle[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getBreakingNews(): NewsArticle[] {
  return getAllArticles().filter((article) => article.isBreaking);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return getAllArticles().find((article) => article.isFeatured);
}

export function getLatestArticles(limit = 10): NewsArticle[] {
  return sortByDate(getAllArticles()).slice(0, limit);
}

export function getSportsArticles(limit = 6): NewsArticle[] {
  return sortByDate(
    getAllArticles().filter((article) => article.category === 'esporte'),
  ).slice(0, limit);
}

export function searchArticles(query: string, limit = 50): NewsArticle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const terms = normalized.split(/\s+/).filter(Boolean);

  return sortByDate(
    getAllArticles().filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.author,
        article.authorRole,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    }),
  ).slice(0, limit);
}

export function getAllArticlesForBuild(): NewsArticle[] {
  return getAllArticles();
}

export function isUsingCms(): boolean {
  return cmsArticles.length > 0;
}
