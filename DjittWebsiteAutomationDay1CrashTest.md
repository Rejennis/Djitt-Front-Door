# Djitt Website Automation Day 1 Crash Test

## Pre-flight: tool stack and environment validation

Before any automated browser or API checks are written, the team should complete a short manual and tooling sanity check.

### Purpose

Confirm the test stack is available, suitable and executable for the current site and environment before the crash-test begins.

### Checklist

- Confirm the live target URL or approved test environment: https://djitt.co.uk or a staging/preview environment
- Confirm the browser tooling is available: Playwright, Node, and package manager
- Confirm API tooling is available: Postman, curl, or a lightweight API client
- Confirm performance tooling is available: Lighthouse, k6, and/or JMeter
- Confirm site accessibility and page structure are manually reviewable before automation
- Confirm whether the team is validating production, staging, or local preview
- Make sure the selected environment is stable and not under active content churn

### Tool-stack decision gate

Only proceed to automated checks once the following are true:

- The URL is reachable from the test environment
- The app loads without a blocker in the browser
- The team agrees which browser(s) are in scope for the day
- The selected tools are installed and can run successfully
- The first smoke test target is clear and stable

## Tool stack setup and installation steps

This section is meant to be followed by the junior test engineer before the first automated run. It starts with a tool check and then installs anything missing.

### 1. Check the installed tools

Run these commands in PowerShell from the project folder:

```powershell
node -v
npm -v
npx playwright --version
npx lighthouse --version
k6 version
jmeter --version
```

If Node or npm are missing, install them first.

### 2. Install Node.js and npm (if missing)

For Windows, use one of the following options:

#### Option A: winget

```powershell
winget install OpenJS.NodeJS.LTS
```

Then restart PowerShell and confirm:

```powershell
node -v
npm -v
```

#### Option B: official installer

Download the LTS version from: https://nodejs.org/

### 3. Install Playwright and browser binaries

If Playwright is not present:

```powershell
npm init -y
npm install -D @playwright/test
npx playwright install --with-deps
```

Verify installation:

```powershell
npx playwright --version
npx playwright test --help
```

### 4. Install Lighthouse (if missing)

```powershell
npm install -D lighthouse
npx lighthouse --version
```

### 5. Install k6 (if missing)

#### Option A: winget

```powershell
winget install k6.k6
```

#### Option B: if the package manager is unavailable

Download the latest Windows binary from the official k6 website and add it to PATH.

Then verify:

```powershell
k6 version
```

### 6. Install JMeter (if missing)

#### Option A: winget

```powershell
winget install Apache.JMeter
```

#### Option B: manual

Download the ZIP distribution from the Apache JMeter website and extract it to a folder such as:

```text
C:\Tools\apache-jmeter
```

Then verify:

```powershell
& "C:\Tools\apache-jmeter\bin\jmeter.bat" -v
```

### 7. Confirm project setup and create the automation folder structure

Create the project folders before writing tests:

```powershell
mkdir .\tests\smoke
mkdir .\tests\regression
mkdir .\tests\integration
mkdir .\tests\api
mkdir .\tests\performance
mkdir .\reports
mkdir .\scripts
```

### 8. Initialise the Playwright project

```powershell
npx playwright test --help
```

If the project is not initialised yet, run:

```powershell
npx playwright init
```

Then confirm the generated files include:

- playwright.config.ts
- tests/example.spec.ts
- package.json updates

### 9. Pre-flight validation gate before running tests

The junior engineer should not start the actual smoke suite until all of the following are true:

- Node and npm are confirmed working
- Playwright is installed and browsers are downloaded
- Lighthouse is installed and runs
- k6 is installed and responds to `k6 version`
- JMeter is available if the team needs performance scripting
- The application URL is confirmed and reachable
- A single test target is chosen for the day

### 10. Suggested first command to run after setup

```powershell
npx playwright test --reporter=line
```

