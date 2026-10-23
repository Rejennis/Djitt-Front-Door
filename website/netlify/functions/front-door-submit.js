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

function buildGhlHeaders(authTypeOverride) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const token = resolveGhlToken();
  if (!token) return headers;

  const authType = normalizeText(authTypeOverride || process.env.GHL_AUTH_TYPE).toLowerCase();

  if (authType === 'x-api-key') {
    headers['X-API-Key'] = token;
    return headers;
  }

  headers.Authorization = `Bearer ${token}`;
  return headers;
}

function resolveGhlEndpoints() {
  const envEndpoint = normalizeText(process.env.GHL_CONTACTS_ENDPOINT);
  const customCandidates = envEndpoint ? [envEndpoint] : [];

  const baseUrls = [
    normalizeText(process.env.GHL_API_BASE_URL),
    'https://services.leadconnectorhq.com',
    'https://api.leadconnectorhq.com'
  ].filter(Boolean).map((baseUrl) => baseUrl.replace(/\/+$/, ''));

  const defaultCandidates = [...new Set(baseUrls.map((baseUrl) => `${baseUrl}/contacts`))];

  return [...new Set([...customCandidates, ...defaultCandidates])];
}

function buildGhlPayload(payload) {
  const fullName = normalizeText(payload.name) || 'New lead';
  const email = normalizeText(payload.email);
  const firm = normalizeText(payload.firm || payload.companyName || payload.company || '');
  const phone = normalizeText(payload.phone || payload.mobile || payload.whatsapp || '');
  const website = normalizeText(payload.website || '');
  const challenge = normalizeText(payload.challenge || '');
  const firmType = normalizeText(payload['firm-type'] || payload.firmType || '');
  const priority = normalizeText(payload.priority || '');
  const sourcePage = normalizeText(payload.sourcePage || '');

  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts.shift() || 'New';
  const lastName = nameParts.join(' ');

  const customFields = [
    { key: 'challenge', value: challenge },
    { key: 'firm_type', value: firmType },
    { key: 'priority', value: priority },
    { key: 'source', value: 'DJITT Front Door' },
    { key: 'submission_type', value: 'front_door' },
    { key: 'source_page', value: sourcePage }
  ].filter(field => field.value && String(field.value).trim() !== '');

  const contact = {
    firstName,
    lastName,
    email,
    companyName: firm,
    phone,
    website,
    source: 'DJITT Front Door',
    customFields
  };

  const ghlLocationId = normalizeText(process.env.GHL_LOCATION_ID);
  if (ghlLocationId) {
    contact.locationId = ghlLocationId;
  }

  if (process.env.GHL_PIPELINE_ID || process.env.GHL_PIPELINE_NAME) {
    contact.pipelineId = process.env.GHL_PIPELINE_ID || undefined;
    contact.pipelineName = process.env.GHL_PIPELINE_NAME || undefined;
  }

  return contact;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' })
    };
  }

  const payload = safeJsonParse(event.body);

  if (!normalizeText(payload.name) || !normalizeText(payload.email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Name and email are required.' })
    };
  }

  const ghlLocationId = normalizeText(process.env.GHL_LOCATION_ID);
  const ghlBaseUrl = process.env.GHL_API_BASE_URL || DEFAULT_BASE_URL;
  const privateIntegrationToken = resolveGhlToken();

  if (!privateIntegrationToken || !ghlLocationId) {
    return {
      statusCode: 202,
      body: JSON.stringify({
        ok: true,
        accepted: true,
        queued: false,
        message: 'Front Door submission accepted locally. GHL API credentials and location ID are not configured yet.'
      })
    };
  }

  try {
    const ghlPayload = buildGhlPayload(payload);
    const ghlContactsEndpoints = resolveGhlEndpoints();
    let lastError = null;
    let finalResponse = null;
    let finalData = null;
    let finalEndpoint = null;

    for (const endpoint of ghlContactsEndpoints) {
      const authTypesToTry = [normalizeText(process.env.GHL_AUTH_TYPE), 'bearer', 'x-api-key'];

      for (const authType of [...new Set(authTypesToTry.filter(Boolean))]) {
        try {
          console.log('front-door-submit trying endpoint', { endpoint, authType });
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: buildGhlHeaders(authType),
            body: JSON.stringify(ghlPayload)
          });

          const responseText = await response.text();
          const data = safeJsonParse(responseText);
          console.log('front-door-submit GHL response', { endpoint, authType, status: response.status, ok: response.ok, responseText });

          finalResponse = response;
          finalData = data;
          finalEndpoint = endpoint;

          if (response.ok) {
            return {
              statusCode: 200,
              body: JSON.stringify({
                ok: true,
                accepted: true,
                queued: true,
                ghl: data || null,
                locationId: ghlLocationId || null,
                endpoint,
                message: 'Front Door submission sent to GHL.'
              })
            };
          }

          if (response.status !== 404 && response.status !== 401 && response.status !== 403) {
            return {
              statusCode: 502,
              body: JSON.stringify({
                ok: false,
                error: 'GHL submission failed.',
                details: data || responseText,
                locationId: ghlLocationId || null,
                endpoint
              })
            };
          }

          lastError = {
            status: response.status,
            body: data || responseText,
            endpoint,
            authType,
            hint: response.status === 404
              ? 'GHL returned 404. Verify that GHL_LOCATION_ID belongs to the correct account/location and that the contact endpoint is enabled for this integration.'
              : 'GHL rejected the request. Check the integration token, auth type, and location permissions.'
          };
        } catch (error) {
          lastError = { message: error.message || 'Unknown error', endpoint, authType };
        }
      }
    }

    if (lastError && (lastError.status === 404 || lastError.status === 401 || lastError.status === 403)) {
      return {
        statusCode: 202,
        body: JSON.stringify({
          ok: true,
          accepted: true,
          queued: false,
          message: 'Front Door submission accepted locally. GHL rejected the configured location/token or endpoint, so the page stays live while the integration is corrected.',
          details: finalData || lastError,
          locationId: ghlLocationId || null,
          endpoint: finalEndpoint || ghlContactsEndpoints[0],
          attemptedEndpoints: ghlContactsEndpoints
        })
      };
    }

    return {
      statusCode: 502,
      body: JSON.stringify({
        ok: false,
        error: 'GHL submission failed.',
        details: finalData || lastError || 'No endpoint responded successfully',
        locationId: ghlLocationId || null,
        endpoint: finalEndpoint || ghlContactsEndpoints[0],
        attemptedEndpoints: ghlContactsEndpoints
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: 'Front Door submission error.',
        message: error.message || 'Unknown error'
      })
    };
  }
};
