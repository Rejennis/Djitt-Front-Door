# DJITT current site audit

## 1. Executive summary

The live site in this repository is a static HTML/CSS/JavaScript brochure website deployed to Netlify, not a framework-based app. It has a custom design system, direct static page routing, and Netlify serverless functions for form forwarding and Stripe checkout.

The website is positioned as a DJITT acquisition / operations / advisory platform and currently mixes:

- a financial-adviser acquisition funnel
- a front-door lead qualification flow
- website sales for service businesses
- legal and informational pages
- external appointment booking links
- third-party tracking / external form embed scripts

The production site is not yet a modern multi-page content architecture. It is mainly a static marketing site with several conversion flows bolted on.

## 2. Framework and stack

### Observed stack

- Framework: plain static HTML, CSS, JavaScript
- No React / Next / Vue / Astro / PHP / Node app framework
- No build pipeline beyond Netlify static hosting
- JavaScript dependency: Stripe package only (`website/package.json`)
- Netlify Functions runtime used for server-side logic

### Evidence

- `website/package.json` contains only a Stripe dependency
- `website/index.html`, `website/front-door.html`, `website/services.html` and related pages are standalone HTML files
- `website/styles.css` provides the site-wide stylesheet
- `website/script.js` handles interactivity and form submission logic

## 3. Routing and page structure

### Static routing model

This repo uses file-based routing rather than framework routing.

Primary public site pages:

- `/` → `website/index.html`
- `/front-door.html` → `website/front-door.html`
- `/services.html` → `website/services.html`
- `/case-studies.html` → `website/case-studies.html`
- `/company-information.html` → `website/company-information.html`
- `/privacy-policy.html` → `website/privacy-policy.html`
- `/terms-and-conditions.html` → `website/terms-and-conditions.html`
- `/refund-cancellation.html` → `website/refund-cancellation.html`
- `/cancel.html` → `website/cancel.html`
- `/success.html` → `website/success.html`
- `/websites/` → `website/websites/index.html`
- `/resources/` → `website/resources/index.html`
- `/insights/` → `website/insights/index.html`

### Netlify-style path behavior

Because Netlify serves folders with `index.html`, the following are effectively routed as directory pages:

- `/websites/`
- `/resources/`
- `/insights/`

### Important note

The site does not appear to have a canonical route manifest, route config, or custom server router. URL routing is determined by the static file layout and Netlify hosting behavior.

## 4. Components and layouts

### Reusable patterns

The site uses a highly repeated static-layout pattern:

- top navigation bar
- hero section
- CTA buttons
- content cards / feature grids
- testimonial blocks
- sectioned landing page layouts
- footer with legal links

### Shared layout behavior

- `website/styles.css` defines the main design system and layout primitives
- Many pages duplicate their own local CSS blocks with inline `<style>` for page-specific sections
- Page navigation is repeated manually per HTML file rather than generated from a shared component system

### Examples of repeated patterns

- nav bar on almost every page
- hero/CTA structures across homepage and front-door
- feature-card grids and two-column layouts
- footer legal block repeated in each page

## 5. Styling and design system

### CSS architecture

- Main stylesheet: `website/styles.css`
- CSS variables define brand colors and spacing tokens
- CSS contains section classes for navigation, buttons, hero blocks, cards, forms, and layout patterns
- Styling is custom, not framework-driven

### Brand style notes

Observed brand palette:

- gold / warm accent color: `#C4923A`
- dark charcoal background: `#1C1F2B`
- warm off-white backgrounds: `#F5F3EE`
- steel blue accents: `#4A7A9B`

Design language is premium, dark, warm, and conversion-focused.

### Additional page-local styles

- `website/websites/index.html` includes inline styles for its dedicated website sales page
- `website/resources/index.html` and `website/insights/index.html` each include page-specific CSS blocks

This indicates a custom static site with modular but not standardised component architecture.

## 6. Assets and media

### Core asset

- `website/assets/DjittLogoAug122026.png`

This appears to be the main brand logo used throughout the site.

### Observed asset pattern

- most pages rely on text-only sections and CSS-driven designs
- the site does not appear to have a large image wardrobe or media library
- no obvious social share images, banners, or structured asset manifest were found

### Notable issue

`website/README.md` still contains template content for “Operant AI,” which strongly suggests legacy template copy was not fully cleaned up after rebranding.

## 7. Forms and conversion flows

### Form 1: Front door qualification form

File: `website/front-door.html`

- form id: `front-door-form`
- step-based multi-question flow in `website/script.js`
- fields: challenge, firm type, priority, name, email, firm
- submission target: `/.netlify/functions/front-door-submit`

Behavior:

- progressive questionnaire
- recommendation logic displayed in-browser
- submission forwarded to GHL via Netlify Function

### Form 2: Website lead form

File: `website/websites/index.html`

- form id: `website-lead-form`
- fields: name, businessName, phone, email, businessType, hasWebsite, brief
- submission target: `/.netlify/functions/website-leads-submit`

Behavior:

- validates required fields in-browser
- sends payload to Netlify Function
- displays success message after response

