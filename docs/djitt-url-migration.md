# DJITT URL Migration Plan

## Principle

Do not delete or rename existing live URLs without first mapping each old path to the most relevant replacement and preserving the correct redirect status.

## Core rules

- Prefer a direct 301 redirect to the most relevant equivalent page.
- Do not collapse old pages into the homepage unless the homepage is truly the appropriate replacement.
- Keep related paths grouped under the new site architecture.
- Preserve important search equity where possible.
- Maintain a stable public discovery model as pages are reorganized.

## Current public architecture

The current primary public structure is:

- / -> Home
- /front-door/ -> Front Door
- /systems/ -> Systems overview
- /websites/ -> Websites overview
- /insights/ -> Insights overview
- /resources/ -> Resources overview
- /about/ -> About
- /contact/ -> Contact

## Redirect mapping

### Legacy root-level pages
- Old page: /services.html -> New page: /front-door/
- Old page: /case-studies.html -> New page: /websites/examples.html
- Old page: /company-information.html -> New page: /about/
- Old page: /privacy-policy.html -> New page: /privacy-policy.html (keep if required)
- Old page: /terms-and-conditions.html -> New page: /terms-and-conditions.html (keep if required)
- Old page: /cookie-policy.html -> New page: /cookie-policy.html (keep if required)

### System routes
- /systems/ -> /systems/
- /systems/business-systems.html -> /systems/business-systems.html
- /systems/client-acquisition.html -> /systems/client-acquisition.html
- /systems/workflow-systems.html -> /systems/workflow-systems.html
- /systems/ai-systems.html -> /systems/ai-systems.html
- /systems/vertical-systems.html -> /systems/vertical-systems.html

### Website routes
- /websites/ -> /websites/
- /websites/business-websites.html -> /websites/business-websites.html
- /websites/financial-advisor-websites.html -> /websites/financial-advisor-websites.html
- /websites/service-business-websites.html -> /websites/service-business-websites.html
- /websites/website-factory.html -> /websites/website-factory.html
- /websites/examples.html -> /websites/examples.html

### Insight routes
- /insights/ -> /insights/
- /insights/ai.html -> /insights/ai.html
- /insights/business-systems.html -> /insights/business-systems.html
- /insights/client-acquisition.html -> /insights/client-acquisition.html
- /insights/financial-advisory.html -> /insights/financial-advisory.html
- /insights/digital-transformation.html -> /insights/digital-transformation.html
- /insights/djitt-frameworks.html -> /insights/djitt-frameworks.html

### Resource routes
- /resources/ -> /resources/
- /resources/assessments.html -> /resources/assessments.html
- /resources/checklists.html -> /resources/checklists.html
- /resources/guides.html -> /resources/guides.html
- /resources/templates.html -> /resources/templates.html
- /resources/tools.html -> /resources/tools.html

## Redirect implementation note

This migration should be implemented in Netlify redirects when a content renaming or relocation occurs. Since the current site is already using a structured path model, the best practice is to move old URLs to the closest new landing page and retain a 301 redirect for any old route that is intentionally retired.

The live site currently includes the following production redirects in Netlify:

- /front-door/ and /front-door -> /front-door.html
- /services and /services.html -> /front-door.html
- /case-studies.html -> /websites/examples.html

This preserves the new front-door entry path while keeping historical inbound links from older service and case-study URLs working.

## Future caution

Before any deletion or rename is executed, confirm:
1. The new URL is the best semantic replacement.
2. The redirect is permanent and not temporary.
3. The old page was not still relied upon for discovery or inbound link equity.
4. The destination page is not a vague replacement such as the homepage without a clear fit.
