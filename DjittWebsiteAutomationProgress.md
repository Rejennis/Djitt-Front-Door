# Djitt Website Automation Progress Log

## Project

Djitt Website Automation Crash Test and Foundation Rollout

## Objective

Establish a usable automation framework for djitt.co.uk that can be expanded over time while delivering immediate value in a single-day crash test.

## Test stack

- Playwright for smoke, regression and end-to-end browser journeys
- Vitest for unit and validation logic
- Postman for API contract checks
- Lighthouse for performance and accessibility baseline checks
- k6 for lightweight load and burst testing
- JMeter for deeper stress validation

## Current status

Status: In progress

Date: 2026-10-19

Current focus:
- Confirm target site routes and critical user journeys
- Define the first-day high-value test set
- Set up the working documentation and progress tracker
- Prepare the initial automation foundation
- Validate browser health checks after the core smoke and journey validations passed
- Prepare the next automation run using the installed tool stack

### Completed so far

- [x] Manual sanity review of the site structure and core journey
- [x] Homepage renders successfully
- [x] Navigation and anchor behaviour works
- [x] CTA validation passes
- [x] Broken content check passes
- [x] Form and lead flow validation passes (where applicable)
- [x] Tool-stack validation completed successfully
- [x] Node.js and npm verified
- [x] Playwright installed and ready
- [x] Lighthouse installed and verified
- [x] k6 installed and verified
- [x] JMeter installed and verified
- [x] Playwright project foundation prepared for the first automated run

### In progress

- [ ] Console and page health check
- [ ] Capture failed network requests
- [ ] Accessibility smoke check
- [ ] Lighthouse baseline
- [ ] Basic load check
- [ ] First Playwright smoke execution using the installed stack

---

## Day 1 crash test plan

### Priority 1: core user journey automation

- [ ] Homepage loads successfully
- [ ] Main navigation works
- [ ] Services page renders correctly
- [ ] Contact form loads
- [ ] Required fields are visible
- [ ] Empty form validation works
- [ ] Invalid email validation works
- [ ] Valid enquiry submission succeeds
- [ ] Success state is visible to the user
- [ ] No critical console errors appear

### Priority 2: API verification

- [ ] Valid enquiry payload returns success response
- [ ] Invalid payload returns structured validation failure
- [ ] Missing required data is rejected cleanly
- [ ] Response content is validated

### Priority 3: performance and accessibility baseline

- [ ] Lighthouse baseline for homepage
- [ ] Lighthouse baseline for contact page
- [ ] Core accessibility smoke check on the main journey

### Priority 4: load validation

- [ ] k6 smoke load test for homepage or enquiry endpoint
- [ ] JMeter smoke stress test for critical route or API endpoint

### Priority 5: CI readiness

- [ ] GitHub Actions workflow configured for early checks
- [ ] Test reports stored and readable
- [ ] Failure screenshots and traces captured

---

## Test scope for the first pass

### Must-have tests

1. Homepage loads
2. Services page renders
3. Contact form visible and enabled
4. Validation rules work
5. Successful submission flow works
6. API success and failure path validated
7. No console errors on main flow
8. Lighthouse baseline for homepage
9. k6 or JMeter smoke load check

### Stretch goals

- Full cross-browser run
- Additional service pages
- Visual regression smoke pages
- Additional API endpoints
- More comprehensive accessibility sweep
- Extended load scenarios

---

## Recommended execution order

1. Setup environment and dependencies
2. Write homepage smoke test
3. Write contact form validation tests
4. Write successful enquiry submission test
5. Add API tests for valid and invalid payloads
6. Run Lighthouse baseline
7. Run k6 or JMeter smoke test
8. Review failures and stabilise selectors
9. Add CI workflow
10. Review and expand

---

## Progress notes

### 2026-10-19

- Project documentation reviewed and test strategy aligned to the existing DJITT automation framework.
- Initial plan established for a one-day crash-test foundation.
- Created this progress tracker so the team can update work as it evolves.
- Next step: set up the automation project structure and begin the first smoke tests.

### Today’s update

- Completed: Manual validation stage
  - Manual sanity review of the site structure and core journey
  - Core smoke and layout checks completed successfully by observation
  - CTA, navigation and content validation completed successfully by manual review
  - Form validation and lead flow checks completed successfully where applicable
  - Site basics reviewed and confirmed before moving to automation
- Completed: Tool-stack validation and setup
  - Tool stack validation completed successfully
  - Node.js and npm verified
  - Playwright installed and verified
  - Lighthouse installed and verified
  - k6 installed and verified
  - JMeter installed and verified
  - Playwright project foundation prepared for the first automated run
- In progress:
  - Console and page health check using Playwright listeners
  - Failed network request capture using Playwright listeners
  - Accessibility smoke validation
  - Lighthouse baseline
  - Light load check using k6/JMeter
  - First Playwright smoke execution using the installed stack
- Blockers:
  - Need to confirm the target environment is stable and suitable for the first automated pass
  - Need to confirm the exact lead/contact form endpoint or expected submission flow
- Next actions:
  - Run console and network health checks in Playwright
  - Run accessibility checks against the homepage and CTA flow
  - Capture Lighthouse baseline scores
  - Execute a lightweight k6 or JMeter smoke test
  - Update the team on any environment issues or flaky selectors
  - Record the first Playwright test execution results in this file
- Notes:
  - Manual checks were completed first to confirm the user journey before automation.
  - Tooling was then installed and validated as the pre-flight step before running automated checks.
  - The next phase is automated execution of the browser health, accessibility, and performance checks.
  - This file is the handoff record for anyone continuing the work tomorrow.

---

## Open actions

- [ ] Confirm live site routes and pages to validate
- [ ] Confirm contact form endpoint or test environment path
- [ ] Confirm whether staging or local preview will be the first validation target
- [ ] Decide whether to use local dev or deployed preview for day-one Playwright runs
- [ ] Finalise the first set of selectors and page objects
- [ ] Create initial Playwright test files
- [ ] Create initial Postman API collection
- [ ] Create initial k6/JMeter smoke scripts
- [ ] Record the first Playwright command output and results
- [ ] Capture console and network error evidence for the health-check stage
- [ ] Capture Lighthouse baseline results for homepage and CTA flow
- [ ] Capture lightweight performance result from k6 or JMeter

---

## Notes for junior engineer handoff

The first e2e training flow should cover:

- homepage load
- navigation to services
- contact form validation
- valid submission
- server/API success response
- failure handling for invalid input
- accessibility check on critical page
- basic Lighthouse verification

This is the best first learning path because it exercises the full journey from user action to backend response without requiring a massive test matrix.

---

## Update template

Use the following format whenever updating this file:

### Date: YYYY-MM-DD

- Completed:
- In progress:
- Blockers:
- Next actions:
- Notes:

