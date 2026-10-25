import { defineConfig, devices } from '@playwright/test';

// Set FULL_MATRIX=1 (nightly / pre-release) to add Firefox, WebKit and a mobile device.
const fullMatrix = !!process.env.FULL_MATRIX;

export default defineConfig({
  testDir: './tests',
  // Unit/component tests belong to Vitest; performance files are k6/JMeter assets.
  testIgnore: ['**/unit/**', '**/component/**', '**/performance/**'],
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/reports/html', open: 'never' }],
    ['junit', { outputFile: 'tests/reports/junit/playwright-results.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://djitt.co.uk',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(fullMatrix
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
          { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
        ]
      : []),
  ],
});
