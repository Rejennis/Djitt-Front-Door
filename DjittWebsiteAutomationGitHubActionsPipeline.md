# Djitt Website Automation GitHub Actions Pipeline

## Objective

This pipeline defines how the Djitt website automation suite can run automatically across pull requests, nightly regression checks and pre-release validation.

---

## 1. Recommended workflow design

Use a single workflow with separate jobs for:

- unit tests
- smoke tests
- regression tests
- API tests
- accessibility checks
- Lighthouse performance checks
- k6 load/burst tests
- JMeter stress tests
- security checks
- load/stress validation summary

This keeps the framework manageable while allowing the fastest jobs to run first and the heavier jobs to run later.

---

## 2. Example workflow structure

```yaml
name: Djitt Website Automation

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test:unit

  smoke-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:smoke

  regression-tests:
    needs: smoke-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:regression

  api-tests:
    needs: regression-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:api

  accessibility-tests:
    needs: api-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:a11y

  lighthouse-tests:
    needs: accessibility-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:lighthouse

  k6-load-tests:
    needs: lighthouse-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: k6 run ./k6/djitt-homepage-load.js

  jmeter-stress-tests:
    needs: k6-load-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: jmeter -n -t jmeter/djitt-website-load-test.jmx -l reports/jmeter-load.jtl
```

---

## 3. Recommended script commands

Add scripts to package.json such as:

```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:smoke": "playwright test tests/smoke",
    "test:regression": "playwright test tests/regression",
    "test:integration": "playwright test tests/integration",
    "test:api": "playwright test tests/api",
    "test:a11y": "playwright test tests/accessibility",
    "test:lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse.html",
    "test:k6": "k6 run ./k6/djitt-homepage-load.js",
    "test:load": "jmeter -n -t jmeter/djitt-website-load-test.jmx -l reports/jmeter-load.jtl"
  }
}
```

---

## 4. Release gate logic

The release gate should block merge or deployment when:

- smoke tests fail
- regression suite fails
- critical API validation fails
- accessibility issues are present on critical conversion routes
- performance exceeds agreed budget
- load/stress test exceeds critical thresholds

This ensures that automation acts as a true quality gate rather than a reporting-only tool.

---

## 5. Recommended job ordering

### Fast gate

- unit tests
- lint and static checks
- smoke tests
- accessibility checks

### Deeper validation

- regression tests
- integration tests
- API tests
- Lighthouse checks
- k6 load and burst testing
- JMeter stress testing
- security scans

### Peak-load validation

- k6 and JMeter load/stress checks
- scheduled overnight regression and baseline checks

---

## 6. Reporting strategy

The workflow should publish artifacts for:

- Playwright HTML report
- JUnit XML report
- screenshots and traces for failed runs
- Lighthouse performance results
- k6 summary reports
- JMeter results files
- API response summaries

This makes the pipeline actionable and easier to investigate when failures occur.

---

## 7. Best practices

- Run fast checks first to shorten feedback time
- Keep scheduled jobs for deeper validation and full browser coverage
- Use environment-specific configuration for local, staging and production
- Treat retries as a signal for flaky automation rather than a fix
- Make release approval contingent on passing critical tests

---

## 8. Summary

A GitHub Actions pipeline for the Djitt website should support both speed and confidence. Fast PR checks validate basic correctness while nightly and pre-release jobs provide broader assurance. This allows the team to stop regressions early without slowing down development.
