# DJITT technical SEO implementation

## Scope

This implementation adds the missing technical SEO foundation for the existing static DJITT website without redesigning the public experience or changing the current marketing structure.

## What was implemented

### 1. Canonical metadata

Each public HTML page now includes a canonical URL in the document head using the live domain pattern:

- https://djitt.co.uk/
- https://djitt.co.uk/front-door.html
- https://djitt.co.uk/services.html
- https://djitt.co.uk/case-studies.html
- https://djitt.co.uk/websites/
- https://djitt.co.uk/resources/
- https://djitt.co.uk/insights/
- https://djitt.co.uk/company-information.html
- https://djitt.co.uk/privacy-policy.html
- https://djitt.co.uk/terms-and-conditions.html
- https://djitt.co.uk/refund-cancellation.html
- https://djitt.co.uk/cookie-policy.html

This preserves the current production structure while preventing duplicate-content ambiguity between similar pages and marketing variants.

### 2. Metadata and social sharing tags

Every key page includes:

- unique title
- unique meta description
- language declaration
- robots metadata
- Open Graph title, description, URL, site name and image
- Twitter card metadata
- theme colour
- favicon link

This keeps the pages eligible for search summaries and improves social previews without altering the design system.

### 3. Favicon and branding assets

The site reuses the existing DJITT logo asset as the favicon and touch icon:

- assets/DjittLogoAug122026.png

No new artwork was generated; the existing branded asset was used to keep the website consistent and avoid a visual redesign.

### 4. Search engine guidance files

Created files:

- /website/robots.txt
- /website/sitemap.xml

These guide crawlers to the site index and ensure the XML sitemap includes active public pages and legal pages.

### 5. 404 and redirect handling

The site now includes:

- /website/404.html for a branded not-found experience
- Netlify redirect configuration to send unknown routes to the custom 404 page

This provides clean fallback handling and avoids generic placeholder errors.

## Files updated

### HTML pages

- website/index.html
- website/front-door.html
- website/services.html
- website/case-studies.html
- website/cancel.html
- website/success.html
- website/company-information.html
- website/privacy-policy.html
- website/terms-and-conditions.html
- website/refund-cancellation.html
- website/cookie-policy.html
- website/websites/index.html
- website/resources/index.html
- website/insights/index.html

### Support files

- website/netlify.toml
- website/robots.txt
- website/sitemap.xml
- website/404.html

## Important implementation note

The site is still a static HTML marketing and conversion website with Netlify function integrations. This work intentionally does not introduce a redesign, new production pages, or framework migration. It adds the missing technical foundation needed for trust, crawlability and consistent indexing.

## Recommended next step

After this SEO foundation is live, the next phase can be targeted content optimisation by page cluster, without changing the front-end design or conversion UX.
