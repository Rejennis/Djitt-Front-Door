# DJITT site architecture

## 1. Strategic direction

This is the second-generation DJITT information architecture.

It repositions the public website from a platform-first brochure to a Front Door architecture whose purpose is discovery, education, qualification and routing.

Core positioning:

> Building Intelligent Systems That Scale Trust

DJITT helps organisations build intelligent systems that improve how they operate, engage customers and grow.

Primary current ICP:

- financial advisors
- financial planners
- wealth managers
- related advisory firms

The architecture must remain extensible for future verticals beyond financial services.

## 2. Architectural principles

1. Lead with business problems, not software.
2. Position tools such as LinkedIn, Apollo, Instantly, Ulinc and GHL as components inside the acquisition system, not as DJITT's product.
3. Make the website the public discovery and routing layer.
4. Keep the Front Door at the center of the architecture.
5. Route high-intent visitors toward GHL for qualification and appointment booking.
6. Use content clusters to support SEO, AEO and GEO without keyword stuffing.
7. Maintain a clear path from business problem → insight → resource → system → Front Door → GHL.

## 3. High-level site map

```text
/
├── /front-door
├── /systems
│   ├── /systems/business-systems
│   ├── /systems/client-acquisition
│   ├── /systems/workflow-systems
│   ├── /systems/ai-systems
│   └── /systems/vertical-systems
├── /websites
│   ├── /websites/business-websites
│   ├── /websites/financial-advisor-websites
│   ├── /websites/service-business-websites
│   ├── /websites/website-factory
│   └── /websites/examples
├── /insights
│   ├── /insights/ai
│   ├── /insights/business-systems
│   ├── /insights/client-acquisition
│   ├── /insights/financial-advisory
│   ├── /insights/digital-transformation
│   └── /insights/djitt-frameworks
├── /resources
├── /about
├── /contact
└── /legal
    ├── /privacy-policy
    ├── /terms-and-conditions
    ├── /company-information
    ├── /cookie-policy
    ├── /refund-cancellation
    └── /cancel
```

## 4. Page architecture matrix

### 4.1 Home

| Field | Details |
| --- | --- |
| URL | `/` |
| Purpose | Public introduction to DJITT as a business systems and acquisition architecture practice; orient visitor around the Front Door. |
| Audience | Prospects, business owners, advisory firms, growth-focused service businesses. |
| Search intent | Brand discovery, understanding what DJITT does, evaluating whether the business fits. |
| CTA | Start Here / Book a discovery call / Explore systems |
| Internal links | `/front-door`, `/systems`, `/websites`, `/insights`, `/resources`, `/about`, `/contact` |
| Schema | Organization, WebSite, WebPage, BreadcrumbList |
| Relationship to Front Door | Primary entry point and routing homepage for all major pathways. |
| Relationship to GHL | Indirect; routes to Front Door and qualification flow rather than direct CRM capture. |

### 4.2 Front Door

| Field | Details |
| --- | --- |
| URL | `/front-door` |
| Purpose | Help visitors determine which DJITT system fits their business problem. |
| Audience | New visitors who know they have a problem but not the right category. |
| Search intent | “I need help with my website / lead flow / process / AI / growth system” |
| CTA | Choose a valid pathway; continue to qualification or discovery call |
| Internal links | `/systems`, `/websites`, `/insights`, `/resources`, `/contact` |
| Schema | WebPage, BreadcrumbList, FAQ/answer-style structured content if used appropriately |
| Relationship to Front Door | This is the central conversion and routing page. |
| Relationship to GHL | Directly connected as the public front end for GHL qualification and appointment booking. |

### 4.3 Systems overview

