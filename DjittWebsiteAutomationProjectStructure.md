# Djitt Website Automation Project Structure

## Purpose

This document shows a practical folder and test structure for the djitt.co.uk website automation suite. It keeps test code separate from the website application code and supports Playwright, Vitest, Postman and JMeter automation in a clear and scalable way.

---

## 1. Recommended repository structure

```text
website/
  app/
  public/
  src/
  tests/
    unit/
      pricing/
      validation/
      utils/
    component/
      nav/
      forms/
    smoke/
      homepage.spec.ts
      contact.spec.ts
      services.spec.ts
    regression/
      marketing-flow.spec.ts
      enquiry-flow.spec.ts
    integration/
      form-submission.spec.ts
      crm-integration.spec.ts
    api/
      enquiry-api.spec.ts
      healthcheck.spec.ts
    performance/
      lighthouse.spec.ts
      k6/
        djitt-homepage-load.js
        djitt-contact-burst.js
      jmeter/
        djitt-website-load-test.jmx
        djitt-website-stress-test.jmx
    fixtures/
      pages/
      data/
      env/
    helpers/
      page-objects/
      assertions/
      report-utils/
    reports/
      html/
      junit/
      lighthouse/
      k6/
      jmeter/
  playwright.config.ts
  vitest.config.ts
  .github/
    workflows/
      website-tests.yml
  postman/
    DjittWebsite.postman_collection.json
    DjittWebsite.postman_environment.json
  lighthouse/
    lighthouse-config.js
  k6/
    djitt-homepage-load.js
    djitt-contact-burst.js
  jmeter/
    djitt-website-load-test.jmx
    djitt-website-stress-test.jmx
```

---

## 2. Recommended testing split

### Unit tests

Purpose: fast validation of core logic and utilities.

Examples:

```text
/tests/unit/validation/email-validation.spec.ts
/tests/unit/pricing/quote-calculator.spec.ts
/tests/unit/utils/url-helper.spec.ts
```

### Smoke tests

Purpose: minimal but critical checks after deployment.

Examples:

```text
/tests/smoke/homepage.spec.ts
/tests/smoke/contact.spec.ts
/tests/smoke/services.spec.ts
```

### Regression tests

Purpose: protect high-value user journeys and templates.

Examples:

```text
/tests/regression/marketing-flow.spec.ts
/tests/regression/enquiry-flow.spec.ts
```

### Integration tests

Purpose: validate frontend + backend behaviour with real functions or staging services.

Examples:

```text
/tests/integration/form-submission.spec.ts
/tests/integration/crm-integration.spec.ts
```

### API tests

Purpose: validate API contract behaviour and error handling.

Examples:

```text
/tests/api/enquiry-api.spec.ts
/tests/api/healthcheck.spec.ts
```

### Performance tests

Purpose: verify metrics, budgets and resilience at scale.

Examples:

```text
/tests/performance/lighthouse.spec.ts
/tests/performance/k6/djitt-homepage-load.js
/tests/performance/jmeter/djitt-website-load-test.jmx
```

Lighthouse is used for front-end performance and quality benchmarking, while k6 and JMeter are used for request-level and concurrency testing.

---

## 3. Example Playwright smoke test

```ts
import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Djitt|Home/i);
  await expect(page.locator('body')).toBeVisible();
});

test('contact page renders required fields', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByLabel(/name/i)).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
});
```

This gives a fast smoke path for the primary website and lead-generation journey.

---

## 4. Example Vitest unit test

```ts
import { describe, expect, test } from 'vitest';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

describe('email validation', () => {
  test('accepts a valid email address', () => {
    expect(validateEmail('hello@djitt.co.uk')).toBe(true);
  });

  test('rejects an invalid email address', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
```

This supports the fast validation layer for reusable logic before browser automation runs.

---

## 5. Postman structure

```text
postman/
  DjittWebsite.postman_collection.json
  DjittWebsite.postman_environment.json
```

Typical Postman coverage:

- Enquiry API success path
- Invalid payload rejection
- Missing field validation
- Response schema verification
- Health checks and status endpoints

---

## 6. Lighthouse structure

```text
lighthouse/
  lighthouse-config.js
```

Typical Lighthouse coverage:

- Homepage performance benchmark
- Accessibility and best-practice checks
- Page speed regression monitoring
- Mobile performance checks for key routes

---

## 7. k6 structure

```text
k6/
  djitt-homepage-load.js
  djitt-contact-burst.js
```

Typical k6 coverage:

- Homepage load simulation
- Contact form burst simulation
- Throughput and latency monitoring
- Request spike validation for critical journeys

---

## 8. JMeter structure

```text
jmeter/
  djitt-website-load-test.jmx
  djitt-website-stress-test.jmx
```

Typical JMeter coverage:

- Homepage load scenario
- Service page concurrency check
- Contact form submission under traffic spike
- Burst overload validation
- Response time and throughput reporting

---

## 9. Reporting structure

```text
/tests/reports/
  html/
  junit/
```

Recommended outputs:

- Playwright HTML summary report
- JUnit XML output for CI readers
- screenshots for failed browser tests
- trace files for diagnostics
- Postman summary output for API runs
- JMeter dashboard/report exports for load analysis

---

## 10. Suggested execution order

1. Unit tests
2. Smoke tests
3. API tests
4. Regression tests
5. Accessibility scans
6. Lighthouse performance checks
7. k6 load and burst tests
8. JMeter stress testing
9. Nightly and release gate runs

This keeps the suite fast while still providing strong coverage for lead-generation and production-readiness.

---

## 11. Best practices

- Keep test names readable and business-focused
- Separate environment config from test logic
- Use page objects for repeatable browser flows
- Keep smoke tests minimal but high-value
- Use dedicated API and performance tests instead of mixing them into browser tests
- Keep JMeter and Postman independent from Playwright and k6 so these tools remain clearly separated

The framework remains scalable even if DJITT adds more website projects or client-specific sales sites later.
