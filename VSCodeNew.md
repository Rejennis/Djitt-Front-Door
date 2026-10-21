Here is the master **VS Code Implementation Prompt** designed to create and deploy the six new **Front Door Solution Pages (Leads 2–7)** on `djitt.co.uk`. 

This prompt is structured so you can copy and paste it directly into Cursor, GitHub Copilot, or Claude Code in VS Code. It strictly enforces extending your existing Netlify site architecture without altering your current styling, global CSS, or breaking the live `/websites/` page.

---

### **Master VS Code Prompt (Copy & Paste into VS Code)**

```markdown
# TASK: Implement DJITT Front Door Solution Pages (Leads 2–7) on djitt.co.uk

You are acting as an expert web engineer working on the live repository for djitt.co.uk (hosted on Netlify).

## OBJECTIVE
Extend the existing site architecture by creating six new Front Door solution pages based on the design, layout, and component structure of the live `/websites/` page. Do NOT redesign the website, do NOT alter existing global CSS, and do NOT change the functionality of the live `/websites/` route.

---

## STEP 1: ROUTE ARCHITECTURE
Inspect the existing `/websites/` page to extract its reusable layout components, header, footer, navigation, typography, CSS classes, and responsive breakpoints.

Create six new clean routes using the exact design system of `/websites/`:
1. `/client-acquisition/`  (Lead 2)
2. `/lead-follow-up/`      (Lead 3)
3. `/workflow-operations/`  (Lead 4)
4. `/ai-systems/`          (Lead 5)
5. `/business-systems/`    (Lead 6)
6. `/not-sure/`            (Lead 7)

---

## STEP 2: PAGE DESIGN & STRUCTURE CONSTRAINTS
For all six new pages, adhere strictly to these rules:
- **Reuse Existing Components:** Inherit the exact header, logo, mobile drawer navigation, typography hierarchy, hero proportions, button styles, cards, and footer from `/websites/`.
- **Zero Global CSS Contamination:** Do not introduce new global color variables, font families, or custom CSS rules that conflict with existing styles.
- **Responsive Integrity:** Ensure smooth responsive layout across desktop, tablet, and mobile views without horizontal overflow.
- **Component Anatomy:** Each new page must feature:
  - Header & Navigation (existing)
  - Hero section (customized title + subheadline + primary CTA)
  - Problem Statement section
  - DJITT System Capabilities section
  - Process / How It Works section
  - CTA Banner
  - Footer (existing)

---

## STEP 3: SPECIFIC PAGE CONTENT & POSITIONING

### 1. Route: `/client-acquisition/`
- **Hero Headline:** "Create a More Consistent Way to Acquire New Opportunities"
- **Core Problem:** Relying on disconnected channels, manual outreach, and inconsistent prospecting.
- **DJITT System Components:** Show how DJITT connects LinkedIn Sales Navigator, Apollo.io, Instantly, Ulinc, SEO/AEO/GEO content, lead capture, CRM, and automated follow-up into a unified system.
- **CTA Button Text:** "Explore Client Acquisition"

### 2. Route: `/lead-follow-up/`
- **Hero Headline:** "Turn More Enquiries Into Conversations"
- **Core Problem:** Enquiries sit unanswered or fall through the cracks between initial hand-raising and actual meetings.
- **Focus Areas:** 2-minute Speed-to-Lead, multi-channel email/SMS follow-up, automated calendar booking, pipeline visibility, and database re-engagement.
- **CTA Button Text:** "Improve Your Follow-Up"

### 3. Route: `/workflow-operations/`
- **Hero Headline:** "Eliminate Manual Work and Disconnected Data"
- **Core Problem:** Business operations relying on staff memory, post-it notes, "shadow spreadsheets," and manual data transfer.
- **Focus Areas:** Workflow automation, CRM task orchestration, internal notifications, client lifecycle journeys, and operational visibility.
- **CTA Button Text:** "Improve Your Operations"

### 4. Route: `/ai-systems/`
- **Hero Headline:** "Embed Practical Intelligence Into Your Real Workflows"
- **Core Problem:** AI tools are available, but the business lacks a practical way to integrate AI into daily operational workflows without compliance risk.
- **Focus Areas:** AI knowledge bases, content engines, workflow intelligence, decision support, and human-in-the-loop automation.
- **CTA Button Text:** "Explore AI Systems"

### 5. Route: `/business-systems/`
- **Hero Headline:** "Connect Your Disconnected Tools Into One Operating System"
- **Core Problem:** Using multiple isolated subscriptions that don't communicate with each other.
- **Focus Areas:** CRM, marketing, sales pipelines, operations, communications, and data integration unified under one system.
- **CTA Button Text:** "Connect Your Business Systems"

### 6. Route: `/not-sure/`
- **Hero Headline:** "Not Sure Which System You Need? Let's Find Out."
- **Core Framing:** Do not sell a specific software package. Provide a low-friction diagnostic intake where visitors can describe their business operational friction, and DJITT identifies the appropriate solution route.
- **CTA Button Text:** "Start the Conversation"

---

## STEP 4: FORM CAPTURE & GHL INTEGRATION
- Maintain the DOM form capture logic used on `djitt.co.uk`.
- On each page's form submission, pass the hidden field or metadata payload key:
  `DJITT — Front Door Route`
  with the corresponding page slug (e.g., `client-acquisition`, `lead-follow-up`, etc.).
- Ensure form submissions fire the Netlify-to-GoHighLevel DOM script without breaking navigation or page state.

---

## STEP 5: VERIFICATION CHECKLIST
1. Confirm `/websites/` loads and functions identically to before.
2. Verify all six new URLs (`/client-acquisition/`, `/lead-follow-up/`, `/workflow-operations/`, `/ai-systems/`, `/business-systems/`, `/not-sure/`) load cleanly with unique title and meta tags.
3. Check mobile drawer navigation and confirm no horizontal scrollbars exist.
4. Verify every CTA button links correctly to its corresponding form or calendar modal.
```

---

### **Execution Guidelines for Your Build**

1. **Protect `/websites/` First:** Before executing code changes, ensure your local Git working tree is clean and committed so you can diff changes against your original build.
2. **Sequential Prompting:** If your AI assistant in VS Code attempts to generate too much code at once, run the prompt in two phases:
   * **Phase 1 (Structure):** Ask it to set up the 6 solution routes and replicate the component templates from `/websites/`.
   * **Phase 2 (Content & Forms):** Ask it to populate the exact headlines, copy, and GHL hidden form fields (`DJITT — Front Door Route`) for each page.
3. **Form Mapping:** Ensure the form script on each page passes the specific route variable to GoHighLevel so your GHL workflows can route contacts to the correct pipeline automatically.

***

💡 **Next Step:** Would you like me to generate the exact GoHighLevel workflow logic to handle contacts tagged with the new `DJITT — Front Door Route` custom field value?