import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fetchCmsArticles } from '../../src/lib/cms/index';

export async function syncCmsArticles(projectRoot: string): Promise<number> {
  const articles = await fetchCmsArticles();
  const provider = process.env.VITE_CMS_PROVIDER ?? null;

  const output = `// Gerado automaticamente pelo plugin CMS no build. Não editar manualmente.
import type { NewsArticle } from '../../../shared/types';

export const cmsArticles: NewsArticle[] = ${JSON.stringify(articles, null, 2)};

export const cmsProvider: string | null = ${provider ? JSON.stringify(provider) : 'null'};
`;

  writeFileSync(
    resolve(projectRoot, 'src/features/news/data/cms-articles.generated.ts'),
    output,
    'utf-8',
  );

  if (articles.length > 0) {
    console.log(`[cms] ${articles.length} artigos sincronizados via ${provider}`);
  }

  return articles.length;
}
