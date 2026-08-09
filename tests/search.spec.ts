import { test, expect } from '@playwright/test';
import { usePortugueseLocale } from './test-utils';

test.describe('Busca', () => {
  test.beforeEach(async ({ page }) => {
    await usePortugueseLocale(page);
  });

  test('exibe resultados para termo conhecido', async ({ page }) => {
    await page.goto('/busca?q=tarifas');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/tarifas/i);
    await expect(page.getByRole('article').first()).toBeVisible();
  });

  test('informa quando não há resultados', async ({ page }) => {
    await page.goto('/busca?q=xyztermoinexistente123');

    await expect(page.getByText(/Nenhuma matéria encontrada|No articles found/i)).toBeVisible();
  });

  test('busca via formulário do header', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.getByRole('searchbox', { name: /Buscar notícias|Search news/i }).fill('copa');
    await page.getByRole('button', { name: /Enviar busca|Submit search/i }).click();

    await expect(page).toHaveURL(/\/busca\?q=copa/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/copa/i);
  });
});
