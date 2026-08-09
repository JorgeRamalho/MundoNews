import type { Page } from '@playwright/test';

export async function usePortugueseLocale(page: Page): Promise<void> {
  await page.addInitScript(() => {
    localStorage.setItem('mundonews-lang', 'pt');
  });
}

export async function selectLanguage(page: Page, code: 'pt' | 'en' | 'es'): Promise<void> {
  await page.getByRole('combobox', { name: /Idioma|Language/i }).selectOption(code);
}
