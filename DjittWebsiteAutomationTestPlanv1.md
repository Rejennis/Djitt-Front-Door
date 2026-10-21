# DjittWebsiteAutomationTestPlanv1

## Purpose

This version keeps the original Djitt website automation plan intact and adds explicit Postman and JMeter test streams. The original Playwright and k6 test coverage remains in place and is not changed.

The aim is to provide a broader and more complete automated validation framework for djitt.co.uk covering:

- Playwright-based browser and flow validation
- k6-based performance and load validation
- Postman-based API automation
- JMeter-based load and stress testing
- Unit, smoke, regression, integration and release-gate coverage

---

## 1. Core test layers retained from the original plan

The original DjittWebsiteAutomationTestPlan remains the baseline. The following test layers continue to apply without changing the original Playwright and k6 sections:

- Unit tests
- Smoke tests
- Regression tests
- Integration tests
- API tests
- Accessibility checks
- Security checks
- Performance checks
- Production release gates

### Playwright tests

Playwright remains the main browser automation framework for:

- page navigation
- form validation
- mobile viewport coverage
- end-to-end customer journeys
- visual regression checkpoints
- accessibility smoke routes

### k6 tests

k6 remains a dedicated tool for:

- endpoint latency validation
- burst simulation
- traffic spike checks
- lightweight performance and resilience analysis

These are intentionally maintained as part of the original test design and not modified in this version.

---

## 2. Additional test streams: Postman and JMeter

The following sections add separate automation coverage for Postman and JMeter, even where the same functional areas are already covered by Playwright or k6.

---

## 3. Postman API automation tests

### Objective

Use Postman to validate API contracts, request payload handling, validation responses, and server-side form integration behavior in a repeatable, API-focused way.

### Scope

- Contact enquiry endpoint validation
- Missing-field rejection checks
- Invalid payload handling
- Success response schema validation
- Error response consistency
- Health checks and readiness checks
- Outbound integration endpoint validation where applicable

### Recommended collections

- Djitt Website API Suite
- Enquiry Submission Tests
- Health / Readiness Checks
- Error and Validation Responses

### Example Postman test scenarios

1. Submit valid enquiry payload
   - Expect HTTP 200 or 201
   - Assert required response fields exist
   - Verify success message content

2. Submit malformed enquiry payload
   - Expect HTTP 400 or 422
   - Assert response contains validation messages
   - Confirm no successful lead creation occurs

3. Missing required email field
   - Expect validation failure
   - Confirm API returns structured error payload

4. Health endpoint check
   - Expect HTTP 200
   - Confirm service is reachable and ready

5. Duplicate or repeated request handling
   - Verify expected server policy for duplicate submissions
   - Confirm consistent response status

### Postman validation checklist

- [ ] Request body schema matches expected contract
- [ ] Response status codes match documented expectations
- [ ] Validation failure messages are readable and actionable
- [ ] Success responses include required metadata
- [ ] Error responses are consistent across endpoints
- [ ] Sensitive data is never echoed in a response payload

### Execution trigger

- On every pull request affecting API or form logic
- As part of nightly regression verification
- Before production deployment

---

## 4. JMeter load and stress tests

### Objective

Use JMeter to verify website and API resilience under higher concurrency, traffic bursts and sustained usage conditions.

### Scope

- Homepage traffic under concurrent load
- Contact form endpoint under burst traffic
- Service page load under parallel requests
- Sustained concurrency checks for API endpoints
- Time-to-response benchmarking
- Failure handling under heavy demand

### Recommended JMeter test plans

- djitt-website-load-test.jmx
- djitt-website-stress-test.jmx
- djitt-enquiry-endpoint-burst-test.jmx

### Example JMeter scenarios

1. Homepage load test
   - 20 to 100 virtual users
   - Ramp-up over 1 to 5 minutes
   - Measure response time and throughput

2. Contact form submission stress test
   - Increase concurrency steadily
   - Validate request handling under burst conditions
   - Capture failure rate and response latency

3. Sustained API test
   - Run for a defined period at moderate concurrency
   - Monitor server stability and throughput
   - Check for memory or timeout issues

### JMeter validation checklist

- [ ] Baseline response time is under agreed threshold
- [ ] Peak concurrency does not produce excessive failures
- [ ] Contact form remains stable under burst load
- [ ] Errors are recoverable and do not cascade
- [ ] Throughput remains within acceptable range under expected peak traffic

### Execution trigger

- Nightly for performance trend tracking
- Before major campaign launches or release windows
- Before production deployment if web traffic is expected to spike

---

## 5. Combined automation coverage matrix

| Test category | Tool | Purpose | Trigger |
| --- | --- | --- | --- |
| Unit tests | Vitest | Validate logic and validation functions | Every PR |
| Smoke tests | Playwright | Confirm critical journeys work | Every deploy |
| Regression tests | Playwright | Catch repeated breakages | Every PR and nightly |
| Integration tests | Playwright + staging backend | Verify front-end and backend flows | Every PR and pre-release |
| API tests | Postman | Validate API contracts and responses | Every PR and nightly |
| Load tests | k6 | Measure traffic resilience | Nightly and pre-release |
| Stress tests | JMeter | Validate high-concurrency and burst performance | Nightly and pre-release |
| Security tests | ZAP and dependency scans | Identify vulnerable or unsafe patterns | Nightly and release gate |
| Accessibility tests | axe-core | Detect non-compliant UI patterns | Every PR |

---

## 6. Execution schedule

### Pull request gate

- Unit tests
- Smoke tests
- Integration validation
- Postman API checks
- Accessibility checks

### Nightly gate

- Full regression suite
- Postman API suite
- JMeter load and stress tests
- Dependency and security scans
- Performance comparison checks

### Pre-release gate

- Full browser regression suite
- Full Postman API suite
- JMeter stress validation
- k6 peak traffic verification
- Manual release sign-off for business-critical journeys

---

## 7. Release quality criteria

Release approval requires:

- All Playwright smoke and regression checks pass
- All Postman API checks pass
- JMeter load/stress thresholds remain within agreed limits
- k6 checks remain stable for critical traffic scenarios
- No critical accessibility or security findings remain unresolved
- No regression on the main conversion journeys

---

## 8. Final note

This version intentionally keeps the original Playwright and k6 test design unchanged while adding explicit Postman and JMeter tests as separate and complementary automation streams. This ensures the website has both functional automation and dedicated API and load validation without altering the original test plan structure.

The result is a more complete automation strategy for djitt.co.uk with clear separation between:

- browser automation (Playwright)
- API automation (Postman)
- load/stress validation (JMeter)
- lightweight performance simulation (k6)

This is a clean, scalable approach for a business-critical public-facing website.