| Field | Details |
| --- | --- |
| URL | `/systems` |
| Purpose | Explain the DJITT systems architecture and how the business uses intelligent systems to solve operational problems. |
| Audience | Prospects evaluating DJITT as a strategic partner. |
| Search intent | “What is a business system?” “What do DJITT systems include?” |
| CTA | Explore a specific system or start with Front Door |
| Internal links | `/front-door`, `/systems/client-acquisition`, `/systems/business-systems`, `/systems/ai-systems`, `/systems/workflow-systems`, `/systems/vertical-systems`, `/insights` |
| Schema | WebPage, BreadcrumbList, Service or CollectionPage patterns if used |
| Relationship to Front Door | Supporting architecturally; helps visitors orient before choosing a path. |
| Relationship to GHL | Secondary; qualification happens after a relevant path is selected. |

### 4.4 Business Systems

| Field | Details |
| --- | --- |
| URL | `/systems/business-systems` |
| Purpose | Define how businesses align operations, customer journeys, systems, and decision-making into a coherent operating model. |
| Audience | Business owners, founders, senior operators, teams experiencing fragmentation. |
| Search intent | “business systems”, “systems architecture for business”, “how to improve operations” |
| CTA | Start with Front Door or book an AI systems audit |
| Internal links | `/front-door`, `/systems`, `/insights/business-systems`, `/resources`, `/websites` |
| Schema | WebPage, Service, BreadcrumbList |
| Relationship to Front Door | A deeper pathway for operational improvement and digital bottleneck diagnosis. |
| Relationship to GHL | Qualified lead route for business systems discovery and solution call. |

### 4.5 Client Acquisition Systems

| Field | Details |
| --- | --- |
| URL | `/systems/client-acquisition` |
| Purpose | Explain client acquisition as a system: authority → audience → outreach → conversation → qualification → follow-up → booking → CRM → measurement. |
| Audience | Service businesses, advisory firms, growth-focused operators, lead generation buyers. |
| Search intent | “client acquisition system”, “lead generation strategy”, “how to improve acquisition flow” |
| CTA | Explore lead flow / book a discovery call / continue to front-door qualification |
| Internal links | `/front-door`, `/systems`, `/insights/client-acquisition`, `/resources`, `/websites`, `/contact` |
| Schema | WebPage, BreadcrumbList, Service |
| Relationship to Front Door | Central route for acquisition-focused prospects. |
| Relationship to GHL | High relevance; supports GHL qualification, discovery, and pipeline progression. |

### 4.6 Client acquisition component interpretation

This page must explicitly position the following as system components, not as DJITT products:

- LinkedIn
- Apollo
- Instantly
- Ulinc
- GHL

The narrative should state:

> DJITT designs the architecture. The technology provides the components.

### 4.7 Workflow Systems

| Field | Details |
| --- | --- |
| URL | `/systems/workflow-systems` |
| Purpose | Show how operational workflows and handoffs can be designed to reduce manual work and improve consistency. |
| Audience | Operational leaders, founders, teams with process bottlenecks. |
| Search intent | “workflow systems”, “business process automation”, “operations architecture” |
| CTA | Explore business systems or begin Front Door |
| Internal links | `/front-door`, `/systems`, `/insights/business-systems`, `/resources`, `/contact` |
| Schema | WebPage, BreadcrumbList, Service |
| Relationship to Front Door | Route for businesses who need process and follow-up improvements. |
| Relationship to GHL | Secondary routing page for readiness qualification. |

### 4.8 AI Systems

| Field | Details |
| --- | --- |
| URL | `/systems/ai-systems` |
| Purpose | Explain AI as part of a broader intelligent operating system, not as a standalone gimmick. |
| Audience | Business owners evaluating automation and AI use cases. |
| Search intent | “AI system for business”, “intelligent systems”, “AI workflow automation” |
| CTA | Start with assessment or guided route |
| Internal links | `/front-door`, `/systems`, `/insights/ai`, `/resources`, `/contact` |
| Schema | WebPage, BreadcrumbList, Service |
| Relationship to Front Door | Pathway for AI-related discovery and business-fit assessment. |
| Relationship to GHL | Qualified route for AI systems audit and strategy call. |

### 4.9 Vertical Systems

