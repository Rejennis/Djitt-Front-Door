Yes. For what we are planning now, I would stay on the Netlify Free plan. We do not need to upgrade Netlify just because we're introducing the Front Door, SEO/AEO/GEO, or the GHL API connection.

Netlify's current Free plan includes custom domains with SSL, CDN, deploys, serverless functions, and 300 usage credits per month.

What Free can handle for DJITT
DJITT requirement	Free plan?	Our approach
djitt.co.uk website	✅	Netlify
SEO pages	✅	Netlify/VS Code
AEO content	✅	Netlify/VS Code
GEO content	✅	Netlify/VS Code
Blog/resources	✅	Netlify/VS Code
Front Door	✅	Netlify
Custom domain + SSL	✅	Already have it
GHL API connection	✅	Netlify Function
Front Door → GHL	✅	Function/API
QR-code routes	✅	Netlify redirects/routes
Analytics	✅	Yes, although retention is limited
Multiple pages	✅	No problem
GitHub → Netlify deployment	✅	Yes
Test/preview versions	✅	Unlimited deploy previews
Serverless functions	✅	Yes
AI functionality later	✅*	Depends on usage

Netlify explicitly lists Functions as available on all plans.

The important thing: Free isn't "too basic"

For our current stage, the Netlify Free plan is actually a very good fit.

We're not trying to build:

Netflix + Amazon + ChatGPT on Netlify.

We're building:

A high-performance business website with an intelligent lead-entry experience connected to GHL.

That's relatively lightweight.

For example, imagine we eventually have:

10,000 Front Door submissions/month.

Each submission might invoke one or a few small serverless functions. That's a very different workload from running a large AI application continuously.

The current credit system measures things such as compute, bandwidth and web requests, and the Free plan has a hard 300-credit monthly limit. If the limit is reached, projects pause until the next billing cycle.

So we monitor usage rather than upgrading pre-emptively.

What I would NOT put on Netlify

This is just as important.

I wouldn't turn Netlify into the DJITT CRM.

Don't put:

contacts
opportunities
sales pipelines
appointment records
SMS conversations
email conversations
sales workflows
client history

there.

That's what GHL is already doing extremely well.

So our architecture remains:

                 DJITT.CO.UK
                     │
                  NETLIFY
                     │
        ┌────────────┼─────────────┐
        │            │             │
       SEO          AEO           GEO
        │            │             │
        └────────────┼─────────────┘
                     │
              FRONT DOOR
                     │
                     ▼
             NETLIFY FUNCTION
                     │
                 GHL API
                     │
                     ▼
                  GHL CRM
                     │
              ┌──────┴──────┐
              │             │
           Pipeline      Workflows
              │             │
              └──────┬──────┘
                     │
                 App.djitt.co.uk
And there's another reason I like Free for this

We are still building the architecture.

We don't know yet:

how much traffic DJITT will receive
how many Front Door submissions we'll get
how frequently we'll deploy
how much function compute we'll consume
whether we'll eventually use AI directly inside the Front Door
whether we'll build multiple vertical Front Doors

So it would be premature to pay for infrastructure we aren't yet using.

Netlify's own guidance describes Free as suitable for smaller experiments and low-traffic projects, while Personal/Pro are for growing traffic and higher usage.

One thing I would change from my previous recommendation

I wouldn't immediately build the Netlify Function → GHL API bridge.

I'd build the Front Door in two stages.

Stage 1 — Front Door UI

Build everything in VS Code:

djitt.co.uk/front-door

Get the:

design
questions
progress
recommendation logic
mobile experience
CTA
SEO
analytics
tracking parameters

working first.

Stage 2 — Connect GHL

Then connect:

Front Door
     ↓
Netlify Function
     ↓
GHL API
     ↓
Contact
     ↓
Front Door Pipeline
     ↓
Workflow

That keeps the project manageable.

And here's the really exciting part

We don't need to rebuild your existing DJITT website in GHL.

Your existing decision to have:

Netlify = front end

and

app.djitt.co.uk = GHL

was actually the right architectural decision.

