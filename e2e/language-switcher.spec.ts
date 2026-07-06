import { test, expect } from '@playwright/test';

test.describe('language switcher', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  for (const [label, locale, heading] of [
    ['ES', 'es', 'Cuatro compañeros'],
    ['RU', 'ru', 'Четыре соседа'],
  ] as const) {
    test(`switching to ${label} navigates to /${locale} and persists the choice on future "/" visits`, async ({
      page,
    }) => {
      await page.goto('/');
      await page.getByRole('link', { name: label, exact: true }).click();

      await expect(page).toHaveURL(new RegExp(`/${locale}$`));
      await expect(page.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeVisible();

      // Revisiting bare "/" should redirect to the just-chosen locale, not the default,
      // since LanguageSwitcher set the NEXT_LOCALE cookie proxy.ts reads.
      await page.goto('/');
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));
    });
  }

  test('defaults to English with no stored preference', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('heading', { name: /four roommates/i })).toBeVisible();
  });
});
