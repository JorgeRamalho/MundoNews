import { test, expect } from '@playwright/test';

const ARTICLE_SLUG = 'eua-tarifas-25-brasil-reciprocidade-marco-lastimavel';

test.describe('Artigo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/noticia/${ARTICLE_SLUG}`);
  });

  test('exibe título dinâmico na aba', async ({ page }) => {
    await expect(page).toHaveTitle(/EUA confirmam tarifas.*Mundo News/);
  });

  test('renderiza conteúdo da matéria', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'EUA confirmam tarifas de 25%',
    );
    await expect(page.locator('.article-body')).toBeVisible();
  });

  test('define metadados Open Graph de artigo', async ({ page }) => {
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://mundonwes.netlify.app/noticia/${ARTICLE_SLUG}`,
    );
    await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
      'content',
      /2026-07-16/,
    );
  });

  test('inclui JSON-LD NewsArticle', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const texts = await scripts.allTextContents();
    const types = texts.map((text) => JSON.parse(text)['@type'] as string);

    expect(types).toContain('NewsArticle');
    expect(types).toContain('BreadcrumbList');
  });

  test('permite voltar à home', async ({ page }) => {
    await page.getByRole('link', { name: /Voltar às notícias/ }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Os fatos do Brasil e do mundo',
    );
  });
});