| Field | Details |
| --- | --- |
| URL | `/systems/vertical-systems` |
| Purpose | Explain how DJITT creates reusable systems that can apply across multiple industries while the current emphasis remains on financial services. |
| Audience | Future-facing buyers, founders, broader industry prospects. |
| Search intent | “vertical business systems”, “industry-specific systems architecture” |
| CTA | Explore relevant vertical or begin Front Door |
| Internal links | `/systems`, `/insights`, `/websites`, `/resources`, `/contact` |
| Schema | WebPage, BreadcrumbList |
| Relationship to Front Door | Supports vertical discovery and future expansion relevance. |
| Relationship to GHL | Lower-intent discovery, not a direct conversion page. |

## 5. Websites architecture

### 5.1 Websites overview

| Field | Details |
| --- | --- |
| URL | `/websites` |
| Purpose | Position websites as the digital front door to a business: a trust and conversion system, not just design. |
| Audience | Business owners, service-business operators, local businesses. |
| Search intent | “website for business”, “professional website”, “websites for service business” |
| CTA | Request a website enquiry or start the website pathway |
| Internal links | `/front-door`, `/systems`, `/websites/business-websites`, `/websites/financial-advisor-websites`, `/websites/service-business-websites`, `/contact` |
| Schema | WebPage, BreadcrumbList, Service |
| Relationship to Front Door | Website pathway is a key branch in the Front Door architecture. |
| Relationship to GHL | Mapped to website enquiry and qualification flow, but not positioned as a GHL product. |

### 5.2 Business Websites

| Field | Details |
| --- | --- |
| URL | `/websites/business-websites` |
| Purpose | Explain how a professional business website attracts, informs and converts visitors into enquiries and booked conversations. |
| Audience | Small and mid-sized businesses. |
| Search intent | “business website design”, “small business website”, “professional website for business” |
| CTA | Enquire about a website project |
| Internal links | `/front-door`, `/websites`, `/insights`, `/resources`, `/contact` |
| Schema | WebPage, Service, BreadcrumbList |
| Relationship to Front Door | Website entry path for straightforward business website needs. |
| Relationship to GHL | Public site makes the enquiry; GHL qualifies the opportunity. |

### 5.3 Financial Advisor Websites

| Field | Details |
| --- | --- |
| URL | `/websites/financial-advisor-websites` |
| Purpose | Explain website strategy for advisory firms and financial professionals. |
| Audience | Financial advisors, planners, wealth managers. |
| Search intent | “financial advisor website”, “wealth management website”, “website for financial advisers” |
| CTA | Start with a website consultation or discover the relevant front-door pathway |
| Internal links | `/front-door`, `/systems/client-acquisition`, `/resources`, `/insights/financial-advisory`, `/contact` |
| Schema | WebPage, Service, BreadcrumbList |
| Relationship to Front Door | Strong alignment with the current ICP and vertical focus. |
| Relationship to GHL | Linked to qualification and client acquisition flow, but not as an explicit product pitch. |

### 5.4 Service Business Websites

| Field | Details |
| --- | --- |
| URL | `/websites/service-business-websites` |
| Purpose | Present website solutions for service firms that want to improve trust, clarity and conversion. |
| Audience | Local service businesses, trade businesses, B2B service providers. |
| Search intent | “website for service business”, “service business website”, “local business website” |
| CTA | Start website inquiry |
| Internal links | `/front-door`, `/websites`, `/resources`, `/insights` |
| Schema | WebPage, Service |
| Relationship to Front Door | A common route for a clear service-business need. |
| Relationship to GHL | Enquiry qualification takes place after public discovery. |

### 5.5 Website Factory

