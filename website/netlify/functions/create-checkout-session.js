const Stripe = require('stripe');

const PLAN_TO_PRICE_ENV = {
  discovery_deposit: 'STRIPE_PRICE_ID_DISCOVERY_DEPOSIT'
};

function getSiteUrl(event) {
  const fromEnv = process.env.SITE_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  const origin = event.headers.origin || event.headers.Origin;
  if (origin) {
    return origin.replace(/\/$/, '');
  }

  return '';
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY environment variable.' })
      };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const payload = JSON.parse(event.body || '{}');
    const plan = payload.plan || 'discovery_deposit';

    const priceEnvName = PLAN_TO_PRICE_ENV[plan];
    const priceId = priceEnvName ? process.env[priceEnvName] : '';
    if (!priceId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Missing price ID for plan: ${plan}` })
      };
    }

    const siteUrl = getSiteUrl(event);
    if (!siteUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SITE_URL is missing and request origin is not available.' })
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel.html`,
      metadata: {
        plan,
        sourcePage: payload.sourcePage || ''
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create Stripe checkout session.',
        message: error.message
      })
    };
  }
};
