// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import * as Tracing from '@sentry/tracing';
import prisma from 'lib/prisma';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://8afef69fb4a447f7baf227b3681017ff@o415828.ingest.sentry.io/6761253',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  integrations: [new Tracing.Integrations.Prisma({ client: prisma })],
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
