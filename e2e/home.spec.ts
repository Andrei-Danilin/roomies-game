import { test, expect } from '@playwright/test';

test('root redirects to the default locale (/en)', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByText(/prototype ready/i)).toBeVisible();
});

for (const [locale, faqHeading] of [
  ['en', /frequently asked questions/i],
  ['es', /preguntas frecuentes/i],
  ['ru', /Частые вопросы/i],
] as const) {
  test(`/${locale} is server-rendered with that locale's content`, async ({ page }) => {
    const response = await page.goto(`/${locale}`);
    expect(response?.status()).toBe(200);

    // Assert against the raw server-rendered HTML (not just the post-hydration DOM),
    // since the whole point of locale routing is that crawlers see this without JS.
    const html = await page.content();
    expect(html).toMatch(faqHeading);

    await expect(page.getByRole('heading', { name: faqHeading })).toBeVisible();
  });
}
