Absolutely. In fact, **I think we should update it before you start executing the VS Code prompts**.

The previous version was good for the website architecture, but after our clarification about **LinkedIn + Apollo + Instantly + Ulinc + GHL**, the master plan should represent the whole DJITT acquisition ecosystem rather than treating those components as an afterthought.

Here is the **updated master implementation instruction**. This should replace the previous “proper second-generation rebuild” document.

# DJITT.CO.UK — SECOND-GENERATION FRONT DOOR REBUILD

### Master implementation specification

> **Do not execute this entire document as one VS Code prompt.**
>
> Execute the phases sequentially. Each phase has its own prompt.
> Complete, test and commit each phase before moving to the next.

---

# 1. THE STRATEGIC CHANGE

DJITT is moving from:

```text
OLD DJITT

Website
   ↓
Platform
   ↓
Features
   ↓
Book a Demo
```

to:

```text
NEW DJITT

Discovery
   ↓
FRONT DOOR
   ↓
Business problem
   ↓
Relevant system
   ↓
Insight / Resource
   ↓
Solution
   ↓
GHL
   ↓
Delivery
```

The website is no longer primarily a brochure for the DJITT platform.

It becomes **DJITT's public discovery, education, qualification and routing layer**.

---

# 2. DJITT'S NEW WEBSITE ARCHITECTURE

```text
DJITT.CO.UK
│
├── Home
│
├── Front Door
│
├── Systems
│   │
│   ├── Business Systems
│   ├── Client Acquisition Systems
│   ├── Workflow Systems
│   ├── AI Systems
│   └── Vertical Systems
│
├── Websites
│   │
│   ├── Business Websites
│   ├── Financial Advisor Websites
│   ├── Service Business Websites
│   ├── Website Factory
│   └── Examples
│
├── Insights
│   │
│   ├── AI
│   ├── Business Systems
│   ├── Client Acquisition
│   ├── Financial Advisory
│   ├── Digital Transformation
│   └── DJITT Frameworks
│
├── Resources
│   │
│   ├── Assessments
│   ├── Guides
│   ├── Checklists
│   ├── Templates
│   └── Tools
│
├── About
│
└── Contact
```

---

# 3. THE DJITT ACQUISITION ARCHITECTURE

This is the major addition.

DJITT isn't just building websites or AI systems.

We are building **business acquisition systems**.

The acquisition architecture is:

```text
                    AUTHORITY
                       │
                    LinkedIn
                       │
                       ↓
                  TARGET AUDIENCE
                       │
                     Apollo
                       │
                       ↓
                    OUTREACH
                       │
                   Instantly
                       │
                       ↓
                  CONVERSATION
                       │
                     Ulinc
                       │
                       ↓
                 DJITT FRONT DOOR
                       │
                       ↓
                  QUALIFICATION
                       │
                     GHL
                       │
                       ↓
                   APPOINTMENT
                       │
                       ↓
                DJITT DELIVERY
```

The tools are **components of the system**, not the product itself.

That distinction should influence the website copy.

---

# 4. DJITT'S CURRENT PRIMARY VERTICAL

The current primary ICP remains:

> **Financial advisors, financial planners, wealth managers and related advisory firms.**

But the website must not be architecturally locked to financial services.

Instead:

```text
                    DJITT
                      │
              Vertical Systems Lab
                      │
        ┌─────────────┴─────────────┐
        ↓                           ↓
Financial Advisory          Future Verticals
        │
        ├── Acquisition
        ├── Website
        ├── Workflow
        ├── AI
        └── Business Systems
```

This allows DJITT to expand later without rebuilding the site.

---

# 5. POSITIONING RULE

This rule should be enforced throughout the website:

> **Don't lead with technology. Lead with the business problem.**

Avoid opening with:

* AI
* automation
* ChatGPT
* CRM
* GHL
* Apollo
* Instantly
* digital transformation

Instead:

```text
Business problem
        ↓
Business consequence
        ↓
System requirement
        ↓
Intelligent system
        ↓
Technology
```

For example:

**Weak:**

> We use AI, Apollo and Instantly to automate lead generation.

**DJITT:**

> Your business doesn't need more leads if the right prospects aren't being identified, reached, followed up and converted consistently.

Then explain the system.

---

# 6. PHASE 0 — EXISTING SITE AUDIT

