const DEFAULT_BASE_URL = 'https://services.leadconnectorhq.com';

function safeJsonParse(value) {
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function resolveGhlToken() {
  return normalizeText(process.env.GHL_PRIVATE_INTEGRATION_TOKEN)
    || normalizeText(process.env.GHL_API_KEY)
    || normalizeText(process.env.GHL_TOKEN)
    || '';
}

const GHL_API_VERSION = '2021-07-28';
const GHL_CONTACTS_ENDPOINT = 'https://services.leadconnectorhq.com/contacts/';

function buildGhlHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Version: GHL_API_VERSION
  };

  const token = resolveGhlToken();
  if (!token) return headers;

  headers.Authorization = `Bearer ${token}`;
  return headers;
}

function resolveGhlEndpoint() {
  return normalizeText(process.env.GHL_CONTACTS_ENDPOINT) || GHL_CONTACTS_ENDPOINT;
}

function buildCustomField(envVarName, fallbackKey, value) {
  const normalizedValue = normalizeText(String(value || ''));
  if (!normalizedValue) return null;

  const customFieldId = normalizeText(process.env[envVarName]);

  if (customFieldId) {
    return { id: customFieldId, value: normalizedValue };
  }

  return { key: fallbackKey, value: normalizedValue };
}

function buildGhlPayload(payload) {
  const name = normalizeText(payload.name) || 'New website enquiry';
  const businessName = normalizeText(payload.businessName || payload.companyName || '');
  const phone = normalizeText(payload.phone || payload.mobile || payload.whatsapp || '');
  const email = normalizeText(payload.email || '');
  const businessType = normalizeText(payload.businessType || '');
  const hasWebsite = normalizeText(payload.hasWebsite || '');
  const brief = normalizeText(payload.brief || '');
  const websiteGoal = normalizeText(payload.websiteGoal || '');
  const projectTimeline = normalizeText(payload.projectTimeline || '');

  const parts = name.split(/\s+/);
  const firstName = parts.shift() || 'New';
  const lastName = parts.join(' ');

  const enquiryNotes = [
    brief,
    hasWebsite ? `Existing website status: ${hasWebsite}` : ''
  ].filter(Boolean).join(' | ');

  const customFields = [
    buildCustomField('GHL_WEBSITE_REQUIREMENT_FIELD_ID', 'website_requirement', brief),
    buildCustomField('GHL_WEBSITE_GOAL_FIELD_ID', 'website_goal', websiteGoal),
    buildCustomField('GHL_BUSINESS_TYPE_FIELD_ID', 'business_type_industry', businessType),
    buildCustomField('GHL_PROJECT_TIMELINE_FIELD_ID', 'project_timeline', projectTimeline),
    buildCustomField('GHL_FRONT_DOOR_ROUTE_FIELD_ID', 'djitt_front_door_route', 'Website'),
    buildCustomField('GHL_ENQUIRY_PROJECT_NOTES_FIELD_ID', 'enquiry_project_notes', enquiryNotes)
  ].filter(Boolean);

  const contact = {
    firstName,
    lastName,
    email,
    phone,
    companyName: businessName,
    source: 'DJITT Website',
    customFields
  };

  const ghlLocationId = normalizeText(process.env.GHL_LOCATION_ID);
  if (ghlLocationId) {
    contact.locationId = ghlLocationId;
  }

  return contact;
}

exports.handler = async (event) => {
  console.log('website-leads-submit invoked', { method: event.httpMethod, bodyLength: event.body ? event.body.length : 0 });

  if (event.httpMethod !== 'POST') {
    console.log('website-leads-submit rejected wrong method', event.httpMethod);
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' })
    };
  }

  const payload = safeJsonParse(event.body);
  console.log('website-leads-submit payload', payload);

  if (!normalizeText(payload.name) || !normalizeText(payload.email) || !normalizeText(payload.phone)) {
    console.log('website-leads-submit validation failed', {
      hasName: !!normalizeText(payload.name),
      hasEmail: !!normalizeText(payload.email),
      hasPhone: !!normalizeText(payload.phone)
    });
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Name, email and phone are required.' })
    };
  }

  const privateIntegrationToken = resolveGhlToken();
  const ghlLocationId = normalizeText(process.env.GHL_LOCATION_ID);
  const ghlContactsEndpoint = resolveGhlEndpoint();
  console.log('website-leads-submit GHL config', {
    hasToken: !!privateIntegrationToken,
    hasLocationId: !!ghlLocationId,
    authType: normalizeText(process.env.GHL_AUTH_TYPE),
    endpoint: ghlContactsEndpoint
  });

  if (!privateIntegrationToken || !ghlLocationId) {
    console.log('website-leads-submit no credentials or location configured; returning 202');
    return {
      statusCode: 202,
      body: JSON.stringify({
        ok: true,
        accepted: true,
        queued: false,
        message: 'Website lead accepted locally. GHL API credentials and location ID are not configured yet.'
      })
    };
  }

  try {
    const requestBody = JSON.stringify(buildGhlPayload(payload));
    console.log('website-leads-submit GHL request body', requestBody);

    const response = await fetch(ghlContactsEndpoint, {
      method: 'POST',
      headers: buildGhlHeaders(),
      body: requestBody
    });

    const responseText = await response.text();
    const data = safeJsonParse(responseText);

    if (!response.ok) {
      return {
        statusCode: 502,
        body: JSON.stringify({
          ok: false,
          error: 'Website lead submission failed.',
          details: data || responseText,
          endpoint: ghlContactsEndpoint
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        accepted: true,
        queued: true,
        ghl: data || null,
        endpoint: ghlContactsEndpoint,
        message: 'Website lead sent to GHL.'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: 'Website lead submission error.',
        message: error.message || 'Unknown error'
      })
    };
  }
};
