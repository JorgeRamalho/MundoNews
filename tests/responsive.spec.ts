import { test, expect } from '@playwright/test';
import { usePortugueseLocale } from './test-utils';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

for (const viewport of viewports) {
  test.describe(`Responsivo — ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('home carrega sem overflow horizontal', async ({ page }) => {
      await usePortugueseLocale(page);
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      expect(hasOverflow).toBe(false);
    });

    test('header e conteúdo principal visíveis', async ({ page }) => {
      await usePortugueseLocale(page);
      await page.goto('/');
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });
  });
}

test.describe('Responsivo — menu mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('exibe botão de menu e abre navegação', async ({ page }) => {
    await usePortugueseLocale(page);
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /Abrir menu|Open menu/i });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole('button', { name: /Fechar menu|Close menu/i })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: /Navegação principal|Main navigation/i }),
    ).toBeVisible();
  });
});