We're simply going to extend it.

The difference is that instead of:

Netlify website → click → GHL

we can eventually have:

Netlify website → intelligent interaction → invisible API → GHL

while the customer remains on djitt.co.uk.

That is a much more professional architecture for what DJITT is becoming.

My recommendation

Stay on Free for now. Don't upgrade.

Let's build the SEO/AEO/GEO + Front Door architecture in VS Code on your existing Netlify account, and only introduce the GHL API bridge when the Front Door UI is working.

When usage eventually justifies it, moving from Free to Personal/Pro is an infrastructure decision—not something we need to design around today.

In other words:

Don't let Netlify's Free plan slow down the DJITT build. It is more than capable of getting us through the architecture, SEO/AEO/GEO implementation, Front Door MVP, and initial customer acquisition phase.

Ad
do we nned to change the anything in the DJITT advisor acquisition pipeline on app.djitt.co.uk 

No — I would not change the existing DJITT Advisor Acquisition pipeline yet.

In fact, I think keeping it untouched is the safest and cleanest approach.

The distinction is:

DJITT FRONT DOOR
       │
       ▼
Front Door Pipeline
       │
       │ qualified financial adviser
       ▼
DJITT ADVISOR ACQUISITION
       │
       ▼
AI Systems Audit
       │
       ▼
Strategy & Solution
       │
       ▼
Won / Implementation
Your existing Advisor Acquisition pipeline remains the sales pipeline

The pipeline we've already built on app.djitt.co.uk is specifically designed for the financial-adviser acquisition process.

We shouldn't dilute it by suddenly making it responsible for:

property businesses
other professional services
generic DJITT visitors
Front Door enquiries
SEO leads
QR visitors
general enquiries

That's exactly why a separate Front Door pipeline makes sense.

What changes?

Very little.

Existing

DJITT Advisor Acquisition

continues to handle:

New Advisor Lead
      ↓
Qualified
      ↓
Discovery / Audit
      ↓
AI Systems Audit
      ↓
Strategy & Solution
      ↓
Proposal
      ↓
Won / Lost

We keep the workflows we've already built around that pipeline.

New

We create:

DJITT Front Door

pipeline.

Its job is simply to determine:

Who has entered DJITT, what do they need, and where should they go next?

For example:

NEW
 ↓
IDENTIFIED
 ↓
QUALIFIED
 ↓
ROUTED

That's enough initially.

The important connection

The Front Door should not duplicate the Advisor Acquisition process.

Instead, when the Front Door identifies:

Financial Adviser + qualified opportunity

we move/create the opportunity in the Advisor Acquisition pipeline.

Conceptually:

                    DJITT.CO.UK
                         │
                    FRONT DOOR
                         │
                "What do you need?"
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
          Financial    Property    Other
           Adviser
              │
              ▼
       ADVISOR ACQUISITION
              │
              ▼
        AI SYSTEMS AUDIT
              │
              ▼
       STRATEGY & SOLUTION
              │
              ▼
             WON

This is routing, not rebuilding.

Why this is particularly important for us

We've already spent considerable effort creating the DJITT Advisor Acquisition state machine.

You have:

the pipeline
stages
workflows
appointment handling
no-show/cancellation logic
proposal/won/lost logic
internal notifications
tasks
the calendar structure

We don't want the SEO/AEO/GEO project to destabilise that.

So the rule should be:

The Front Door feeds the existing Advisor Acquisition machine; it does not modify the machine unnecessarily.

There is one thing we WILL eventually need

We need a handoff mechanism.

Something like:

Front Door
    │
    │
    ├── Financial Adviser
    │        ↓
    │   Advisor Acquisition
    │
    ├── Property
    │        ↓
    │   Future Property System
    │
    └── Other
             ↓
        General DJITT

That handoff can eventually be handled by:

Netlify → GHL API → routing logic → appropriate pipeline.

But we don't need to build that today.

Therefore, I would freeze the existing pipeline

This is actually a good moment to establish an architectural rule:

🔒 Advisor Acquisition Pipeline

Stable / production system

