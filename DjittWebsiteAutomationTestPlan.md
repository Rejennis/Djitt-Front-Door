# DjittWebsiteAutomationTestPlan

## 1. Objective

This plan defines an automation strategy for the djitt.co.uk website to provide continuous quality assurance across the full delivery lifecycle. The focus is to verify that public-facing pages, lead capture journeys, content quality, accessibility, performance, API behaviour and release readiness remain stable across code changes and deployments.

The automated suite will cover:

- Unit tests for reusable logic and validation rules
- Smoke tests for critical website functionality
- Regression tests to guard against unintended breakages
- Integration tests for client-side flows and backend interactions
- API tests for Netlify Functions, services and third-party integrations
- Load and stress tests for traffic bursts and resilience

The approach follows the DJITT Enterprise Automation Testing Framework and is designed to run quickly on code changes while including deeper checks in staging and release gates.

---

## 2. Scope of testing

### In scope

- Homepage and key marketing pages
- Navigation and page routing
- Contact and enquiry forms
- Service and solution pages
- Search and internal discovery patterns
- SEO metadata and structured content checks
- Accessibility and usability standards
- Mobile, tablet and desktop responsiveness
- Form validation and submission handling
- API contract and integration stability
- Monitoring and production health checks

### Out of scope

- Full end-user penetration testing beyond automated security scans
- Manual visual review of every marketing section when automation covers the same route and UI behaviour
- Unrelated internal business systems not exposed via the website

---

## 3. Test strategy

### Testing principles

1. Automated tests must run in the same way locally, in CI and in preview/staging environments.
2. Fast tests must execute on every commit/PR.
3. Browser and integration tests must validate real user journeys.
4. Production-critical flows must be blocked from release if they fail.
5. Tests must provide clear reporting and failure triage.

### Test pyramid

Use a layered approach:

- Unit tests: broadest and fastest coverage for logic and validation
- Integration tests: verify UI + functions + outbound services together
- Smoke tests: small but critical end-to-end validation after deploy
- Regression suite: layered release safety net for key journeys
- API tests: verify contract behaviour and data payload integrity
- Load/stress tests: validate resilience under concurrency and peak load

---

## 4. Test environments

| Environment | Purpose | Target users | Typical checks |
| --- | --- | --- | --- |
| Local development | Developer verification | Developers | Unit, component and local integration checks |
| Preview/staging | Pre-release validation | QA and team | Smoke, regression, API and accessibility |
| Production | Live verification | Public | Smoke checks and monitoring alerts |

### Required test URLs

- Local: http://localhost:3000 or equivalent local dev server
- Staging: https://staging.djitt.co.uk or preview deploy URL
- Production: https://djitt.co.uk

All automation should support environment switching via a base URL configuration and environment variables.

---

## 5. Test tools and stack

### Core automation tools

- Playwright: browser automation, end-to-end journeys, mobile/responsive checks, form validation, smoke and regression coverage
- Vitest: unit and component tests for JavaScript logic and reusable UI functions
- axe-core: accessibility scans for common WCAG issues
- GitHub Actions: CI orchestration, scheduled runs, deployment gates
- Lighthouse / performance tooling: performance and best-practice checks
- OWASP ZAP: security scanning in staging or authorized test environments
- k6 or equivalent: load and stress testing for API and traffic simulation

### Recommended folder structure

```text
/tests
  /unit
  /component
  /smoke
  /regression
  /integration
  /api
  /performance
  /fixtures
  /helpers
  /reports
playwright.config.ts
vitest.config.ts
```

---

## 6. Test suite design

## 6.1 Unit tests

### Purpose

Validate individual logic blocks without running a browser. This provides fast feedback and broad functional coverage.

### Coverage areas

- Input validation and form field rules
- Search and filter logic
- Pricing or quote calculation logic
- Content transforms and date/format handling
- URL generation and SEO metadata helpers
- Reusable client-side utilities
- Safe parsing and sanitization functions

### Examples

- Email validation rules for enquiry forms
- Character limit enforcement on message fields
- URL and slug generation for campaign pages
- Conditional logic for service selection or quote options
- Data normalization for CRM payloads

### Tooling

- Vitest
- jsdom or browser-like environment where needed

### Execution trigger

- Every push and pull request

### Pass criteria

- All unit tests pass
- Coverage threshold for critical logic remains above target

---

## 6.2 Smoke tests

### Purpose