| Field | Details |
| --- | --- |
| URL | `/websites/website-factory` |
| Purpose | Explain the repeatable, scalable website system model behind DJITT’s website offering. |
| Audience | Business owners who want a clear, repeatable system rather than custom overhead. |
| Search intent | “website factory”, “repeatable website system”, “marketing website system” |
| CTA | Explore website process or request an assessment |
| Internal links | `/websites`, `/systems`, `/resources`, `/front-door` |
| Schema | WebPage, BreadcrumbList |
| Relationship to Front Door | Operational pathway under the website branch. |
| Relationship to GHL | Secondary; used for website conversion qualification. |

### 5.6 Website Examples

| Field | Details |
| --- | --- |
| URL | `/websites/examples` |
| Purpose | Show examples of website outcomes without inventing false client work or testimonials. |
| Audience | Prospects assessing quality and fit. |
| Search intent | “website examples”, “business website portfolio” |
| CTA | Request a website consultation |
| Internal links | `/websites`, `/front-door`, `/contact` |
| Schema | WebPage, BreadcrumbList |
| Relationship to Front Door | Supporting page for discovery and trust building. |
| Relationship to GHL | No direct product claim; only general enquiry route. |

## 6. Insights architecture

### 6.1 Insights overview

| Field | Details |
| --- | --- |
| URL | `/insights` |
| Purpose | Publish strategic thinking, definitions and frameworks that support DJITT’s positioning and content architecture. |
| Audience | Prospects, operators, consultants, business owners. |
| Search intent | “business systems insights”, “AI systems strategy”, “digital transformation thinking” |
| CTA | Explore a relevant insight or start with Front Door |
| Internal links | `/front-door`, `/systems`, `/resources`, `/websites`, `/insights/djitt-frameworks` |
| Schema | WebPage, BreadcrumbList, Article |
| Relationship to Front Door | Educational layer that qualifies intent before conversion. |
| Relationship to GHL | Indirect support; not a direct sales page. |

### 6.2 AI insights

| Field | Details |
| --- | --- |
| URL | `/insights/ai` |
| Purpose | Position AI as part of an intelligent operating system, not hype or isolated tool adoption. |
| Audience | Business owners assessing AI opportunities. |
| Search intent | “AI systems for business”, “AI business strategy”, “how to use AI in business” |
| CTA | Explore AI systems, start route, or ask a question |
| Internal links | `/systems/ai-systems`, `/insights`, `/resources`, `/front-door` |
| Schema | WebPage, Article |
| Relationship to Front Door | AI pathway in the discovery model. |
| Relationship to GHL | Qualified into AI Systems Audit or strategy conversation. |

### 6.3 Business Systems insights

| Field | Details |
| --- | --- |
| URL | `/insights/business-systems` |
| Purpose | Explain why disconnected tools and fragmented processes create operational and revenue problems. |
| Audience | Operators and business leaders. |
| Search intent | “business systems”, “operations architecture”, “process design” |
| CTA | Explore relevant system or start route |
| Internal links | `/systems/business-systems`, `/systems/workflow-systems`, `/resources`, `/front-door` |
| Schema | WebPage, Article |
| Relationship to Front Door | Operational diagnosis route. |
| Relationship to GHL | Supports downstream qualification. |

### 6.4 Client Acquisition insights

| Field | Details |
| --- | --- |
| URL | `/insights/client-acquisition` |
| Purpose | Explain acquisition as a measurable system, not a generic marketing tactic. |
| Audience | Business owners, service firms, financial advisory teams. |
| Search intent | “client acquisition system”, “lead generation and follow-up strategy” |
| CTA | Explore systems or continue to Front Door |
| Internal links | `/systems/client-acquisition`, `/front-door`, `/resources`, `/websites` |
| Schema | WebPage, Article |
| Relationship to Front Door | One of the key conversion topics feeding the front door. |
| Relationship to GHL | Directly connected to qualification and appointment flow. |

### 6.5 Financial Advisory insights