### VS Code prompt

```text
You are working on the existing DJITT website at djitt.co.uk.

DO NOT MODIFY PRODUCTION CODE YET.

Audit the entire repository.

Identify:

- framework
- routing
- components
- layouts
- styling
- assets
- forms
- GHL integrations
- Netlify configuration
- Netlify Functions
- API routes
- SEO
- sitemap
- robots.txt
- schema
- analytics
- redirects
- canonical URLs
- Open Graph
- existing pages
- existing URLs
- external links
- app.djitt.co.uk references
- links.djitt.co.uk references

Create:

/docs/djitt-current-site-audit.md

Also identify which existing functionality must be preserved.

Do not redesign anything.

Do not delete anything.

Do not create new production pages.

Return the audit only.
```

---

# 7. PHASE 1 — INFORMATION ARCHITECTURE

```text
Using the current site audit, create the second-generation DJITT information architecture.

DJITT is moving from a platform-first website to a Front Door architecture.

Core positioning:

"Building Intelligent Systems That Scale Trust"

DJITT helps organisations build intelligent systems that improve how they operate, engage customers and grow.

Primary current ICP:

Financial advisors, financial planners, wealth managers and related advisory firms.

Future architecture must support additional verticals.

Create these major sections:

/
/front-door
/systems
/websites
/insights
/resources
/about
/contact

Systems must include:

/systems/business-systems
/systems/client-acquisition
/systems/workflow-systems
/systems/ai-systems
/systems/vertical-systems

Client Acquisition Systems must recognise these as system components:

LinkedIn
Apollo
Instantly
Ulinc
GHL

Do not position these tools as DJITT's product.

Position them as components within an acquisition architecture.

Create:

/docs/djitt-site-architecture.md

For every page specify:

URL
purpose
audience
search intent
CTA
internal links
schema
relationship to Front Door
relationship to GHL

Do not implement the pages yet.
```

---

# 8. PHASE 2 — TECHNICAL SEO FOUNDATION

```text
Implement DJITT's technical SEO foundation.

Create or update:

robots.txt
sitemap.xml
canonical URLs
page metadata
Open Graph metadata
Twitter/X metadata
favicon
404 handling
redirect handling

Every indexable page must have:

- unique title
- unique description
- canonical
- exactly one H1
- logical heading hierarchy
- semantic HTML
- meaningful image alt text

Ensure important content is available to crawlers without requiring user interaction.

Create reusable SEO utilities.

Do not keyword stuff.

Do not invent claims.

Document implementation in:

/docs/djitt-seo-implementation.md
```

---

# 9. PHASE 3 — ENTITY + STRUCTURED DATA

```text
Implement DJITT's structured data architecture.

Support:

Organization
WebSite
WebPage
BreadcrumbList
Article
Service where appropriate
Person where appropriate

Create reusable JSON-LD utilities.

Represent DJITT consistently as:

DJITT LTD

Positioning:

"Building Intelligent Systems That Scale Trust"

DJITT builds intelligent business systems, websites, acquisition systems, workflow systems and AI systems.

Do not claim DJITT provides financial advice.

Do not invent:

clients
awards
certifications
statistics
revenue
testimonials
performance claims

Use consistent @id relationships.

Create:

/docs/djitt-entity-model.md
```

---

# 10. PHASE 4 — NEW HOMEPAGE

The homepage becomes the **Front Door to DJITT**.

### Structure

```text
HERO

Building Intelligent Systems That Scale Trust

Problem

DJITT philosophy

What DJITT builds

Client Acquisition Systems

Websites

Vertical Systems

Insights

Resources

Start Here

Trust
```

### VS Code prompt

```text
Rebuild the DJITT homepage around the new Front Door architecture.

The homepage must NOT be a platform-first SaaS landing page.

It should communicate:

DJITT helps organisations turn fragmented processes, manual work and digital bottlenecks into intelligent business systems.

Structure:

1. Hero
2. Business problem
3. DJITT philosophy
4. What DJITT builds
5. Client Acquisition Systems
6. Websites
7. Vertical Systems
8. Insights
9. Resources
10. Start Here
11. Trust
12. Final CTA

Positioning rules:

Do not lead with AI.

Do not lead with automation.

Do not lead with GHL.

Do not lead with Apollo.

Do not lead with Instantly.

Do not make DJITT look like a collection of software tools.

Use business-first language.

Maintain the existing DJITT visual identity.

Preserve working functionality.

Make the page:

mobile-first
accessible
semantic
fast
SEO-friendly
AI-readable
conversion-focused
```

