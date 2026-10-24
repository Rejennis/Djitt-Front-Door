import { test, expect, type Page } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

async function findBrokenInternalLinks(page: Page) {
  const pageUrl = new URL(page.url());
  const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => (anchor as HTMLAnchorElement).href)
  );
  const targets = Array.from(new Set(hrefs))
    .map((href) => new URL(href, pageUrl))
    .filter((target) => target.origin === pageUrl.origin);

  const failures: string[] = [];
  for (const target of targets) {
    if (
      target.hash &&
      target.pathname === pageUrl.pathname &&
      target.search === pageUrl.search
    ) {
      const targetId = decodeURIComponent(target.hash.slice(1));
      const exists = await page.locator('[id]').evaluateAll(
        (elements, id) => elements.some((element) => element.id === id),
        targetId
      );

      if (!exists) failures.push(`${target.href} points to a missing section`);
      continue;
    }

    const url = `${target.origin}${target.pathname}${target.search}`;
    const response = await page.request.get(url);
    if (response.status() >= 400) failures.push(`${url} returned ${response.status()}`);
  }

  return failures;
}

test.describe('DJITT services regression', () => {
  test('services journey routes visitors to website systems and discovery booking', async ({ page }) => {
    await page.goto(`${baseURL}/services.html`, { waitUntil: 'load' });
    await expect(page).toHaveTitle(/Platform & Services - DJITT/i);
    await expect(page.getByRole('heading', { name: 'Implementation Services' })).toBeVisible();

    const discoveryCall = page
      .locator('#acquisition-card')
      .getByRole('link', { name: 'Book a Free Discovery Call' });
    await expect(discoveryCall).toHaveAttribute(
      'href',
      /^https:\/\/api\.leadconnectorhq\.com\/widget\/booking\//
    );
    await expect(discoveryCall).toHaveAttribute('target', '_blank');

    await page.getByRole('link', { name: 'Start Here', exact: true }).click();
    await expect(page).toHaveURL(/\/front-door\.html$/i);
    await expect(page.getByRole('heading', { name: 'Choose the business problem.' })).toBeVisible();

    await page.getByRole('link', { name: 'Explore website systems' }).click();
    await expect(page).toHaveURL(/\/websites\/$/i);
    await expect(page.locator('#website-lead-form')).toBeVisible();
  });

  test('services page internal links and loaded assets resolve', async ({ page }) => {
    const localOrigin = new URL(baseURL).origin;
    const failedResources: string[] = [];

    page.on('response', (response) => {
      if (new URL(response.url()).origin === localOrigin && response.status() >= 400) {
        failedResources.push(`${response.status()} :: ${response.url()}`);
      }
    });
    page.on('requestfailed', (request) => {
      if (new URL(request.url()).origin === localOrigin) {
        failedResources.push(`${request.failure()?.errorText || 'request failed'} :: ${request.url()}`);
      }
    });

    await page.goto(`${baseURL}/services.html`, { waitUntil: 'load' });

    const brokenLinks = await findBrokenInternalLinks(page);

    expect(brokenLinks).toEqual([]);
    expect(failedResources).toEqual([]);
  });
});
