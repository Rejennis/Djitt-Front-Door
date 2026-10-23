import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseURL = 'http://127.0.0.1:4173';

async function assertNoSevereA11yIssues(page: any, path: string) {
  await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const severeViolations = results.violations.filter((violation) =>
    ['critical', 'serious'].includes(violation.impact || '')
  );

  expect(severeViolations).toEqual([]);
}

test.describe('DJITT accessibility smoke', () => {
  test('homepage has no critical accessibility violations', async ({ page }) => {
    await assertNoSevereA11yIssues(page, '/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/DJITT/i);
  });

  test('front-door page has no critical accessibility violations', async ({ page }) => {
    await assertNoSevereA11yIssues(page, '/front-door.html');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How the route works' })).toBeVisible();
  });
});