---

# 11. PHASE 5 — FRONT DOOR

Create:

`/front-door`

Its purpose is:

> **Help the visitor determine where DJITT can help.**

### Paths

```text
I need a better website
I need more leads
I need better follow-up
I need better processes
I need an AI system
I need a business system
I'm not sure
```

### Prompt

```text
Create /front-door.

The page is DJITT's guided entry point.

Visitors should choose a business problem, not a technology.

Create pathways for:

Website
Client Acquisition
Lead Follow-Up
Workflow / Operations
AI Systems
Business Systems
Not Sure

Each pathway should contain:

Problem
Explanation
Relevant DJITT system
Relevant insight
Relevant resource
CTA

Connect appropriate pathways to the existing GHL conversion journey.

Do not invent GHL IDs.

Do not expose internal GHL implementation details.

Implement SEO metadata and BreadcrumbList schema.
```

---

# 12. PHASE 6 — SYSTEMS

Create `/systems`.

The key page:

## `/systems/client-acquisition`

This is where **LinkedIn, Apollo, Instantly, Ulinc and GHL** properly live.

### Prompt

```text
Create the DJITT Systems architecture.

Create:

/systems
/systems/business-systems
/systems/client-acquisition
/systems/workflow-systems
/systems/ai-systems
/systems/vertical-systems

Create a dedicated Client Acquisition Systems page.

Explain acquisition as an interconnected system:

Authority
→ Audience
→ Outreach
→ Conversation
→ Qualification
→ Follow-Up
→ Booking
→ CRM
→ Measurement

Explain the role of:

LinkedIn
Apollo
Instantly
Ulinc
GHL

Important:

These are technology components.

They are NOT the core DJITT proposition.

The core proposition is the system.

Use language such as:

"DJITT designs the architecture. The technology provides the components."

Do not make unsupported claims about any platform.

Add relevant links to:

Front Door
Insights
Resources
Websites
Contact

Create reusable system-page components.
```

---

# 13. PHASE 7 — WEBSITES

This is now a proper DJITT vertical.

```text
/websites
/websites/business-websites
/websites/financial-advisor-websites
/websites/service-business-websites
/websites/website-factory
/websites/examples
```

### Prompt

```text
Create the DJITT Websites architecture.

The website offering must be understandable to a small business owner.

Position websites as:

"The front door to your business."

Explain that a website can connect:

Visitor
→ enquiry
→ qualification
→ follow-up
→ booking
→ CRM
→ business system

Do not make GHL the headline.

Create:

/websites
/websites/business-websites
/websites/financial-advisor-websites
/websites/service-business-websites
/websites/website-factory
/websites/examples

Include clear calls to action for website enquiries.

Ensure this section can be shared independently in WhatsApp groups, marketplaces and social media.

Do not invent clients or portfolio examples.
```

---

# 14. PHASE 8 — INSIGHTS

```text
/insights
/insights/ai
/insights/business-systems
/insights/client-acquisition
/insights/financial-advisory
/insights/digital-transformation
/insights/djitt-frameworks
```

The last category is especially important.

DJITT should develop its own vocabulary:

**Judgement Gap**

**Architecture Gap**

**Digital Debt**

**Fidelity Ceiling**

**Resourcefulness Pivot**

**Productive Delusion**

**Contribution Call**

These aren't just blog topics.

They become **DJITT intellectual frameworks**.

---

# 15. PHASE 9 — RESOURCES

```text
/resources

Assessments
Guides
Checklists
Templates
Tools
```

Initial resources:

* Practice Score
* Website Readiness Checklist
* Client Acquisition Readiness Checklist
* Lead Follow-Up Checklist
* AI Systems Checklist
* Business Systems Assessment
* ICP Worksheet
* Client Acquisition System Map

---

# 16. PHASE 10 — AEO

