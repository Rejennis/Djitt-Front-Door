# Final deployment setup for the DJITT Front Door and Website Leads

This is the production-ready architecture the site is meant to use:

- Netlify hosts the public website and form endpoints
- the Front Door captures discovery and qualification leads
- the Website Leads path captures direct SME website service enquiries
- both Netlify functions forward to GHL when credentials are configured
- the existing DJITT Advisor Acquisition pipeline remains unchanged

---

## 1) Netlify environment variables to add

In Netlify, open Site configuration → Environment variables and add these values for the live site:

```bash
GHL_API_KEY=your_gohighlevel_api_key
GHL_AUTH_TYPE=bearer
GHL_API_BASE_URL=https://services.leadconnectorhq.com
GHL_CONTACTS_ENDPOINT=https://services.leadconnectorhq.com/contacts/
GHL_LOCATION_ID=your_location_id
GHL_PIPELINE_NAME=Front Door Pipeline
GHL_PIPELINE_ID=your_front_door_pipeline_id
```

Then set the website service pipeline name separately if you want to keep the source labels distinct:

```bash
WEBSITE_LEADS_PIPELINE_NAME=Website Leads Pipeline
WEBSITE_LEADS_PIPELINE_ID=your_website_leads_pipeline_id
```

If your GHL setup requires a different auth convention, use:

```bash
GHL_AUTH_TYPE=x-api-key
```

and keep the same API key value provided by GHL.

---

## 2) GHL pipeline structure

Create these pipelines in GHL, and do not mix them into the current advisory sales flow:

- Front Door Pipeline
- Website Leads Pipeline
- leave DJITT Advisor Acquisition unchanged

This preserves the architecture and ensures the general discovery funnel and the direct website sales offer remain operationally separate.

---

## 3) Production flow

The live site should behave like this:

1. Visitor lands on the public site on Netlify
2. Visitor submits on either the Front Door or the direct Website Leads page
3. The browser posts to the matching Netlify Function
4. The Netlify Function builds the GHL payload
5. The request is sent to the GHL contacts endpoint
6. The lead appears in the correct GHL pipeline

If credentials are missing, the Netlify Function intentionally returns a safe 202 response instead of failing the page. This keeps the site live and prevents a broken production deployment.

---

## 4) Route mapping

- public site home: root website
- Front Door: website/front-door.html
- Website service offer: website/websites/index.html
- shared frontend logic: website/script.js
- Front Door function: website/netlify/functions/front-door-submit.js
- Website Leads function: website/netlify/functions/website-leads-submit.js

---

## 5) Technical implementation notes

The site is already coded to do the following:

- Front Door form posts to the Front Door Netlify Function
- Website Leads form posts to the Website Leads Netlify Function
- each function sends a JSON payload to the GHL contacts endpoint
- both functions include a staging-safe fallback when GHL API credentials are absent

---

## 6) Verified staging status

Fresh local validation showed the system is functioning in staging-safe mode:

- Front Door submission returned STATUS 202
- Website Leads submission returned STATUS 202
- the messages clearly state that GHL API credentials are not configured yet

This confirms the architecture is valid and ready for production activation once the live GHL values are added to Netlify.

---

## 7) Final recommendation

Do not route either Front Door or Website Leads into the existing Advisor Acquisition pipeline. Keep the current advisor flow dedicated to advisory acquisition only, and let the new Front Door and Website Leads pipelines manage fresh marketing and service enquiries.

That is the correct deployment pattern for the DJITT site and preserves the intended operational separation.
