import { test, expect } from '@playwright/test';
import { usePortugueseLocale } from './test-utils';

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await usePortugueseLocale(page);
    await page.goto('/');
  });

  test('exibe título e hero principal', async ({ page }) => {
    await expect(page).toHaveTitle(/Mundo News/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Os fatos do Brasil e do mundo',
    );
  });

  test('possui navegação principal com seções', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Navegação principal' });
    await expect(nav.getByRole('link', { name: /Início/ })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Brasil/ })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Mundo/ })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Sobre/ })).toBeVisible();
  });

  test('usa URL limpa sem hash', async ({ page }) => {
    expect(page.url()).not.toContain('#/');
  });

  test('possui link canônico', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://mundonwes.netlify.app/');
  });

  test('possui JSON-LD de organização', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(2);

    const content = await scripts.first().textContent();
    const data = JSON.parse(content ?? '{}') as { '@type': string };
    expect(data['@type']).toBe('NewsMediaOrganization');
  });

  test('imagens possuem texto alternativo', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i += 1) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Imagem ${i + 1} sem alt`).toBeTruthy();
    }
  });
});