```text
Implement an Answer Engine Optimization content architecture.

Create reusable components for:

Question
Direct Answer
Definition
Key Takeaways
Steps
Comparison
Related Questions

For appropriate pages:

Use question-based H2/H3 headings.

Answer questions directly before providing detailed explanation.

Use semantic HTML.

Provide concise, factual answers.

Link answers to deeper DJITT Insights, Systems and Resources.

Do not create hidden content.

Do not keyword stuff.

Do not create FAQ schema simply for SEO.

Only use structured data that accurately represents visible content.
```

---

# 17. PHASE 11 — GEO

```text
Implement DJITT's Generative Engine Optimization foundation.

Goal:

Make DJITT's public knowledge easy for retrieval and answer systems to understand.

Create consistent definitions for:

DJITT
Intelligent Systems
Business Systems
Client Acquisition Systems
AI Systems
Website Systems
Vertical Systems
DJITT Frameworks

Build clear entity relationships:

DJITT
→ builds
→ Intelligent Systems

DJITT
→ publishes
→ Insights

DJITT
→ creates
→ Frameworks

DJITT
→ provides
→ Resources

DJITT
→ builds
→ Websites

DJITT
→ develops
→ Vertical Systems

Maintain consistent terminology across:

page content
metadata
schema
internal links
articles
resources

Do not claim AI platforms recommend or cite DJITT.

Do not create fake authority.

Create:

/docs/djitt-geo-strategy.md
```

---

# 18. PHASE 12 — OPTIONAL `llms.txt`

```text
Create an optional /llms.txt file.

It is NOT to be presented as a Google ranking mechanism.

Its purpose is to provide a concise machine-readable orientation to DJITT's public knowledge architecture.

Include canonical public URLs for:

DJITT
Systems
Websites
Insights
Resources
Frameworks

Do not include:

private URLs
credentials
API keys
GHL internal information
```

---

# 19. PHASE 13 — INTERNAL LINKING

The system should create a knowledge loop:

```text
Insight
   ↓
System
   ↓
Resource
   ↓
Front Door
   ↓
GHL
```

And:

```text
Website
   ↓
Insight
   ↓
Resource
   ↓
Enquiry
```

### Prompt

```text
Implement a contextual DJITT internal linking architecture.

Every Insight should be able to link to:

related Insight
relevant System
relevant Resource
relevant Website solution
relevant Front Door pathway

Every Resource should link to:

relevant Insight
relevant System
relevant Front Door pathway

Every System page should link to:

relevant Insights
relevant Resources
relevant Website solutions
relevant Front Door pathway

Avoid random links.

Only create contextually useful links.
```

---

# 20. PHASE 14 — GHL BRIDGE

The public site remains:

**Presentation + discovery + education + routing**

GHL remains:

**CRM + qualification + pipeline + appointments + workflows**

Architecture:

```text
DJITT.CO.UK
      ↓
Front Door
      ↓
Practice Score
      ↓
GHL
      ↓
Qualification
      ↓
AI Systems Audit
      ↓
Strategy & Solution Call
```

The website does **not** need to replace the existing DJITT Advisor Acquisition pipeline.

---

# 21. PHASE 15 — ACQUISITION STACK

Create a dedicated conceptual architecture page/section:

### Client Acquisition System

```text
LinkedIn
   ↓
Authority
   ↓
Apollo
   ↓
Audience
   ↓
Instantly
   ↓
Outreach
   ↓
Ulinc
   ↓
Lead Acquisition
   ↓
DJITT Front Door
   ↓
GHL
   ↓
Qualification
   ↓
Appointment
```

But the website should always explain:

> **DJITT designs the system. The tools are components within the system.**

This protects DJITT from becoming perceived as simply an Apollo/Instantly/GHL implementation agency.

---

# 22. PHASE 16 — ANALYTICS

Track meaningful events:

```text
page_view

front_door_started

front_door_path_selected

insight_viewed

resource_viewed

resource_started

website_service_viewed

practice_score_started

practice_score_completed

ghl_cta_clicked

audit_cta_clicked

strategy_call_clicked
```

Preserve UTM information.

This will eventually let us see:

```text
LinkedIn
Apollo
Instantly
Ulinc
Google
AI discovery
WhatsApp
Direct
       ↓
DJITT
       ↓
Content
       ↓
Front Door
       ↓
Conversion
```

---

# 23. PHASE 17 — PERFORMANCE

Audit:

* Core Web Vitals
* LCP
* CLS
* INP
* images
* fonts
* JavaScript
* CSS
* third-party scripts
* caching
* compression
* mobile performance

Keep the Netlify architecture lightweight.

---

# 24. PHASE 18 — SECURITY

Audit:

* API keys
* GHL credentials
* environment variables
* Netlify Functions
* webhooks
* CORS
* forms
* spam
* injection
* open redirects

**No GHL credentials in browser code.**

---

# 25. PHASE 19 — URL MIGRATION

Before deleting or renaming anything:

```text
OLD URL
   ↓
Relevant NEW URL
   ↓
301
```

Never:

```text
Old page
 ↓
Homepage
```

unless the homepage genuinely is the appropriate replacement.

Create:

`/docs/djitt-url-migration.md`

---

# 26. PHASE 20 — CONTENT ENGINE

The content model should now be:

```text
BUSINESS PROBLEM
       ↓
INSIGHT
       ↓
DJITT FRAMEWORK
       ↓
RESOURCE
       ↓
SYSTEM
       ↓
FRONT DOOR
       ↓
GHL
```

Example:

```text
Problem:
"We aren't following up with prospects quickly enough."

        ↓

Insight:
"The Response Gap"

        ↓

Framework:
"Speed-to-Trust"

        ↓

Resource:
"Lead Follow-Up Readiness Checklist"

        ↓

System:
"Client Acquisition System"

        ↓

Front Door:
"Improve Client Acquisition"

        ↓

Practice Score
```

**This is the content engine I would build around.**

---

# 27. FIRST CONTENT CLUSTERS

## Intelligent Systems

* What Is an Intelligent Business System?
* Automation vs Intelligent Systems
* Why Businesses Have an Architecture Problem
* The Hidden Cost of Digital Debt
* Why More Software Doesn't Always Make a Business Better

## Client Acquisition

* What Is a Client Acquisition System?
* Lead Generation vs Client Acquisition
* Why Lead Follow-Up Breaks
* LinkedIn Authority vs Prospecting
* Why Targeting Matters More Than Outreach Volume

## Financial Advisory

* How Financial Advisory Firms Can Use AI Without Losing Trust
* What an Intelligent System Looks Like Inside a Financial Advisory Firm
* How Financial Advisors Can Reduce Manual Follow-Up
* What Should a Financial Advisor Website Actually Do?
* The Speed-to-Lead Problem in Financial Advisory

## Websites

* What Should a Small Business Website Include?
* Website vs Business System
* How a Website Becomes the Front Door to a Business
* Why Most Business Websites Don't Help the Business Operate
* What Makes a Website Conversion-Ready?

## DJITT Frameworks

* The Judgement Gap
* The Architecture Gap
* Digital Debt
* The Fidelity Ceiling
* The Resourcefulness Pivot

---

# 28. FINAL ARCHITECTURE

When complete, DJITT should effectively operate like this:

```text
                         DJITT
                           │
                    ┌──────┴──────┐
                    │ FRONT DOOR  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
     SYSTEMS           WEBSITES           KNOWLEDGE
        │                  │                  │
        │                  │          ┌───────┴───────┐
        │                  │          ↓               ↓
        │               Website    INSIGHTS       RESOURCES
        │
        ├── Business Systems
        │
        ├── Client Acquisition
        │       │
        │       ├── LinkedIn
        │       ├── Apollo
        │       ├── Instantly
        │       ├── Ulinc
        │       └── GHL
        │
        ├── Workflow Systems
        │
        ├── AI Systems
        │
        └── Vertical Systems
                           │
                           ↓
                      FRONT DOOR
                           │
                           ↓
                      QUALIFICATION
                           │
                           ↓
                         GHL
                           │
                ┌──────────┴──────────┐
                ↓                     ↓
          AI Systems Audit      Website Service
                │                     │
                ↓                     ↓
        Strategy & Solution       Delivery
```

And wrapped around the whole thing:

```text
SEO
 │
AEO
 │
GEO
 │
LinkedIn
 │
Apollo
 │
Instantly
 │
Ulinc
 │
Content
 │
Resources
 │
Websites
 │
GHL
```

That is the **proper second-generation DJITT website**.

The crucial change from the previous version is that **LinkedIn, Apollo, Instantly, Ulinc and GHL are now explicitly part of the architecture**, while still being deliberately positioned as **components of DJITT's Client Acquisition System rather than the things DJITT sells**.

