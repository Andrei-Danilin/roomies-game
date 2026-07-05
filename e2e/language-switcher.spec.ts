import { test, expect } from '@playwright/test';

test.describe('language switcher', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  for (const [label, heading] of [
    ['ES', 'Cuatro compañeros'],
    ['RU', 'Четыре сосед'],
  ] as const) {
    test(`switching to ${label} updates visible copy and persists across reload`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: label, exact: true }).click();
      await expect(page.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeVisible();

      await page.reload();
      await expect(page.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeVisible();
    });
  }

  test('defaults to English with no stored preference', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /four roommates/i })).toBeVisible();
  });
});