Don't modify unless a genuine advisor-sales requirement emerges.

🆕 Front Door Pipeline

New acquisition/qualification layer

Build this around the new Netlify Front Door.

🌐 Netlify

Public digital layer

SEO + AEO + GEO + content + Front Door.

⚙️ GHL

CRM + automation + sales operating system

So no, don't go into app.djitt.co.uk and start changing the Advisor Acquisition pipeline because of the SEO/AEO/GEO project.

I'd actually consider the existing Advisor Acquisition system our first completed vertical operating system.

The Front Door is now the layer above it.

That gives us a very clean architecture:

DJITT Front Door → Financial Adviser System → Advisor Acquisition Pipeline → Delivery

And when we eventually add property:

DJITT Front Door → Property System → Property Pipeline

without touching the financial-adviser system.

That is exactly the kind of modular architecture we want for the DJITT Vertical Systems Lab.

what will change on the djitt.co.uk now

The biggest change is not that we need to replace djitt.co.uk. It is that we should turn it from mainly a marketing website into the public intelligence and acquisition layer for DJITT.

And I would do this without disturbing app.djitt.co.uk or the existing Advisor Acquisition pipeline.

Google's current guidance actually reinforces this architecture: the fundamentals of SEO remain the foundation for AI search, and Google specifically recommends crawlable pages, clear technical structure, internal linking, useful text, good page experience and genuinely valuable content. There is no separate "AI markup" we need to bolt on.

What changes on djitt.co.uk

I would think of the new site as:

                         DJITT.CO.UK
                              │
              ┌───────────────┼────────────────┐
              │               │                │
           AUTHORITY       DISCOVERY         ENTRY
              │               │                │
        Who is DJITT?      SEO/AEO/GEO     Front Door
        What do we do?     Resources       Qualification
        Who do we help?    Insights        Routing
              │               │                │
              └───────────────┼────────────────┘
                              │
                              ▼
                         GHL / CRM
                              │
               ┌──────────────┴──────────────┐
               │                             │
        Advisor System                 Future Systems
               │                             │
       Advisor Acquisition             Other Verticals
1. The homepage becomes clearer

I wouldn't make the homepage a giant explanation of everything DJITT does.

It should establish:

DJITT = intelligent business systems for service businesses, beginning with financial advisers.

Something along the lines of:

Build an intelligent business.

DJITT helps financial advisers and other trust-based businesses build intelligent systems that improve how they attract, qualify, convert and serve clients.

Then introduce the DJITT philosophy:

STRATEGY | SYSTEMS | INTELLIGENCE | TRUST

And importantly:

[Enter the DJITT Front Door]

2. /front-door/ becomes a first-class page

This is the major new component.

djitt.co.uk/front-door/

It isn't just a contact form.

It's an interactive diagnostic/route into DJITT.

For example:

Where should DJITT start with your business?

Then the visitor answers a handful of questions.

The Front Door determines:

business type
business problem
growth objective
digital maturity
potential DJITT pathway

And eventually:

Your recommended DJITT starting point

That is where the Netlify-built experience becomes much more valuable than a GHL drag-and-drop form.

3. We need proper vertical landing pages

The first one should be:

djitt.co.uk/financial-advisers/

This becomes the SEO/AEO/GEO authority page for the ICP we are currently targeting.

It should explain:

the problems financial advisers face
lead response
manual administration
fragmented systems
client acquisition
intelligent workflows
AI systems
digital front door
trust
compliance-aware implementation

But not financial-product advice.

This is where our existing DJITT positioning becomes important:

We don't teach financial advice. We help financial advisers build intelligent businesses.

4. Then create the conceptual authority pages

I'd add:

/digital-front-door/
/ai-systems/
/business-automation/
/intelligent-business-systems/

But we don't need to create all of these immediately.

The first few should answer questions people and AI systems can understand.

For example:

/digital-front-door/

"What is a digital front door for a business?"

/ai-systems/

"What is an AI business system?"

/financial-advisers/

"How can financial advisers use intelligent systems?"

/business-automation/

"What should a service business automate?"