I would use this as the **master specification**, and then execute it **one VS Code prompt at a time**, starting with the audit.



=================================================================================

# 29. Latest Modifications 

IMPLEMENTATION 2 — VS CODE
DJITT Front Door + Lead 2–7 Pages

The second implementation is deliberately separate.

We are not redesigning the website.

We are extending the existing djitt.co.uk architecture.

The visual principle is:

The Website page becomes the design/template for the other Front Door solution pages.

So Lead 2–7 should feel like they belong to the same family.

STEP 1 — Protect the existing Website page

Before changing anything, make sure:

/websites/

continues working exactly as it does now.

Do not rewrite its existing functionality.

Do not change:

header
navigation
mobile navigation
logo
typography
global styling
footer
existing form behaviour

unless specifically required.

STEP 2 — Create the six solution routes

Create:

/client-acquisition/
/lead-follow-up/
/workflow-operations/
/ai-systems/
/business-systems/
/not-sure/

The existing Website page remains:

/websites/

Therefore:

1 → /websites/
2 → /client-acquisition/
3 → /lead-follow-up/
4 → /workflow-operations/
5 → /ai-systems/
6 → /business-systems/
7 → /not-sure/
STEP 3 — VS Code prompt: create the page architecture

Use this as the first VS Code prompt:

VS Code — Create Lead 2–7 Page Structure

You are working on the existing DJITT website at djitt.co.uk.

Create six new Front Door solution pages:

/client-acquisition/
/lead-follow-up/
/workflow-operations/
/ai-systems/
/business-systems/
/not-sure/

IMPORTANT:
Do NOT redesign the existing website.

Use the existing /websites/ page as the visual and structural template for all six new pages.

The new pages must inherit the existing DJITT:

header
logo
navigation
typography
spacing
buttons
cards
footer
mobile navigation
responsive behaviour
light/clean visual style
existing brand styling

Do not create a new design system.

Do not introduce new colours, fonts, animations or visual effects unless the existing Website page already uses them.

Each page must have:

a clear hero section
a problem statement
an explanation of the DJITT solution
relevant capabilities/services
a simple process section
a clear CTA
the existing DJITT footer

Make the pages responsive across desktop, tablet and mobile.

Do not modify unrelated existing pages.

Before making changes, inspect the current /websites/ page and identify its reusable components, CSS classes, layout structure and responsive rules. Reuse those structures rather than duplicating conflicting CSS.

After implementation, verify that all six URLs load correctly.

STEP 4 — Give each page its own message

The pages should not simply be copies with different titles.

Use the following positioning.

Lead 2 — Client Acquisition

Core problem:

You need a more consistent way to generate and convert opportunities.

Possible system components:

LinkedIn
Apollo
Instantly
Ulinc
SEO
AEO
GEO
Content
Lead capture
CRM
Follow-up

CTA:

Explore Client Acquisition

Lead 3 — Lead Follow-Up

Core problem:

Leads are coming in, but opportunities are being lost between first contact and conversation.

Focus on:

Speed-to-lead
Follow-up
Email
SMS
Appointment booking
Pipeline visibility
Re-engagement

CTA:

Improve Your Follow-Up

Lead 4 — Workflow & Operations

Core problem:

Too much of the business still depends on people remembering and manually moving information between systems.

Focus on:

Workflow automation
CRM
Tasks
Notifications
Internal processes
Client journeys
Operational visibility

CTA:

Improve Your Operations

Lead 5 — AI Systems

Core problem:

AI is available, but the business needs a practical way to integrate intelligence into real workflows.

Focus on:

AI
Knowledge
Content
Workflow intelligence
Decision support
Automation
AI-assisted operations

CTA:

Explore AI Systems

Lead 6 — Business Systems

Core problem:

The business has tools, but they don't necessarily operate as one connected system.

Focus on:

CRM
Marketing
Sales
Operations
Communication
Automation
Data
Integration

CTA:

Connect Your Business Systems

Lead 7 — Not Sure

This should be different.

Don't sell a particular service.

Instead:

Not sure which system you need?

Then:

Tell us what's happening.
We'll help identify where the problem sits.

CTA:

Start the Conversation

This route feeds the existing Advisor Acquisition pipeline.

