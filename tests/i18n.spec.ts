import { test, expect } from '@playwright/test';
import { selectLanguage, usePortugueseLocale } from './test-utils';

test.describe('Internacionalização', () => {
  test('altera idioma para inglês', async ({ page }) => {
    await usePortugueseLocale(page);
    await page.goto('/');
    await selectLanguage(page, 'en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
  });

  test('altera idioma para espanhol', async ({ page }) => {
    await usePortugueseLocale(page);
    await page.goto('/');
    await selectLanguage(page, 'es');

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('link', { name: /Inicio/i })).toBeVisible();
  });

  test('exibe aviso de idioma do conteúdo em artigo', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mundonews-lang', 'en');
    });
    await page.goto('/noticia/eua-tarifas-25-brasil-reciprocidade-marco-lastimavel');

    await expect(page.getByText(/Original content in Portuguese/i)).toBeVisible();
  });
});