If the project has no tests yet, start with a single homepage smoke check before adding the rest of the suite.

---

## Scope

This is the first-day automation sprint for djitt.co.uk. The site currently appears to be a marketing-style landing page with section-based content rather than a multi-page application. Because of that, the initial automation should focus on:

- homepage load
- primary section visibility
- navigation/scroll behaviour
- CTA and enquiry flow
- accessibility smoke checks
- Lighthouse baseline
- one simple API or form verification if a lead endpoint exists

---

## Objective

Deliver a usable, stable foundation within a single day that proves the site is reachable, navigable and conversion-friendly, without overbuilding the first suite.

---

## Test objective for day 1

The goal is not to test every section exhaustively. The goal is to prove the key site journey works and that the automation framework can run reliably.

### Critical end-to-end flow

1. Open homepage
2. Confirm main content renders
3. Confirm page navigation and section anchors work
4. Validate the key “Next step” or conversion CTA is present and usable
5. Check the page for console errors
6. Run a basic accessibility smoke test
7. Run a Lighthouse baseline
8. Execute one smoke API or form validation if the lead capture endpoint is available

---

## Recommended first-day test cases

### 1. Homepage renders successfully - Smoke

**Test name:** homepage loads and core content is visible

**Steps:**
- Open https://djitt.co.uk
- Wait for the page to load completely
- Confirm the page title is present
- Confirm the main sections are visible:
  - Business problem
  - Insight
  - Framework
  - Resource
  - System
  - Front Door
  - Next step
- Confirm the page body is visible

**Assertions:**
- Page loads without a 404 or fatal error
- Primary headings are visible
- No blocking browser error is thrown
- Main marketing sections are rendered

---

### 2. Navigation and anchor behaviour - Smoke

**Test name:** core section navigation works

**Steps:**
- Open homepage
- Inspect the main menu or top navigation links if present
- Click the primary navigation items or section anchors
- Confirm the browser scrolls to the correct content area
- Confirm the selected section heading is visible

**Assertions:**
- Anchor navigation lands correctly
- User can move between sections without broken links or blank screen
- No page shifts or lost focus

---

### 3. CTA validation - Integration / End-to-End

**Test name:** primary call to action is visible and actionable

**Steps:**
- Identify the main CTA from the homepage such as “Next step” or a lead-generation action
- Confirm it is visible in the viewport
- Click the CTA
- Confirm the expected destination is reached or modal/form appears

**Assertions:**
- CTA is visible and clickable
- Click leads to a valid next step
- No dead end or broken route

---

### 4. Broken content check - Regression

**Test name:** key landing-page content is not missing or broken

**Steps:**
- Open homepage
- Assert text sections appear for all primary steps
- Verify no major image or asset is missing
- Check that there are no obvious empty placeholders

**Assertions:**
- No empty blocks
- No broken images/assets
- All main content blocks render

---

### 5. Form/lead flow validation if a form exists - Integration / End-to-End

**Test name:** enquiry flow validation runs correctly

**Steps:**
- Locate any enquiry or contact form triggered by the homepage
- Click the form entry point
- Submit with empty values
- Confirm validation errors appear
- Re-enter valid details
- Submit again
- Confirm success state or redirect

**Assertions:**
- Empty submission is rejected
- Invalid email is rejected
- Valid submission succeeds
- Success confirmation is visible

If no form exists on the current homepage, treat this as a follow-up automation task rather than a blocker for the crash-test setup.

---

### 6. Console and page health check - Smoke / Regression

**Test name:** homepage runs without major runtime errors

**Steps:**
- Open homepage
- Capture browser console logs using a listener for console errors
- Capture failed network requests using request and response listeners
- Check for 4xx/5xx responses or failed resource loads
- Confirm no critical 500 errors or silent application failure
- Save screenshots and logs if errors appear

**How to capture browser console logs in Playwright:**