| Field | Details |
| --- | --- |
| URL | `/insights/financial-advisory` |
| Purpose | Publish practical insight for adviser firms balancing trust, compliance, digital marketing and better client conversion. |
| Audience | Financial advisors, planners, advisory firms. |
| Search intent | “financial advisory AI”, “financial advisor website”, “lead follow-up for wealth firms” |
| CTA | Explore Front Door or relevant system pathway |
| Internal links | `/systems/client-acquisition`, `/websites/financial-advisor-websites`, `/front-door`, `/resources` |
| Schema | WebPage, Article |
| Relationship to Front Door | Strong ICP alignment and early-stage commercial relevance. |
| Relationship to GHL | Supports client qualification and appointment conversion. |

### 6.6 Digital Transformation insights

| Field | Details |
| --- | --- |
| URL | `/insights/digital-transformation` |
| Purpose | Untangle digital transformation from generic buzzwords and tie it to operational clarity and business structure. |
| Audience | Business owners and leaders dealing with fragmented systems. |
| Search intent | “digital transformation”, “business systems change”, operational improvement |
| CTA | Continue to relevant system route |
| Internal links | `/systems`, `/insights`, `/resources`, `/front-door` |
| Schema | WebPage, Article |
| Relationship to Front Door | Educational, trust-building, and route-to-solution content. |
| Relationship to GHL | Indirect; relevant to deeper discovery calls. |

### 6.7 DJITT frameworks

| Field | Details |
| --- | --- |
| URL | `/insights/djitt-frameworks` |
| Purpose | Publish DJITT’s own framework vocabulary and strategic models. |
| Audience | Prospects, teams, LTV-conscious operators, thought-leadership readers. |
| Search intent | “judgement gap”, “architecture gap”, “digital debt”, “fidelity ceiling”, “resourcefulness pivot” |
| CTA | Explore related resource or continue to Front Door |
| Internal links | `/insights`, `/resources`, `/systems`, `/front-door` |
| Schema | WebPage, Article, BreadcrumbList |
| Relationship to Front Door | Brand and trust-building intellectual layer. |
| Relationship to GHL | Not a direct CRM route; supports consideration and qualification. |

Core DJITT framework vocabulary:

- Judgement Gap
- Architecture Gap
- Digital Debt
- Fidelity Ceiling
- Resourcefulness Pivot
- Productive Delusion
- Contribution Call

## 7. Resources architecture

### 7.1 Resources overview

| Field | Details |
| --- | --- |
| URL | `/resources` |
| Purpose | Curate tools, checklists, frameworks, and assessments that support prospect education and qualification. |
| Audience | Prospects, operators, service businesses. |
| Search intent | “business assessment”, “website readiness checklist”, “lead follow-up checklist” |
| CTA | Download or start a relevant assessment |
| Internal links | `/front-door`, `/systems`, `/insights`, `/websites` |
| Schema | WebPage, CollectionPage, BreadcrumbList |
| Relationship to Front Door | Resource library is a key companion to the Front Door. |
| Relationship to GHL | Some resources may feed into practice score or qualification flow. |

### 7.2 Initial resource groupings

Examples to be specified as actual child pages or grouped landing sections:

- Practice Score
- Website Readiness Checklist
- Client Acquisition Readiness Checklist
- Lead Follow-Up Checklist
- AI Systems Checklist
- Business Systems Assessment
- ICP Worksheet
- Client Acquisition System Map

## 8. About and Contact

### 8.1 About

| Field | Details |
| --- | --- |
| URL | `/about` |
| Purpose | Explain who DJITT is, what it stands for, and how it thinks about intelligent systems. |
| Audience | Prospects seeking trust and business context. |
| Search intent | “about DJITT”, “who is DJITT”, “business systems company” |
| CTA | Explore systems, start here, or contact |
| Internal links | `/`, `/front-door`, `/systems`, `/insights`, `/contact` |
| Schema | WebPage, Organization, BreadcrumbList |
| Relationship to Front Door | Trust layer that supports the route into the right solution. |
| Relationship to GHL | Indirect; not a direct ticketing page. |

### 8.2 Contact

