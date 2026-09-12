import { test, expect } from '@playwright/test';

test('mobile layout keeps dark background and no horizontal overflow', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');

  const bodyBackground = await page.$eval('body', (el) => getComputedStyle(el).backgroundColor);
  expect(bodyBackground).not.toBe('rgb(255, 255, 255)');

  const htmlBackground = await page.$eval('html', (el) => getComputedStyle(el).backgroundColor);
  expect(htmlBackground).not.toBe('rgb(255, 255, 255)');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);

  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
});
