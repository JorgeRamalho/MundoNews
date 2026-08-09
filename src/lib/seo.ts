/**
 * Utilitários de SEO — URLs canônicas, Open Graph e JSON-LD
 */

import { BRAND, BRAND_ASSETS } from './brand';
import type { NewsArticle } from '../shared/types';

export const SITE_URL = 'https://mundonwes.netlify.app';

export function absoluteUrl(path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function resolveOgImage(image?: string): string {
  if (!image) return absoluteUrl('/og-image.svg');
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('../public/')) {
    return absoluteUrl(image.replace('../public/', '/'));
  }
  if (image.startsWith('/')) return absoluteUrl(image);
  return absoluteUrl(`/${image}`);
}

export function pageTitle(title: string): string {
  if (title.includes(BRAND.name)) return title;
  return `${title} | ${BRAND.name}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: BRAND.name,
    url: SITE_URL,
    logo: absoluteUrl('/logo-icon.svg'),
    description: BRAND.description,
    email: BRAND.email,
    sameAs: ['https://github.com/JorgeRamalho/Mundonews'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'PR',
      addressCountry: 'BR',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: BRAND.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-icon.svg'),
      },
    },
  };
}

export function newsArticleJsonLd(article: NewsArticle, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [resolveOgImage(article.imageUrl)],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: BRAND.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-icon.svg'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    articleSection: article.category,
    keywords: article.tags.join(', '),
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const DEFAULT_OG_IMAGE = resolveOgImage(BRAND_ASSETS.ogImage);
