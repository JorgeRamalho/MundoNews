import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';
import type { NewsArticle } from './src/shared/types';
import { syncCmsArticles } from './scripts/cms/sync';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://mundonwes.netlify.app';

const STATIC_ROUTES = ['/', '/brasil', '/mundo', '/opiniao', '/esporte', '/artigos', '/busca', '/sobre'];

let buildArticles: NewsArticle[] = [];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRssXml(articles: NewsArticle[]): string {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const items = sorted
    .slice(0, 30)
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/noticia/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/noticia/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mundo News</title>
    <link>${SITE_URL}</link>
    <description>Notícias do Brasil e do mundo em tempo real. A verdade em primeiro lugar.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function buildSitemapXml(articles: NewsArticle[]): string {
  const urls = [
    ...STATIC_ROUTES.map((path) => ({
      loc: `${SITE_URL}${path === '/' ? '' : path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: path === '/' ? 'hourly' : 'daily',
      priority: path === '/' ? '1.0' : '0.8',
    })),
    ...articles.map((article) => ({
      loc: `${SITE_URL}/noticia/${article.slug}`,
      lastmod: article.publishedAt.split('T')[0],
      changefreq: 'weekly',
      priority: '0.7',
    })),
  ];

  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function contentPipelinePlugin(): Plugin {
  async function refreshArticles(): Promise<void> {
    await syncCmsArticles(__dirname);
    const { getAllArticlesForBuild } = await import('./src/features/news/data/article-repository');
    buildArticles = getAllArticlesForBuild();
  }

  function writeDiscoveryFiles(): void {
    const sitemap = buildSitemapXml(buildArticles);
    const rss = buildRssXml(buildArticles);
    writeFileSync(resolve(__dirname, 'public/sitemap.xml'), sitemap, 'utf-8');
    writeFileSync(resolve(__dirname, 'public/feed.xml'), rss, 'utf-8');
  }

  return {
    name: 'content-pipeline',
    async buildStart() {
      await refreshArticles();
      writeDiscoveryFiles();
    },
    async closeBundle() {
      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), buildSitemapXml(buildArticles), 'utf-8');
      writeFileSync(resolve(__dirname, 'dist/feed.xml'), buildRssXml(buildArticles), 'utf-8');
    },
  };
}

function liveServerRootIndex(): Plugin {
  const rootHtml = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mundo News — A verdade em primeiro lugar</title>
    <meta name="description" content="Mundo News — Notícias do Brasil e do mundo em tempo real. Artigos, opinião e informação com compromisso com a verdade." />
    <meta name="author" content="Mundo News" />
    <meta name="theme-color" content="#c41e3a" />
    <link rel="icon" type="image/svg+xml" href="dist/favicon.svg" />
    <link rel="manifest" href="dist/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" crossorigin href="dist/assets/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="dist/assets/index.js"></script>
  </body>
</html>
`;

  return {
    name: 'live-server-root-index',
    closeBundle() {
      writeFileSync(resolve(__dirname, 'index.html'), rootHtml, 'utf-8');
    },
  };
}

function liveServerEntry(): Plugin {
  return {
    name: 'live-server-entry',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        let next = html
          .replace(/\.\.\/public\//g, '/')
          .replace('src="../dist/assets/index.js"', 'src="./main.tsx"');

        if (ctx.server) {
          next = next.replace(
            /<link\s+rel="stylesheet"\s+crossorigin\s+href="\.\.\/dist\/assets\/[^"]+\.css"\s*\/?>\s*/g,
            '',
          );
        }

        return next;
      },
    },
  };
}

export default defineConfig({
  plugins: [contentPipelinePlugin(), react(), liveServerEntry(), liveServerRootIndex()],
  root: 'html5',
  base: '/',
  publicDir: resolve(__dirname, 'public'),
  appType: 'spa',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith('.css')) {
            return 'assets/index.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@js': resolve(__dirname, 'src/lib'),
      '@css': resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    fs: {
      allow: [resolve(__dirname)],
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
});