STEP 5 — VS Code prompt: replicate the Website page

After the routes exist, use:

VS Code — Replicate Website Page Design

Using the existing /websites/ page as the reference implementation, make all six new Front Door solution pages visually consistent with it.

Pages:

/client-acquisition/
/lead-follow-up/
/workflow-operations/
/ai-systems/
/business-systems/
/not-sure/

Requirements:

Reuse the exact existing DJITT header structure.
Reuse the existing DJITT logo treatment.
Reuse the existing navigation structure and mobile navigation.
Reuse the existing typography hierarchy.
Reuse the existing hero layout proportions.
Reuse the existing button styling.
Reuse the existing card/component styling where applicable.
Reuse the existing section spacing and content width.
Reuse the existing footer.
Reuse the existing responsive breakpoints.
Do not create duplicate global CSS rules if existing classes/components can be reused.
Do not alter /websites/ unless a reusable component must be extracted without changing its appearance.
Ensure the mobile navigation remains functional.
Ensure there is no horizontal overflow on mobile.
Ensure every CTA is clickable.
Ensure every page has a unique title and meta description.
Ensure all internal links use the correct DJITT routes.

The objective is that a visitor moving from /websites/ to any of the six solution pages should immediately recognise that they are part of the same DJITT Front Door.

Do not make the pages look like six separate websites.

STEP 6 — Add the actual page content

Then use a separate prompt for the content rather than mixing content and structural changes.

VS Code — Add Lead 2–7 Content

Populate the six DJITT Front Door solution pages with the following positioning.

CLIENT ACQUISITION
URL: /client-acquisition/

Headline direction:
Create a more consistent way to acquire new opportunities.

Explain the problem of relying on disconnected channels and manual prospecting.

Show how DJITT can connect:
LinkedIn
Apollo
Instantly
Ulinc
SEO
AEO
GEO
content
lead capture
CRM
follow-up

Do not turn this into a product catalogue. Present these as components of a client-acquisition system.

CTA:
Explore Client Acquisition

LEAD FOLLOW-UP
URL: /lead-follow-up/

Headline direction:
Turn more enquiries into conversations.

Focus on:
speed-to-lead
follow-up
email
SMS
appointment booking
CRM
re-engagement
pipeline visibility

CTA:
Improve Your Follow-Up

WORKFLOW & OPERATIONS
URL: /workflow-operations/

Headline direction:
Make the business easier to operate.

Focus on:
workflow automation
tasks
notifications
CRM
internal processes
client journeys
operational visibility
systemisation

CTA:
Improve Your Operations

AI SYSTEMS
URL: /ai-systems/

Headline direction:
Put intelligence into the way your business works.

Explain practical AI integration into business workflows.

Focus on:
AI-assisted workflows
knowledge
content
automation
decision support
operational intelligence

Do not lead with hype about AI replacing people.

CTA:
Explore AI Systems

BUSINESS SYSTEMS
URL: /business-systems/

Headline direction:
Connect the systems behind the business.

Focus on:
CRM
marketing
sales
operations
communication
automation
data
integration

Explain that the objective is a connected operating environment rather than another isolated software tool.

CTA:
Connect Your Business Systems

NOT SURE
URL: /not-sure/

Headline direction:
Not sure what your business actually needs?

Do not push a specific solution.

Explain that the visitor can describe the problem and DJITT can help identify the appropriate route.

CTA:
Start the Conversation

IMPORTANT CONTENT RULES:

Keep the tone consistent with the existing DJITT website.

Do not use generic agency hype.

Do not use "most businesses..." style claims.

Do not make unsupported numerical claims.

Do not make financial-product claims.

Do not present DJITT as providing financial advice.

Keep the focus on business problems, systems, trust, efficiency and intelligent operations.

Do not mention these six pages as "Lead 2–7" in the public website copy. Those numbers are internal architecture only.

STEP 7 — Add the Front Door links

Update the existing Front Door/start section so that:

1. Website
      → /websites/

2. Client Acquisition
      → /client-acquisition/

3. Lead Follow-Up
      → /lead-follow-up/

4. Workflow & Operations
      → /workflow-operations/

5. AI Systems
      → /ai-systems/

6. Business Systems
      → /business-systems/

7. Not Sure
      → /not-sure/