# DJITT entity model and structured data architecture

## 1. Core principles

This entity model defines the canonical representation for the public DJITT site and keeps the structured data aligned with the approved positioning of the brand.

- Entity name: DJITT LTD
- Brand positioning: "Building Intelligent Systems That Scale Trust"
- Business description: DJITT builds intelligent business systems, websites, acquisition systems, workflow systems and AI systems.
- Scope: public website and marketing content only
- Guardrail: DJITT does not claim to provide financial advice
- Guardrail: no invented clients, awards, certifications, statistics, revenue, testimonials, or performance claims

## 2. Canonical entity identities

The site should use consistent @id relationships across all JSON-LD blocks.

- Organization: https://djitt.co.uk/#organization
- Website: https://djitt.co.uk/#website
- Home page: https://djitt.co.uk/#webpage-home
- Current page: https://djitt.co.uk/#webpage-[slug]
- Breadcrumb: https://djitt.co.uk/#breadcrumb-[slug]
- Service: https://djitt.co.uk/#service-[slug]
- Article: https://djitt.co.uk/#article-[slug]

## 3. Entity definitions

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://djitt.co.uk/#organization",
  "name": "DJITT LTD",
  "url": "https://djitt.co.uk/",
  "logo": "https://djitt.co.uk/assets/DjittLogoAug122026.png",
  "description": "DJITT builds intelligent business systems, websites, acquisition systems, workflow systems and AI systems.",
  "sameAs": ["https://djitt.co.uk/"],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB"
  }
}
```

### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://djitt.co.uk/#website",
  "url": "https://djitt.co.uk/",
  "name": "DJITT",
  "description": "Building Intelligent Systems That Scale Trust",
  "publisher": { "@id": "https://djitt.co.uk/#organization" },
  "inLanguage": "en-GB"
}
```

### WebPage

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://djitt.co.uk/#webpage-home",
  "url": "https://djitt.co.uk/",
  "name": "DJITT - Building Intelligent Systems That Scale Trust",
  "description": "DJITT helps organisations build intelligent business systems, websites, acquisition systems, workflow systems and AI systems.",
  "isPartOf": { "@id": "https://djitt.co.uk/#website" },
  "about": { "@id": "https://djitt.co.uk/#organization" },
  "publisher": { "@id": "https://djitt.co.uk/#organization" }
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://djitt.co.uk/#breadcrumb-home",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://djitt.co.uk/"
    }
  ]
}
```

### Service

Use Service schema on pages that describe business systems, inbound acquisition flows, website services, or other publicly offered DJITT service categories.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://djitt.co.uk/#service-front-door",
  "name": "DJITT Front Door",
  "provider": { "@id": "https://djitt.co.uk/#organization" },
  "areaServed": "United Kingdom",
  "serviceType": "Business systems, websites, client acquisition systems, workflow automation, and AI systems.",
  "description": "DJITT routes prospects into the relevant category of business system or acquisition strategy based on their business problem."
}
```

### Article

Use Article schema for content-led pages such as case studies, insights and resources when the page is a meaningful article or editorial piece.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://djitt.co.uk/#article-case-study",
  "headline": "Case Study",
  "description": "An insight or case study published by DJITT.",
  "author": {
    "@type": "Organization",
    "name": "DJITT LTD",
    "@id": "https://djitt.co.uk/#organization"
  },
  "publisher": {
    "@id": "https://djitt.co.uk/#organization"
  },
  "mainEntityOfPage": "https://djitt.co.uk/case-studies.html",
  "inLanguage": "en-GB"
}
```

## 4. Person usage rules

Person schema should only be used when an actual, identifiable individual is both public and verifiable.

At present, the public DJITT site does not publish a verified personal author or spokesperson profile. Therefore, Person schema is intentionally not used as a default for the site.

## 5. Content guardrails

The structured-data layer must not introduce claims that are not already supported by the site content or the approved positioning.

Do not add:

- clients
- awards
- certifications
- statistics
- revenue
- testimonials
- performance claims
- financial-advice claims

## 6. Implementation pattern

The site should generate JSON-LD in a reusable way from a shared script instead of hand-authoring drifting JSON blocks on individual pages.

Each page should use a consistent pattern:

1. Organization
2. WebSite
3. WebPage
4. BreadcrumbList
5. Service or Article only where appropriate

This keeps the data model consistent and avoids unrelated schema being mixed into unrelated pages.

## 7. Example page mapping

- Home: Organization + WebSite + WebPage + BreadcrumbList
- Front Door: Organization + WebSite + WebPage + BreadcrumbList + Service
- Services: Organization + WebSite + WebPage + BreadcrumbList + Service
- Websites: Organization + WebSite + WebPage + BreadcrumbList + Service
- Insights / Resources / Case Studies: Organization + WebSite + WebPage + BreadcrumbList + Article
- Legal pages: Organization + WebSite + WebPage + BreadcrumbList

## 8. Summary

This entity model preserves the current DJITT website architecture while giving search engines and answer engines a clean, consistent understanding of the business, the public website, and the services it communicates.
