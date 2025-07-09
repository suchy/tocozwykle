import { Hono } from '@hono/hono';
import { logger } from '@hono/hono/logger';
import { serveStatic } from './utils/serveStatic.ts';

export const appRouter = new Hono<
  {
    Variables: {
      isHxRequest: boolean;
      isHxBoosted: boolean;
    };
  }
>();

appRouter.use(logger());

appRouter.use(
  '/static/*',
  serveStatic({
    fingerprintedCacheControl: 'public, max-age=31536000, immutable',
    cacheControl: 'public, max-age=3600',
  }),
);

appRouter.get('/', (c) => c.html('Hello world!!!'));