Confirm that key user-facing features are working immediately after deployment or a production branch merge.

### Critical routes to verify

- Homepage loads successfully
- Main navigation works
- Core service pages render properly
- Contact or enquiry form page loads
- Form fields are visible and valid
- Page title and meta description are present
- No browser console errors on page load
- No critical broken image or asset requests

### Example checks

- Page loads with HTTP 200 on main public pages
- Navigation links resolve to expected pages
- CTA buttons are visible and interactive
- Contact form opens with required fields present
- Repeated run produces no unexpected runtime error

### Tooling

- Playwright

### Execution trigger

- Every deployment to preview/staging
- Production smoke suite scheduled post-deploy

### Pass criteria

- All critical flows pass with no console-level blocking errors
- Page load time remains within agreed threshold for critical routes

---

## 6.3 Regression tests

### Purpose

Protect against breakages introduced by updates to templates, content changes, form logic or shared components.

### Regression scope

- Navigation and menu behaviour
- Core marketing pages and conversion funnels
- Contact flows across desktop and mobile viewports
- Content rendering for key pages
- SEO metadata and robots/canonical configuration
- Broken links and missing assets
- Browser compatibility regressions

### Typical scenarios

- Home page > Services > Contact flow
- About page > enquiry CTA > form submission
- Search or filtering flow for case studies, services or content navigation
- Broken page links after content migration or CMS changes

### Tooling

- Playwright with shared page objects and fixtures

### Scheduling

- On every PR
- Nightly full regression suite
- Before major release or production deploy

### Pass criteria

- No previously approved user journey fails
- Regression suite remains stable and deterministic

---

## 6.4 Integration tests

### Purpose

Validate that the website works correctly with the real systems it depends on, such as Netlify Functions, API endpoints, CRM integrations, email providers and analytics.

### Coverage areas

- Contact form submission to backend handler
- Validation results before submission
- Netlify Function success/failure handling
- Email or CRM response handling
- Request payload integrity
- Retry and error states for failed third-party calls
- Analytics event firing and consent behaviour

### Example scenarios

- Successful enquiry form submission stores data and returns success state
- Invalid input blocks submission and shows validation errors
- Netlify Function returns 400 when payload is malformed
- Third-party CRM integration failure surfaces a clear user-facing message
- Successful form submission records analytics event without duplication

### Tooling

- Playwright for browser-driven integration testing
- Local Netlify dev environment or staging environment for realistic backend behaviour
- Mocking only for external dependencies that cannot be safely hit in CI

### Pass criteria

- End-to-end user flow completes without data loss
- Integration failures are handled gracefully and logged appropriately

---

## 6.5 API tests

### Purpose

Verify the contract, behaviour and reliability of all website-facing APIs or serverless endpoints.

### APIs to cover

- Netlify Functions or serverless endpoints used by forms
- Public content APIs or CMS retrieval endpoints
- Webhooks and callback endpoints if used
- Health check endpoints
- Any lead submission or CRM integration endpoint

### API checks

- Correct HTTP status codes
- Response schema validation
- Required request fields enforced
- Error responses are meaningful and consistent
- Rate limiting and rejection conditions are handled correctly
- Authentication or secret handling is not exposed in responses

### Example API tests

- POST /api/enquiry returns 200 for valid payloads
- POST /api/enquiry returns 400 for missing required values
- Unexpected payload shape returns structured validation errors
- Duplicate or repeated requests are not silently accepted if policy requires deduplication

### Tooling

- Playwright request API or dedicated API test runner
- JSON schema validators for response assertions

### Pass criteria

- Every API contract behaves as documented
- Invalid inputs fail predictably and safely

---

## 6.6 Load and stress tests

### Purpose

Validate that the website and backend functions remain stable under real or simulated traffic pressure.

### Focus areas

- Homepage response under concurrent user load
- Form submission capacity during spikes
- API endpoint latency and throughput
- Recovery after burst traffic or transient faults
- Resource usage under repeated page navigation
- Stability of Netlify function execution under demand

### Test scenarios

- 10 concurrent users on critical pages
- 50-100 users across key journeys during short bursts
- Repeated form submissions under high concurrency
- Ramp-up and sustained traffic assessment
- Peak-time spikes to simulate marketing campaign traffic

### Tooling

- k6 or similar load tool
- Optional Lighthouse or synthetic monitoring integration

### Key success metrics

