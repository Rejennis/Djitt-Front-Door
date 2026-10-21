# DJITT Front Door

This repository contains the DJITT Front Door website and the initial smoke-test automation project for validating the live site experience.

## Project purpose
The goal of this repository is to keep the website source and its quality checks together in one place, so the project can evolve as a real product while also demonstrating QA automation maturity.

## Repository structure

- `website/` — static website source files
- `website/tests/smoke/` — Playwright smoke tests
- `website/playwright.config.ts` — Playwright configuration
- `README.md` — project overview and setup
- `.gitignore` — local git exclusions
- `repoStrategy.md` — local working strategy and project context (not pushed to remote)

## Local setup

1. Install dependencies in the website project:
   ```powershell
   cd "c:\dev\DJITT Front Door\website"
   npm install
   ```

2. Run the smoke suite:
   ```powershell
   cd "c:\dev\DJITT Front Door\website"
   npx playwright test tests/smoke/homepage.spec.ts --reporter=line
   ```

## Current QA coverage
The initial smoke suite validates:
- homepage loads successfully
- core hero content is present
- problem and contact sections are visible
- main Start Here CTA works
- problem anchor navigation works
- key CTA links are present and correctly routed

## Notes
- The site contains a third-party tracking script that triggers a CSP violation in the browser. This is treated as a known external-system condition rather than a functional regression in the live site.
- The smoke suite is intentionally focused on the critical path first and can be expanded with additional service and flow checks over time.

## Future direction
The project is set up to expand from:
- homepage smoke checks
- CTA and nav validation
- and eventually broader QA automation coverage for services pages, contact flow, accessibility, and performance checks
