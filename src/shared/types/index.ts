export type NewsCategory = 'brasil' | 'mundo' | 'opiniao' | 'artigo' | 'esporte' | 'breaking';

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  author: string;
  authorRole: string;
  publishedAt: string;
  imageUrl: string;
  imageAlt: string;
  gallery?: ArticleImage[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface Correspondent {
  id: string;
  name: string;
  city: string;
  country: string;
  role: string;
  initials: string;
  bio?: string;
}
