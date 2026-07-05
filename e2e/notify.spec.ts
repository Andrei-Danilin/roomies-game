import { test, expect } from '@playwright/test';

// Mocks /api/notify so this test doesn't need a real MailerLite account/API key — matches
// CLAUDE.md's test strategy ("notify form submits (mock MailerLite)").
test.describe('notify form', () => {
  test('shows an inline error for an invalid email without calling the API', async ({ page }) => {
    let apiCalled = false;
    await page.route('**/api/notify', (route) => {
      apiCalled = true;
      return route.fulfill({ status: 400, json: { error: 'Please enter a valid email address.' } });
    });

    await page.goto('/');
    await page.getByPlaceholder('you@email.com').fill('not-an-email');
    await page.getByRole('button', { name: 'Notify me', exact: true }).click();

    await expect(page.getByText('Please enter a valid email.')).toBeVisible();
    expect(apiCalled).toBe(false);
  });

  test('submits successfully and shows the success state', async ({ page }) => {
    await page.route('**/api/notify', (route) => route.fulfill({ status: 200, json: { ok: true } }));

    await page.goto('/');
    await page.getByPlaceholder('you@email.com').fill('a@b.com');
    await page.getByRole('button', { name: 'Notify me', exact: true }).click();

    await expect(page.getByText("You're on the list! We'll be in touch. 🎉")).toBeVisible();
  });

  test('shows an inline error when the API call fails', async ({ page }) => {
    await page.route('**/api/notify', (route) =>
      route.fulfill({ status: 502, json: { error: 'Could not add you to the waitlist. Please try again.' } }),
    );

    await page.goto('/');
    await page.getByPlaceholder('you@email.com').fill('a@b.com');
    await page.getByRole('button', { name: 'Notify me', exact: true }).click();

    await expect(page.getByText('Please enter a valid email.')).toBeVisible();
  });
});