```ts
const consoleErrors: string[] = [];

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push(msg.text());
  }
});

await page.goto('https://djitt.co.uk');

expect(consoleErrors).toEqual([]);
```

**How to capture failed network requests in Playwright:**

```ts
const failedRequests: string[] = [];

page.on('requestfailed', (request) => {
  failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`);
});

page.on('response', async (response) => {
  if (response.status() >= 400) {
    failedRequests.push(`${response.url()} :: ${response.status()}`);
  }
});

await page.goto('https://djitt.co.uk');

expect(failedRequests).toEqual([]);
```

**Assertions:**
- No unexpected JavaScript errors
- No failed critical asset loads
- No red console errors across the primary flow
- No 4xx/5xx resource failures for the main journey

---

### 7. Accessibility smoke check - Accessibility / Smoke

**Test name:** key homepage elements are accessible

**Steps:**
- Open homepage
- Run an axe accessibility smoke check on the page
- Inspect headings, buttons, labels and focus visibility

**Assertions:**
- No critical or major a11y violations on the main page
- CTA buttons have accessible names
- Main content is structurally readable

---

### 8. Lighthouse baseline - Performance / Regression

**Test name:** homepage meets the agreed basic baseline

**Steps:**
- Run Lighthouse against the homepage
- Record performance, accessibility and best-practices score
- Compare against the agreed threshold

**Assertions:**
- Page remains within the basic performance threshold
- Accessibility score is not critically low
- No major layout instability or performance red flags

---

### 9. Basic load check - Load / Stress / Performance

**Test name:** homepage survives a light load spike

**Steps:**
- Run a short k6 or JMeter smoke test against the homepage
- Use a limited VU count for a short duration
- Monitor response time and failure count

**Assertions:**
- Response time remains acceptable for a small test burst
- No critical failure in the test window
- Site remains stable during light traffic stress

---

## Recommended execution order for day 1

1. Create the Playwright project foundation
2. Write homepage smoke test
3. Write CTA and section navigation checks
4. Add validation and form checks if a form exists
5. Run browser console and asset checks
6. Run axe accessibility check
7. Run Lighthouse baseline
8. Run k6/JMeter smoke test
9. Fix flaky selectors and unstable assertions
10. Review results and publish the report

---

## What to teach the junior engineer

### Training objective

A junior engineer should understand the difference between:

- checking that a page loads
- checking that the layout is correct
- checking that the user journey works
- checking that the form/API is valid
- checking that the site is accessible and resilient

### Detailed e2e walkthrough

#### Step 1: Homepage smoke

- Open https://djitt.co.uk
- Assert the main visible content loads
- Assert key headings are visible
- Assert the page is not blank or failing to render

#### Step 2: Navigation sanity check

- Click a top-level link or anchor
- Ensure the browser scrolls or changes focus to that section
- Confirm content is not hidden behind a broken or empty block

#### Step 3: CTA verification

- Find the main CTA or lead capture target
- Click it
- Confirm the page or form behaves as expected

#### Step 4: Validation check

- If a form is present, submit empty values
- Confirm validation appears
- Submit invalid data
- Confirm invalid states are handled gracefully

#### Step 5: Success validation

- Submit valid form data
- Confirm success state or redirect
- Confirm the user sees a clear next action

#### Step 6: Failure reporting

- Capture screenshot
- Capture browser console logs
- Save details of failed assertion
- Categorize as P0/P1/P2

---

## Day 1 exit criteria

The crash test is considered successful when:

- homepage loads reliably
- core sections render correctly
- CTA path is functional
- accessibility smoke check passes or identifies only minor issues
- Lighthouse baseline is captured
- one load test confirms the site is stable under light demand
- the automation framework is running in CI or locally with repeatable results

---

## Suggested reporting template

### Summary

- Homepage status:
- CTA status:
- Form flow status:
- Accessibility status:
- Performance status:
- Load status:
- Blockers:
- Next actions:

This gives the team a clear and repeatable report for the first-day automation pass.