| Field | Details |
| --- | --- |
| URL | `/contact` |
| Purpose | Allow direct inquiry and route visitors to appropriate conversion flow. |
| Audience | Existing prospects and new enquiries. |
| Search intent | “contact DJITT”, “book a call”, “business system discussion” |
| CTA | Send an enquiry or book a discovery call |
| Internal links | `/front-door`, `/systems`, `/websites`, `/resources`, `/about` |
| Schema | WebPage, ContactPage, BreadcrumbList |
| Relationship to Front Door | Final conversion destination for direct or warm leads. |
| Relationship to GHL | This page should connect to the GHL qualification and booking experience. |

## 9. Legal and support pages

These are supporting pages, not core architecture pages.

| URL | Purpose | Relationship to Front Door | Relationship to GHL |
| --- | --- | --- | --- |
| `/privacy-policy` | Explain data practices and consent boundary. | Supporting trust layer. | No direct conversion relationship. |
| `/terms-and-conditions` | Define commercial and service terms. | Supporting legal trust layer. | No direct conversion relationship. |
| `/company-information` | Corporate identity and registration details. | Supporting trust layer. | No direct conversion relationship. |
| `/cookie-policy` | Explain cookie use and consent status. | Supporting trust and compliance layer. | No direct conversion relationship. |
| `/refund-cancellation` | Define cancellation and refund practice. | Supporting business clarity. | No direct conversion relationship. |
| `/cancel` | Payment cancellation outcome page. | Supports the customer journey after checkout. | Indirect; payment flow ended. |

## 10. Front Door relationship model

The Front Door is the center of the information architecture.

```text
Business problem
   ↓
Front Door / route selection
   ↓
Relevant system
   ↓
Relevant insight / resource
   ↓
Solution path / GHL qualification
   ↓
Appointment / delivery
```

This ensures DJITT is experienced as a business architecture and conversion system, not a software catalogue.

## 11. GHL relationship model

GHL sits at the conversion boundary.

It is not the front-facing structure of the website.

Instead:

- the public site discovers and educates
- the Front Door qualifies intent
- GHL manages qualification, pipeline, appointments and workflows

This separation keeps the public website credible and prevents it from being perceived as a generic CRM or tool listing.

## 12. Schema strategy by page type

The site should use the following page-level schema patterns where appropriate:

- Home: Organization + WebSite + WebPage
- Front Door: WebPage + BreadcrumbList
- System pages: WebPage + Service + BreadcrumbList
- Website pages: WebPage + Service + BreadcrumbList
- Insight pages: WebPage + Article + BreadcrumbList
- Resource pages: WebPage + CollectionPage + BreadcrumbList
- About / Contact: Organization + ContactPage + WebPage
- Legal pages: WebPage + BreadcrumbList

## 13. Navigation logic

Primary navigation should favour the following flow:

```text
Home → Front Door → Relevant system → Relevant insight/resource → GHL conversion
```

Secondary navigation should support:

- Websites
- Insights
- Resources
- About
- Contact

## 14. Content and conversion rules

1. Do not lead with technology.
2. Lead with the business problem.
3. Use phrase “Building Intelligent Systems That Scale Trust” consistently.
4. Position LinkedIn, Apollo, Instantly, Ulinc and GHL as acquisition system components.
5. Keep GHL at the qualification boundary, not the public product narrative.
6. Stop implying DJITT is a software vendor first; position it as a system architect and growth partner.
7. Ensure every section can route back into the Front Door or a relevant GHL path.

## 15. Final architecture intent

The second-generation DJITT architecture is designed to behave like this:

```text
PUBLIC WEBSITE
   ↓
FRONT DOOR
   ↓
SYSTEM
   ↓
INSIGHT / RESOURCE
   ↓
QUALIFICATION
   ↓
GHL
   ↓
APPOINTMENT / DELIVERY
```

The website becomes the public discovery layer.

GHL becomes the private qualification and delivery layer.

That distinction is the foundation of the second-generation DJITT architecture.
