import { test, expect } from '@playwright/test';

test('navigates between major and minor harmonic fields', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MENOR' })).toHaveAttribute('href', '/menor');

  await page.getByRole('link', { name: 'MENOR' }).click();
  await expect(page).toHaveURL(/\/menor$/);
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Menor)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MENOR' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('link', { name: 'MAIOR' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
});
