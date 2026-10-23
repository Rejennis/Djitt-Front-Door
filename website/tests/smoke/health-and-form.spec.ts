import { test, expect } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

const knownExternalTrackingErrors = [
  /Connecting to 'https:\/\/backend\.leadconnectorhq\.com\/external-tracking\/events' violates the following Content Security Policy directive/i,
  /Fetch API cannot load https:\/\/backend\.leadconnectorhq\.com\/external-tracking\/events/i,
  /Failed to load resource: net::ERR_BLOCKED_BY_CLIENT/i,
];

function isKnownError(message: string) {
  return knownExternalTrackingErrors.some((pattern) => pattern.test(message));
}

async function attachHealthListeners(page: any) {
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('pageerror', (error: Error) => {
    const msg = error.message;
    if (!isKnownError(msg)) pageErrors.push(msg);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!isKnownError(text)) pageErrors.push(text);
    }
  });

  page.on('requestfailed', (request) => {
    const url = request.url();
    if (!/leadconnectorhq|google-analytics|googletagmanager/i.test(url)) {
      failedRequests.push(`${request.failure()?.errorText || 'request failed'} :: ${url}`);
    }
  });

  page.on('response', (response) => {
    if (response.status() >= 400 && !/leadconnectorhq|google-analytics|googletagmanager/i.test(response.url())) {
      failedRequests.push(`${response.status()} :: ${response.url()}`);
    }
  });

  return { pageErrors, failedRequests };
}

test.describe('DJITT health and enquiry flow', () => {
  test('homepage and main navigation remain healthy with no critical browser errors', async ({ page }) => {
    const health = await attachHealthListeners(page);

    await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/DJITT/i);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#problem')).toContainText(/where growth stalls/i);
    await expect(page.locator('#contact')).toContainText(/bring clarity to the next stage of growth/i);
    await expect(page.getByRole('link', { name: /^Start Here$/i }).first()).toBeVisible();

    await page.getByRole('link', { name: /^Start Here$/i }).first().click();
    await expect(page).toHaveURL(/\/front-door(?:\.html)?$/i);

    expect(health.pageErrors).toEqual([]);
    expect(health.failedRequests).toEqual([]);
  });

  test('website lead form validates required fields and accepts a successful submission', async ({ page }) => {
    const health = await attachHealthListeners(page);

    await page.route('**/.netlify/functions/website-leads-submit', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          accepted: true,
          queued: false,
          message: 'Website lead accepted locally. GHL API credentials and location ID are not configured yet.'
        })
      });
    });

    await page.goto(`${baseURL}/websites/`, { waitUntil: 'domcontentloaded' });

    const form = page.locator('#website-lead-form');
    await expect(form).toBeVisible();

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');

    await form.getByRole('button', { name: /get your custom website/i }).click();
    expect(await nameInput.evaluate((element: HTMLInputElement) => !element.checkValidity())).toBeTruthy();
    expect(await emailInput.evaluate((element: HTMLInputElement) => !element.checkValidity())).toBeTruthy();

    await nameInput.fill('Automation Test Lead');
    await page.locator('input[name="businessName"]').fill('Automation Test Co');
    await page.locator('input[name="phone"]').fill('+447700900123');
    await emailInput.fill('test+automation@djitt.co.uk');
    await page.locator('select[name="businessType"]').selectOption('Professional services');
    await page.locator('select[name="hasWebsite"]').selectOption('No');
    await page.locator('textarea[name="websiteGoal"]').fill('We need a stronger digital front door and stronger lead conversion.');
    await page.locator('select[name="projectTimeline"]').selectOption('Within 30 days');
    await page.locator('textarea[name="brief"]').fill('We want our website and lead flow to feel more premium and convert more local enquiries.');

    await form.getByRole('button', { name: /get your custom website/i }).click();

    await expect(page.locator('#website-success')).toBeVisible();
    await expect(page.locator('#website-success')).toContainText(/received|we’ll be in touch|we will be in touch/i);
    expect(health.pageErrors).toEqual([]);
    expect(health.failedRequests).toEqual([]);
  });
});
