// Local static server by default. Override with SITE_URL to point at an approved staging/preview URL.
export const siteUrl = (process.env.SITE_URL || 'http://127.0.0.1:4173').replace(/\/+$/, '');