These aren't merely keyword pages.

They become DJITT's intellectual territory.

Google specifically says useful, original, non-commodity content and clear organisation are important for visibility in generative search.

5. The Resources/Insights architecture becomes much more important

I'd create:

djitt.co.uk/resources/

and:

djitt.co.uk/insights/

Then our articles live underneath those.

For example:

/resources/what-is-a-digital-front-door/
/resources/ai-systems-for-financial-advisers/
/resources/how-fast-should-a-business-respond-to-a-lead/
/resources/what-should-financial-advisers-automate/

/insights/the-judgement-gap/
/insights/the-architecture-gap/
/insights/digital-debt/
/insights/the-fidelity-ceiling/

This is where our DJITT mental models become a serious differentiator.

Instead of producing endless generic:

"10 Ways AI Can Help Your Business"

content, we're creating DJITT-owned concepts.

That's much more consistent with Google's current emphasis on original, experience-based, non-commodity content.

6. The navigation changes

I would eventually move toward something like:

DJITT

Solutions
    Financial Advisers
    Intelligent Business Systems
    Digital Front Door

How DJITT Works
    Strategy
    Systems
    Intelligence
    Trust

Front Door
    Find Your Starting Point

Insights
    Resources
    DJITT Models

About

But we don't have to make the navigation complicated.

The important thing is that Front Door gets a prominent position.

7. The website becomes the SEO/AEO/GEO engine

This is the biggest change.

Previously:

"Let's add SEO to the DJITT website."

Now:

"Let's architect DJITT.co.uk so search engines and AI systems can understand DJITT."

That means every important page has:

proper title
meta description
H1/H2 structure
clean URL
internal links
canonical URL
Open Graph data
appropriate schema
crawlable text
strong page experience
useful supporting content

Google explicitly says important content should be available in textual form and that internal linking and crawlability matter for AI search as well as traditional search.

8. Netlify gives us the freedom to build this properly

This is why I'm now leaning strongly toward VS Code + Netlify rather than building the public experience in GHL.

Netlify supports custom domains, routing, redirects and rewrites, so we can create clean URLs such as:

djitt.co.uk/front-door/
djitt.co.uk/financial-advisers/
djitt.co.uk/resources/...
djitt.co.uk/insights/...

without making GHL the website architecture.

9. The existing CTA architecture changes

Instead of every page saying:

Book a Call

we can have different levels of commitment.

Low commitment

Explore DJITT

↓

Medium commitment

Enter the DJITT Front Door

↓

High commitment

Book an AI Systems Audit

That gives us a much better acquisition ladder:

Visitor
   ↓
Content
   ↓
Interest
   ↓
Front Door
   ↓
Qualification
   ↓
Recommendation
   ↓
GHL
   ↓
AI Systems Audit
   ↓
Strategy & Solution

And this is where our existing Advisor Acquisition system comes in.

10. What does NOT change

This is equally important.

We don't replace:

app.djitt.co.uk

It remains the GHL operating environment.

We don't rebuild:

DJITT Advisor Acquisition

It remains the financial-adviser sales machine.

We don't throw away:

the existing calendars

They continue doing their jobs.

We don't replace:

GHL workflows

They continue managing the operational state machine.

We don't move:

CRM data

GHL remains the system of record.

11. The final architecture becomes very clean

I'd now define DJITT like this:

                         THE INTERNET
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       GOOGLE             AI SEARCH           LINKEDIN
          │             ChatGPT/Perplexity        │
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                       DJITT.CO.UK
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
    CONTENT               AUTHORITY              FRONT DOOR
       │                      │                      │
    SEO/AEO/GEO          DJITT Models          Qualification
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              ▼
                           GHL CRM
                              │
                  ┌───────────┴───────────┐
                  ▼                       ▼
          ADVISOR ACQUISITION       FUTURE VERTICALS
                  │
                  ▼
          AI SYSTEMS AUDIT
                  │
                  ▼
         STRATEGY & SOLUTION
                  │
                  ▼
             IMPLEMENT
So I wouldn't "redesign the website" yet

