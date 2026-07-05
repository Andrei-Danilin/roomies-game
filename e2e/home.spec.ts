import { test, expect } from '@playwright/test';

test('homepage loads and shows the hero pitch', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/prototype ready/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
});
