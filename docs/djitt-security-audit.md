# DJITT security audit

## Scope

This audit reviews the public DJITT front door, the static website assets, the Netlify Functions used for payment processing, and the risk of exposing credentials or operational data in browser-visible code.

## Executive summary

The current site architecture is low risk from a secret-exposure perspective because the sensitive configuration is kept server-side in Netlify Function environment variables rather than embedded in public HTML or JavaScript.

The main remaining risk is not leaking credentials in-browser; it is operational discipline: keeping secrets out of repo files, Git history, and third-party scripts while maintaining a clean separation between public presentation and private CRM / payment layers.

## Findings

### 1. Browser code does not contain GHL credentials

Reviewed public pages and scripts in the static site:

- `website/index.html`
- `website/script.js`
- `website/services.html`
- `website/case-studies.html`
- `website/**/*.html`
- `website/**/*.js`

Result:

- No secret API keys, tokens, client secrets, or GHL bearer credentials are embedded in browser-visible code.
- The public site includes booking URLs, tracking IDs and external script references, but these are not private credentials.
- The actual sensitive operational configuration remains in server-side Netlify Function environment variables.

### 2. Payment secrets are correctly server-side only

Relevant implementation:

- `website/netlify/functions/create-checkout-session.js`
- `website/netlify/functions/stripe-webhook.js`

These files use:

- `process.env.STRIPE_SECRET_KEY`
- `process.env.STRIPE_WEBHOOK_SECRET`

This is the correct pattern for Stripe and aligns with the requirement to keep secrets off the client.

### 3. Webhook verification is handled correctly

The Stripe webhook function validates the incoming webhook request using the Stripe signature and the configured webhook secret.

This protects the application from accepting untrusted or forged events.

### 4. No direct GHL internal credentials are exposed in the repo

The public site is intentionally designed to present front-door routing and business positioning without exposing internal GHL implementation details.

The site does not store API keys, GHL IDs, or pipeline secrets in browser code. This matches the project requirement to keep the public website and the operational CRM layer separate.

### 5. Third-party script risk is limited but still needs review

The site loads remote scripts from `links.djitt.co.uk` and other booking endpoints.

These scripts should be reviewed for:

- data collection practices
- consent compliance
- cookie usage
- future changes in external tracking behavior

This is a governance issue rather than a direct secret leak.

## Risk assessment

### Low risk areas

- Browser-visible HTML/JS contains no GHL secret values.
- Stripe payment secrets are stored in Netlify environment variables, not in front-end code.
- The public website remains a presentation and routing layer rather than a privileged operational layer.

### Medium risk areas

- External script dependencies may evolve and collect data outside the project’s control.
- Future changes could accidentally copy environment variables into repo files or deployment configuration.
- Forms and webhooks must continue to validate input and avoid open redirect or injection patterns.

## Required controls

1. Keep all private values in Netlify environment variables only.
2. Do not add credentials to HTML, JavaScript, Markdown docs, or sample config files.
3. Add environment variable names to deployment documentation only, never values.
4. Keep webhook validation enabled and reject unsigned or malformed payloads.
5. Restrict CORS and ensure Netlify Functions accept only expected origins.
6. Review all inbound form and booking endpoints before enabling new outbound integrations.
7. Ensure no open redirects are added to public pages.
8. Rotate Stripe secrets and webhook secrets periodically and after any accidental exposure.
9. Validate user-submitted content before it is saved or forwarded to downstream systems.

## Status

Current status: acceptable for the current public front-door architecture, with operational safeguards in place and no credential leakage detected in browser-side code.

## Recommended next actions

- Document a minimal environment-variable checklist for Netlify.
- Confirm that all deployment secrets are stored only in Netlify settings, not in repo or local config files.
- Add a quick CI or repository guard that scans for common secret patterns before deployment.
- Review the external tracking script and booking endpoints as part of the ongoing operational compliance review.
