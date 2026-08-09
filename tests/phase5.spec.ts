import { test, expect } from '@playwright/test';
import { usePortugueseLocale } from './test-utils';

test.describe('Fase 5 — Produto', () => {
  test.beforeEach(async ({ page }) => {
    await usePortugueseLocale(page);
  });

  test('alterna tema escuro', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.getByRole('button', { name: 'Ativar tema claro' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('possui link RSS no footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer a.footer__link[href="/feed.xml"]')).toBeVisible();
  });

  test('possui formulário de newsletter', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Newsletter/i })).toBeVisible();
    await expect(page.getByLabel(/newsletter/i)).toBeVisible();
  });

  test('exibe seção de comentários em artigo', async ({ page }) => {
    await page.goto('/noticia/eua-tarifas-25-brasil-reciprocidade-marco-lastimavel');
    await expect(page.getByRole('region', { name: /Comentários|Comments/i })).toBeVisible();
  });

  test('feed RSS é válido após build', async ({ request }) => {
    const response = await request.get('/feed.xml');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain('<channel>');
    expect(body).toContain('<item>');
  });
});
