import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';

test.describe('Acessibilidade', () => {
  test('home sem violações críticas', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const critical = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    expect(critical, formatViolations(critical)).toEqual([]);
  });

  test('artigo sem violações críticas', async ({ page }) => {
    await page.goto('/noticia/eua-tarifas-25-brasil-reciprocidade-marco-lastimavel');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const critical = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    expect(critical, formatViolations(critical)).toEqual([]);
  });

  test('ticker não usa role marquee', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[role="marquee"]')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Notícias urgentes' })).toBeVisible();
  });

  test('footer possui link mailto', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute(
      'href',
      'mailto:redacao@mundonews.com.br',
    );
  });
});

function formatViolations(violations: Result[]): string {
  if (violations.length === 0) return '';
  return violations
    .map((violation) => `[${violation.impact}] ${violation.id}: ${violation.description}`)
    .join('\n');
}