I'd do something more deliberate:

Step 1: Audit the current djitt.co.uk.

Step 2: Decide which existing pages stay, change, merge or disappear.

Step 3: Design the new information architecture.

Step 4: Build the Front Door architecture.

Step 5: Build the SEO/AEO/GEO foundation.

Step 6: Connect the Front Door to GHL.

Step 7: Start publishing the first authority cluster.

And crucially, we should do Steps 1–3 before writing the new site, because I don't want us blindly rebuilding pages that already exist or accidentally destroying whatever search equity the current site has.

The result should not feel like "DJITT has added SEO."

It should feel like:

DJITT.co.uk has become the digital front office of DJITT — discoverable by search, understandable by AI, useful to humans, and connected directly to the operating system in GHL.

=================================================

Yes. **I would handle the WhatsApp Marketplace website-only leads as a separate acquisition path, but still bring them into the new DJITT architecture.**

The key is: **don't make the Marketplace visitor go through the full DJITT Front Door.** They already know what they want.

They are saying:

> "I need a website."

So give them a very direct page designed specifically for that intent.

# I would create `/websites/`

Your WhatsApp/SME Marketplace offer should point to:

**`djitt.co.uk/websites/`**

Not `/front-door/`.

Think of the two pages differently:

```text
                         DJITT.CO.UK
                              │
             ┌────────────────┴────────────────┐
             │                                 │
       BUSINESS DISCOVERY                 WEBSITE BUYERS
             │                                 │
       /front-door/                       /websites/
             │                                 │
       "What do you need?"               "I need a website"
             │                                 │
       Future verticals                  Website Service
```

That separation is important.

---

# `/websites/` becomes your immediate cash-flow offer

While we're building the larger DJITT systems business, we can use the website service to generate actual customers **now**.

The page should not talk heavily about:

* AI systems
* AEO
* GEO
* financial advisers
* complex automation
* Vertical Systems Lab

Instead, it should answer one question:

> **"Can DJITT build me a professional website quickly and affordably?"**

---

# The page should visually sell the result

This connects directly to what we were doing with the WhatsApp flyer.

Someone sees:

> **Is your business invisible online?**

Then:

> **Get a professional website built for your business.**

And immediately sees examples of the types of websites we can produce.

For example:

```text
              DJITT WEBSITE FACTORY

       Professional websites for small businesses

 ┌──────────┐ ┌──────────┐ ┌──────────┐
 │ PLUMBER  │ │ ACCOUNTANT│ │ BUILDER │
 │          │ │           │ │         │
 │ Website  │ │ Website   │ │ Website │
 └──────────┘ └──────────┘ └──────────┘

 ┌──────────┐ ┌──────────┐ ┌──────────┐
 │ SALON    │ │ RESTAURANT│ │ PROPERTY │
 │          │ │           │ │          │
 │ Website  │ │ Website   │ │ Website  │
 └──────────┘ └──────────┘ └──────────┘
```

The visitor should think:

> **"I want one of those."**

That's much stronger than explaining the technology.

---

# The CTA should be simple

I'd have:

### **Get Your Website**

Then collect perhaps:

1. Name
2. Business name
3. WhatsApp/mobile
4. Email
5. Business type
6. Do you already have a website?
7. What do you need?

Then:

**Request Your Website**

That's enough.

We don't need a 10-question diagnostic.

---

# And this is where GHL comes in

The architecture becomes:

```text
WhatsApp Marketplace
       │
       ▼
djitt.co.uk/websites/
       │
       ▼
Website enquiry
       │
       ▼
GHL
       │
       ▼
Website Leads pipeline
       │
       ▼
Contact / WhatsApp
       │
       ▼
Website sale
```

I would create a **separate Website Leads pipeline** in GHL.

Not the Advisor Acquisition pipeline.

---

# So we now have three layers of acquisition

This is becoming quite elegant.

### 1. Website Service

For immediate SME demand:

```text
WhatsApp
Facebook groups
SME marketplaces
Flyers
QR codes
Referrals

       ↓

/websites/

       ↓

Website Leads
```