### Payment flow

- `website/script.js` includes Stripe checkout logic via `/.netlify/functions/create-checkout-session`
- `website/netlify/functions/create-checkout-session.js` creates a Stripe Checkout session using environment variables
- success and cancel pages are `success.html` and `cancel.html`

### Important preservation requirements

The following must remain working when changes are made later:

- front-door form logic
- front-door recommendation rules
- website lead form submission
- Stripe checkout flow
- success/cancel page flow
- all CTA booking links to external booking widgets

## 8. GHL integrations and external CRM logic

### GHL / LeadConnector integrations

This site clearly integrates with GoHighLevel / LeadConnector.

Observed contact endpoints:

- `https://services.leadconnectorhq.com`
- `https://services.leadconnectorhq.com/v1/contacts`
- `https://api.leadconnectorhq.com/widget/booking/...`

### Netlify Function integrations

Files:

- `website/netlify/functions/front-door-submit.js`
- `website/netlify/functions/website-leads-submit.js`

These functions:

- parse JSON request bodies
- validate required user fields
- build contact payloads
- add custom fields
- call GHL API with `Authorization: Bearer` or `X-API-Key` pattern
- support environment variables such as:
  - `GHL_API_KEY`
  - `GHL_TOKEN`
  - `GHL_AUTH_TYPE`
  - `GHL_API_BASE_URL`
  - `GHL_CONTACTS_ENDPOINT`
  - `GHL_LOCATION_ID`
  - `GHL_PIPELINE_ID`
  - `GHL_PIPELINE_NAME`

### Booking widget references

External booking links are embedded directly in HTML pages, e.g.:

- `https://api.leadconnectorhq.com/widget/booking/EFhvKx0VSTUEl7XP0oC1`
- `https://api.leadconnectorhq.com/widget/booking/IAPJHoFBTiUuAjXEmIhn`
- `https://api.leadconnectorhq.com/widget/booking/it5ll12Rwl5BCsdYC5SL`

### app.djitt.co.uk references

The repository contains documentation references to `app.djitt.co.uk` in:

- `FrontDoor.md`
- `ImplementationPlan.md`
- other project planning docs

There is no production site code in `website/` that directly references `app.djitt.co.uk` in live HTML/JS. The live site references external GHL booking URLs and `links.djitt.co.uk` tracking scripts instead.

### links.djitt.co.uk references

The live site embeds third-party scripts from `links.djitt.co.uk`, including:

- `https://links.djitt.co.uk/js/external-tracking.js`
- `https://links.djitt.co.uk/js/form_embed.js`
- `https://links.djitt.co.uk/widget/survey/xlKrrq8w7qFKj60dGhj1`

These appear to be external tracking / form embed technologies used by the current acquisition stack.

## 9. Netlify configuration

### Netlify config file

- `website/netlify.toml`

Observed configuration:

- `publish = "."`
- `functions.directory = "netlify/functions"`
- `NODE_VERSION = "20"`
- custom headers:
  - `X-Frame-Options = SAMEORIGIN`
  - `X-Content-Type-Options = nosniff`
  - `Referrer-Policy = strict-origin-when-cross-origin`

### Netlify function deployment model

Functions are located in:

- `website/netlify/functions/`

### Important absence

There is no visible `redirects` config in `netlify.toml`, no `headers` rules beyond basic security headers, and no `robots.txt` or `sitemap.xml` file present in the site root.

## 10. Netlify Functions and API routes

### Functions identified

1. `create-checkout-session.js`
   - route: `/.netlify/functions/create-checkout-session`
   - purpose: creates Stripe Checkout session
   - env required: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_*`, `SITE_URL`

2. `front-door-submit.js`
   - route: `/.netlify/functions/front-door-submit`
   - purpose: submits front-door questionnaire results to GHL
   - env expected: GHL credentials and endpoints

3. `website-leads-submit.js`
   - route: `/.netlify/functions/website-leads-submit`
   - purpose: submits website enquiry form to GHL
   - env expected: GHL credentials and endpoints

4. `stripe-webhook.js`
   - route: `/.netlify/functions/stripe-webhook`
   - purpose: webhook listener for completed Stripe payments
   - env required: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### API behavior notes

- All function endpoints are simple JSON APIs using `event.httpMethod` and `fetch`
- No framework API layer exists; these are standalone serverless handlers
- The functions are designed to fail gracefully when credentials are missing but still acknowledge the queued/accepted submission locally

## 11. SEO, metadata, canonical URLs, Open Graph, sitemap, and robots

### SEO status

Current status: incomplete / inconsistent.

### What exists

- page `<meta name="description">` tags present on many pages
- page `<title>` tags present
- HTML headings exist in most pages
- some pages have a clear semantic structure

### What does not exist

At the time of audit, the repo does not show:

- `robots.txt`
- `sitemap.xml`
- canonical link tags
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`)
- Twitter/X meta tags
- `alt` text quality verification across all meaningful images
- structured JSON-LD schema blocks

### Conclusion