- Response time under target threshold for critical pages
- No unacceptable rate of failures under simulated load
- No unhandled exceptions or server errors during traffic bursts
- Recovery begins within expected time after a spike

### Pass criteria

- No critical route exceeds SLA under expected peak load
- Client and server systems degrade gracefully rather than failing outright

---

## 7. Accessibility and quality checks

### Automated accessibility suite

- axe-core checks across all major pages
- Keyboard navigation coverage for interactive elements
- Focus order validation
- Heading hierarchy and landmark audits
- Contrast checks on key UI states
- ARIA use validation for dynamic content

### Coverage trigger

- On every PR and nightly CI run

### Pass criteria

- No critical or high-severity accessibility violations on key pages
- New issues must be triaged before merge if they affect accessibility-critical flows

---

## 8. Security validation

### Automated security checks

- Dependency scanning for outdated or vulnerable packages
- Secret scanning in code and workflow configuration
- Basic security checks for form inputs and unsafe data handling
- OWASP ZAP scan on staging or authorized test deployment

### Security controls to validate

- No secrets or credentials exposed in frontend code
- Form payloads are sanitized and validated server-side
- Authentication and access controls are correct where applicable
- Error handling does not leak stack traces or sensitive data

### Trigger

- On pull requests and nightly runs for staging

---

## 9. Performance validation

### Metrics to capture

- Page load time
- Time to first meaningful paint
- Largest contentful paint
- Cumulative layout shift
- JavaScript and asset payload size
- Image efficiency and compression
- Excessive re-renders or slow interactions

### Performance gates

- Key landing pages must remain within agreed performance thresholds
- Major page changes must not introduce regressions beyond a defined budget

### Tools

- Lighthouse
- Browser performance tracing in Playwright
- Real-user monitoring or synthetic checks if deployed

---

## 10. CI and release pipeline

### Pull request gate

Run on every PR:

1. Install dependencies
2. Run unit and component tests
3. Run lint and static checks
4. Execute smoke tests on preview environment
5. Run accessibility checks
6. Publish test results and screenshots

### Nightly regression gate

Run nightly:

1. Full regression suite across browsers and viewports
2. API contract tests
3. Accessibility audit
4. Performance baseline checks
5. Dependency and security scans

### Pre-production gate

Before production release:

1. Full smoke and regression suite against staging
2. API validation and data integrity checks
3. Load/stress test on critical flows
4. Security scan and dependency review
5. Final sign-off by QA or release manager

### Release block conditions

- Any critical workflow failure
- Accessibility violations on main conversion pages
- Broken form submission or integration path
- API contract mismatches
- Stability issues under expected peak load

---

## 11. Reporting and defect handling

### Required outputs

- JUnit results for CI
- HTML report for Playwright runs
- Screenshots for failed UI tests
- Trace logs and captured browser context
- API response logs for failure diagnostics
- Summary report for smoke and release gates

### Failure classification

- P0: production-blocking issue affecting critical journeys
- P1: important user or conversion issue
- P2: low-impact defect or cosmetic regression
- Flaky: test passes on retry but fails transiently; requires investigation

### Test ownership

- Developers own unit and component tests for changed areas
- QA or test engineer owns smoke and regression automation
- Platform or engineering owner owns integration and API reliability checks

---

## 12. Acceptance criteria

The website automation strategy will be considered successful when:

- All critical user journeys are automated and stable
- Smoke tests run reliably on every deployment
- Regression failures are caught before production impact
- Integration tests validate real backend behaviour
- API contract checks enforce valid payloads and expected responses
- Performance and accessibility issues are surfaced early
- Load and stress tests confirm the site remains resilient under peak demand

---

## 13. Recommended implementation order

1. Establish the core Playwright and Vitest setup
2. Add smoke tests for homepage and contact flow
3. Add regression coverage for main marketing pages and navigation
4. Add form submission and integration validation for Netlify Function or CRM path
5. Add API contract tests for all public endpoints
6. Add accessibility checks
7. Add load/stress script for critical endpoints
8. Integrate the suite into GitHub Actions as release gates

---

## 14. Summary

The djitt.co.uk website should be treated as a business-critical customer conversion platform. The test plan therefore covers both functional correctness and operational readiness. By combining fast unit checks with realistic browser, API and load testing, DJITT can prevent release regressions, validate lead capture flows, and protect the website from performance and accessibility issues before they reach public users.

This plan aligns with the DJITT Quality Engineering Framework and provides a practical, scalable path to reliable automated verification for the website.
