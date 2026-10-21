# Djitt Website Automation Execution Checklist

## Purpose

This checklist translates the Djitt website automation strategy into a practical delivery plan for the team. It helps convert the strategy into weekly execution, release validation and recurring maintenance tasks.

---

## 1. Setup and foundations

### Sprint 0 / Initial setup

- [ ] Confirm target environments: local, preview/staging and production
- [ ] Confirm public routes and key conversion journeys
- [ ] Verify Node.js, npm and Git are available in the VS Code environment
- [ ] Confirm package manager and repository structure
- [ ] Create a dedicated automation folder structure under the website repository
- [ ] Create Playwright config with base URL support
- [ ] Create Vitest config for unit/component validation
- [ ] Define page objects and reusable helper utilities
- [ ] Agree naming conventions for tests and reports

### Tooling readiness

- [ ] Playwright installed and browser dependencies configured
- [ ] Vitest installed and configured
- [ ] Lighthouse installed and configured for page performance benchmarking
- [ ] k6 installed and configured for load and burst testing
- [ ] JMeter installed and configured for stress testing
- [ ] Build/test commands documented in the project README
- [ ] Test reports configured for HTML, JUnit and tool-specific outputs
- [ ] CI environment variables and secrets validation process documented

---

## 2. Smoke test phase

### Priority routes

- [ ] Homepage loads successfully
- [ ] Main navigation works across desktop and mobile
- [ ] Core service and solution pages render without errors
- [ ] Contact page loads and required fields are visible
- [ ] Form validation behaves correctly before submission
- [ ] CTAs and enquiry links resolve correctly
- [ ] No critical console errors appear on page load

### Exit criteria

- [ ] Smoke suite passes on preview/staging environment
- [ ] Smoke suite is run after each deployment
- [ ] Report includes screenshot and trace on failure

---

## 3. Regression test phase

### Core user journeys

- [ ] Homepage to services journey
- [ ] Homepage to contact journey
- [ ] Services page navigation and CTA path
- [ ] Enquiry validation journey
- [ ] Search and content discovery journey
- [ ] Broken link or missing asset check

### Browser coverage checklist

- [ ] Chromium desktop
- [ ] Firefox desktop
- [ ] WebKit desktop
- [ ] Mobile viewport coverage

### Exit criteria

- [ ] Regression suite passes without new failures
- [ ] Regressions are triaged before release approval
- [ ] Visual regressions are reviewed for intentional changes

---

## 4. Integration and API validation

### Integration checks

- [ ] Contact form submission works against local or staging backend
- [ ] Validation rules are enforced before submission
- [ ] Success and error states are displayed correctly
- [ ] Netlify function or equivalent integration responds as expected
- [ ] Outbound service calls do not block the user journey
- [ ] Payload data matches expected CRM or email route format

### API checks

- [ ] HTTP success and failure codes validated
- [ ] Required parameters are enforced
- [ ] Response schema is checked for required fields
- [ ] Invalid payloads fail with structured error output
- [ ] Authentication and secret values are not exposed in responses

### Exit criteria

- [ ] No integration contract mismatches
- [ ] Form submission flow works in staging and preview
- [ ] API tests pass before release approval

---

## 5. Accessibility and quality checks

- [ ] Core pages are scanned with axe-core
- [ ] Keyboard navigation is validated for forms and buttons
- [ ] Focus states are checked
- [ ] Heading hierarchy is reviewed for semantic structure
- [ ] Contrast failures are reviewed
- [ ] ARIA attributes are validated where used

### Exit criteria

- [ ] No critical accessibility issues on key pages
- [ ] High-severity issues are either fixed or explicitly accepted

---

## 6. Performance and resilience checks

- [ ] Lighthouse baseline established for main pages
- [ ] Critical page performance is tracked over time
- [ ] JavaScript payload remains within acceptable levels
- [ ] Asset compression and image sizes reviewed
- [ ] k6 load and burst simulation completed for key journeys
- [ ] JMeter stress validation completed for peak traffic scenarios
- [ ] Error recovery is validated for repeated form submissions

### Exit criteria

- [ ] No major performance regression against previous baseline
- [ ] Peak-time simulation remains within agreed SLA

---

## 7. Security checks

- [ ] Dependency vulnerability scan completed
- [ ] Secret scan completed for repo and workflow files
- [ ] Input validation reviewed for sensitive fields
- [ ] OWASP ZAP scan completed in staging or test environment
- [ ] Release does not proceed with exposed secrets or unreviewed vulnerable libraries

### Exit criteria

- [ ] No critical security findings remain unresolved
- [ ] Security issues are tracked and remediated before release

---

## 8. CI scheduling checklist

### On every pull request

- [ ] Unit tests
- [ ] Component tests
- [ ] Lint/static checks
- [ ] Smoke tests against preview environment
- [ ] Accessibility checks
- [ ] Test reports published

### Nightly

- [ ] Full browser regression suite
- [ ] API validation suite
- [ ] Accessibility scan
- [ ] Dependency security scan
- [ ] Lighthouse performance regression baseline check
- [ ] k6 load and burst validation
- [ ] JMeter stress validation

### Before release

- [ ] Full regression suite
- [ ] API and integration validation
- [ ] Lighthouse, k6 and JMeter performance checks
- [ ] Security review
- [ ] Production smoke test
- [ ] Final sign-off

---

## 9. Defect triage workflow

- [ ] Failures are classified as P0, P1, P2 or flaky
- [ ] Screenshots and logs are attached to failed automated runs
- [ ] Owner is assigned for each issue
- [ ] Fix validation runs before merge or release
- [ ] Flaky tests are investigated separately and not treated as passed

---

## 10. Definition of done

The automation work is complete when:

- [ ] Critical user journeys are automated and stable
- [ ] Smoke tests run after deployment
- [ ] Regression checks block regressions before production
- [ ] API contract validation is in place
- [ ] Accessibility issues are surfaced automatically
- [ ] Performance and load checks provide early warnings
- [ ] CI and release gates are documented and consistent

---

## 11. Recommended delivery order

1. [ ] Configure Playwright and Vitest
2. [ ] Build smoke suite for homepage and contact flow
3. [ ] Add regression coverage for key pages and navigation
4. [ ] Add backend integration and API checks
5. [ ] Add accessibility checks
6. [ ] Add Lighthouse performance checks
7. [ ] Add k6 load and burst checks
8. [ ] Add JMeter stress checks
9. [ ] Connect all suites to GitHub Actions
10. [ ] Validate release gate readiness

This checklist should be used as the execution operational guide for the automation rollout for djitt.co.uk.
