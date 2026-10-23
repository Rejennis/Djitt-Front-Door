# Stripe Setup for Operant AI Website

This project supports two payment approaches on Netlify:

1. Stripe Payment Links (fastest)
2. Stripe Checkout via Netlify Functions (recommended)

## Files added for checkout flow

- netlify/functions/create-checkout-session.js
- netlify/functions/stripe-webhook.js
- success.html
- cancel.html
- package.json (adds Stripe SDK dependency)

## Netlify configuration

The Netlify Functions directory is configured in netlify.toml:

- [functions] directory = netlify/functions

## Option A: Stripe Payment Links

Use this when you want the fastest go-live with no backend session creation.

1. Create a payment link in Stripe Dashboard.
2. In script.js set:
   - PAYMENT_CONFIG.mode = 'payment-link'
   - PAYMENT_CONFIG.paymentLink = 'https://buy.stripe.com/your-link'
3. Deploy.

The Pay Discovery Deposit buttons will open your Stripe Payment Link.

## Option B: Stripe Checkout + Netlify Functions

Use this when you want metadata, webhook events, and stronger control.

### Step 1: Create product/price in Stripe

Create a product for the discovery deposit and copy the Price ID.

### Step 2: Add Netlify environment variables

Add these in Netlify Site Settings > Environment variables:

- STRIPE_SECRET_KEY = sk_test_...
- STRIPE_PRICE_ID_DISCOVERY_DEPOSIT = price_...
- SITE_URL = https://your-site.netlify.app
- STRIPE_WEBHOOK_SECRET = whsec_... (for webhook verification)

### Step 3: Keep checkout mode enabled

In script.js keep:

- PAYMENT_CONFIG.mode = 'checkout'
- PAYMENT_CONFIG.checkoutEndpoint = '/.netlify/functions/create-checkout-session'

### Step 4: Configure Stripe webhook endpoint

In Stripe Dashboard > Webhooks, set endpoint URL:

- https://your-site.netlify.app/.netlify/functions/stripe-webhook

Subscribe at minimum to:

- checkout.session.completed

### Step 5: Deploy and test

1. Use test keys first (sk_test / test price ID).
2. Complete a test checkout with Stripe test card numbers.
3. Confirm success.html and cancel.html redirects.
4. Confirm webhook events are received in Stripe dashboard.

## Switching between modes

No backend changes required:

- Payment Links: set PAYMENT_CONFIG.mode to payment-link and set PAYMENT_CONFIG.paymentLink.
- Checkout: set PAYMENT_CONFIG.mode to checkout and keep Netlify env vars configured.

## Notes

- Currency and pricing are controlled in Stripe Price configuration.
- This implementation is compatible with Netlify Free tier for low/early traffic.
- Stripe transaction fees still apply in all modes.