The current site has basic HTML metadata but not a complete technical SEO foundation or structured entity metadata layer.

## 12. Schema, structured data, and semantic markup

### Current schema status

No JSON-LD structured data was found in the production site.

There is no evidence of:

- `Organization`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `Article`
- `Service`
- `Person`

### Semantic HTML

Most pages use valid HTML structure, but the content is largely static marketing markup rather than an entity-driven schema model.

## 13. Analytics and tracking

### Observed analytics status

- no visible Google Analytics script in the pages reviewed
- no GA4 configuration found
- no production analytics abstraction file is present
- `website/script.js` includes placeholder comments about analytics integration but no active analytics implementation

### Tracking observed

- external `links.djitt.co.uk` scripts appear to provide form / tracking integration
- CTA click logging is only `console.log` in JavaScript; it is not a real analytics system

## 14. Redirects, canonical URLs, and canonical domain strategy

### Redirects

- no `redirects` rules were found in `website/netlify.toml`
- no explicit 301 strategy file exists in the repo

### Canonical strategy

- no `rel="canonical"` tags found in the production pages reviewed
- no consistent canonical domain pattern was implemented

### Domain assumptions

The live site appears to be intended for `djitt.co.uk`, but the code does not enforce canonical domain or redirect strategy.

## 15. Existing pages and URLs

### Homepage and main landing pages

- `website/index.html`
- `website/front-door.html`
- `website/services.html`
- `website/case-studies.html`

### Website-themed landing pages

- `website/websites/index.html`

### Resource / knowledge pages

- `website/resources/index.html`
- `website/insights/index.html`

### Legal / policy pages

- `website/company-information.html`
- `website/privacy-policy.html`
- `website/terms-and-conditions.html`
- `website/refund-cancellation.html`
- `website/cancel.html`
- `website/success.html`
- `website/cookie-policy.html`

### Additional files already present

- `website/DEPLOY.md`
- `website/STRIPE_SETUP.md`
- `website/README.md`
- `websiteBackup14092026/` (legacy copy / backup snapshot)

## 16. External links and third-party integrations

### Booking and scheduling links

- LeadConnector / GHL booking widgets
- direct `mailto:hello@djitt.com` contact links

### Third-party embeds

- `links.djitt.co.uk` tracking and survey embed
- external LeadConnector widget URLs
- Stripe payment checkout flow

### External communication model

The site uses a mix of:

- direct email business contact
- external booking links
- external CRM integration
- external tracking / lead embed scripts

This means the public site is “presentation + discovery + routing” while GHL / booking / CRM logic sits outside the page itself.

## 17. Repository-level findings and content drift

Important repository issues observed:

- `website/README.md` still refers to an Operant AI template and not the DJITT business branding
- content appears partially migrated from a previous template or agency website
- some business-facing text and naming still reflects older positioning
- not all site pages are aligned to the current DJITT acquisition architecture described in project planning documents

This audit is not a redesign recommendation; it is simply a record of the current state and preservation scope.

## 18. Existing functionality that must be preserved

The following functionality is currently part of the operational website and should be treated as protected, working functionality that must not be removed or redesigned without explicit planning:

### Core site functionality

- all static landing pages and navigational links
- homepage and front-door user journeys
- website / resources / insights section entry pages
- legal pages and footer navigation
- all CTA buttons and direct contact links

### Conversion and lead capture

- front-door multi-step questionnaire flow
- front-door recommendation logic
- website lead enquiry form
- payment / Stripe checkout flow
- success / cancel flows after checkout
- external booking links to GHL widgets

### CRM / back-end integration

- `/.netlify/functions/front-door-submit`
- `/.netlify/functions/website-leads-submit`
- `/.netlify/functions/create-checkout-session`
- `/.netlify/functions/stripe-webhook`
- configured environment variable logic for GHL and Stripe

### Business-facing behaviour

- use of `mailto:hello@djitt.com`
- all customer-facing CTAs that route to GHL or external booking flows
- third-party embeds used by marketing / tracking / forms
- Netlify security headers already in place

### Legacy / reference pages

- `websiteBackup14092026/` appears to be a preserved backup and should not be modified or repurposed unless explicitly required later

## 19. Preservation risks and gaps

The items below are important to preserve or later address carefully, because they are active current site behaviors:

- direct `links.djitt.co.uk` embed behavior
- GHL contact sync behavior
- Stripe payment flow
- Netlify function contract names and response patterns
- existing URL structure
- success and cancel page handling
- all current CTA and booking links
- legal page content and contact references

## 20. Final audit conclusion

This repository currently contains a static Netlify marketing site with custom HTML, CSS, and JS; no production app framework; direct file-based routing; GHL-based conversion flows; Stripe Checkout; and several legacy/partial marketing patterns. The biggest current gaps are around technical SEO foundation, canonicalisation, Open Graph, schema, robots/sitemap, and a fully consistent content architecture.

The current implementation is a working brochure + conversion + CRM bridge site, not yet a full structured DJITT content or front-door architecture. It should be preserved as-is until the planned rebuild work begins.
