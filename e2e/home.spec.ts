import { test, expect } from '@playwright/test';

test('homepage loads and shows the placeholder heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /roomies: chaos happens/i })).toBeVisible();
});
