import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const ENV = process.env.SENTRY_ENV;
const isDev = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: .25,

  //Only enabled on production env
  enabled: !isDev && !!SENTRY_DSN,
  debug: isDev,
  environment: ENV
});