### 2. DJITT Front Door

For people who are interested in DJITT more broadly:

```text
Google
AI search
LinkedIn
YouTube
Content
Organic traffic

       ↓

/front-door/

       ↓

DJITT Front Door
```

### 3. Financial Adviser acquisition

Once someone is identified as a suitable adviser:

```text
Front Door
      ↓
Financial Adviser
      ↓
Advisor Acquisition
      ↓
AI Systems Audit
      ↓
Strategy & Solution
```

---

# And there is a very important strategic benefit

The **website-only service does not compete with the DJITT positioning**.

It actually becomes the **entry-level service**.

Think of the progression:

```text
                  DJITT
                    │
        ┌───────────┴───────────┐
        │                       │
   WEBSITE SERVICE          DJITT SYSTEMS
        │                       │
   Small business          Established business
        │                       │
   Website                  Front Door
        │                       │
   Leads                    Automation
        │                       │
   Visibility               Intelligence
                                │
                           AI Systems
```

Some website customers will remain website customers.

But some will eventually say:

> "Can you also help me get leads?"

Then:

> "Can you automate the follow-up?"

Then:

> "Can you connect everything?"

**That's when DJITT's higher-value system offering becomes relevant.**

We don't have to sell it immediately.

---

# This also gives us an excellent SEO opportunity

`/websites/` can eventually become its own content cluster:

```text
/websites/
│
├── /small-business-websites/
├── /business-website-design/
├── /professional-business-websites/
├── /website-design-for-trades/
├── /website-design-for-consultants/
├── /website-design-for-local-businesses/
│
└── /resources/
      ├── why-your-business-needs-a-website/
      ├── what-should-a-business-website-cost/
      ├── what-makes-a-good-business-website/
      └── website-vs-facebook-page/
```

But **we don't build all of those now**.

The first page is simply:

# `djitt.co.uk/websites/`

And it is built specifically to convert the traffic we're already getting from WhatsApp Marketplace.

Netlify is ideal for this because we can create a clean `/websites/` route without needing another GHL funnel. Netlify supports clean routing, redirects and rewrites directly at the site level. ([Netlify Docs][1])

---

# One more thing: don't call it "DJITT Front Door"

This is important.

For someone in a WhatsApp SME group who says:

> "Anyone know someone who can build a website?"

**"DJITT Front Door" means nothing to them.**

Instead:

### WhatsApp message

> **Need a professional website for your business?**

### Landing page

> **Your business deserves a professional website.**

### CTA

> **Get My Website**

Then DJITT branding is visible underneath.

---

# So I would now structure `djitt.co.uk` like this

```text
DJITT.CO.UK
│
├── /
│     DJITT main brand
│
├── /websites/
│     ⭐ SME Website Service
│
├── /front-door/
│     ⭐ DJITT intelligent entry
│
├── /financial-advisers/
│     ⭐ Current ICP
│
├── /ai-systems/
│
├── /digital-front-door/
│
├── /resources/
│
└── /insights/
```

And the traffic paths are:

```text
WhatsApp Marketplace
       │
       ▼
   /websites/
       │
       ▼
 Website Pipeline
       │
       ▼
   Website Client
```

while:

```text
Google / AI / LinkedIn
       │
       ▼
 /front-door/
       │
       ▼
 Front Door Pipeline
       │
       ▼
 Appropriate DJITT System
```

and:

```text
Front Door
    │
    ▼
Financial Adviser
    │
    ▼
Advisor Acquisition
```

## This is actually the best way to reconcile the two things we're building.

**We don't have to wait until the full DJITT SEO/AEO/GEO + Front Door system is finished before selling websites.**

We build `/websites/` as the **first commercial landing page on the new Netlify architecture**, use it immediately for WhatsApp/SME Marketplace traffic, and then build the broader DJITT authority architecture around it.

That means the work we're doing now can start producing customers **while the bigger DJITT machine is being built**.

[1]: https://docs.netlify.com/manage/routing/redirects/overview/?utm_source=chatgpt.com "Redirects and rewrites | Netlify Docs"
