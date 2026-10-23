import { test, expect } from '@playwright/test';

const knownExternalTrackingErrors = [
  /Connecting to 'https:\/\/backend\.leadconnectorhq\.com\/external-tracking\/events' violates the following Content Security Policy directive/i,
  /Fetch API cannot load https:\/\/backend\.leadconnectorhq\.com\/external-tracking\/events/i,
];

test.describe('DJITT homepage smoke', () => {
  test('homepage loads and core sections are visible', async ({ page }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      const msg = error.message;
      if (!knownExternalTrackingErrors.some((pattern) => pattern.test(msg))) {
        pageErrors.push(msg);
      }
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!knownExternalTrackingErrors.some((pattern) => pattern.test(text))) {
          pageErrors.push(text);
        }
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/DJITT/i);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: /turn fragmented operations into intelligent business systems/i })).toBeVisible();
    await expect(page.locator('#problem')).toContainText(/where growth stalls/i);
    await expect(page.locator('#contact')).toContainText(/bring clarity to the next stage of growth/i);
    await expect(page.getByRole('link', { name: /^Start Here$/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /see the problem/i }).first()).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test('main navigation and CTA links work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const startHereLink = page.getByRole('link', { name: /^Start Here$/i }).first();
    await expect(startHereLink).toBeVisible();
    await startHereLink.click();
    await expect(page).toHaveURL(/\/front-door(?:\.html)?$/i);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const problemLink = page.getByRole('link', { name: /see the problem/i }).first();
    await expect(problemLink).toBeVisible();
    await problemLink.click();
    await expect(page.locator('#problem')).toBeVisible();
    await expect(page.locator('#problem')).toBeInViewport();

    const bookingLink = page.getByRole('link', { name: /book a discovery call/i }).first();
    await expect(bookingLink).toHaveAttribute('href', /leadconnectorhq\.com\/widget\/booking\//i);
  });
});
