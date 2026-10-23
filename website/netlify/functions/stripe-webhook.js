const Stripe = require('stripe');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed'
    };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET environment variable.'
      })
    };
  }

  try {
    const stripe = new Stripe(secretKey);
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body || '';

    const stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      console.log('Checkout completed:', {
        id: session.id,
        customerEmail: session.customer_details?.email || '',
        amountTotal: session.amount_total,
        currency: session.currency,
        metadata: session.metadata || {}
      });

      // TODO: Add fulfillment logic here:
      // 1. Send confirmation email
      // 2. Create CRM record
      // 3. Notify Slack/Teams
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Webhook signature verification failed.',
        message: error.message
      })
    };
  }
};
