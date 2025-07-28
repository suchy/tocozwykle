import { Hono } from '@hono/hono';
import { logger } from '@hono/hono/logger';
import { serveStatic } from './utils/serveStatic.ts';
import { createMiddleware } from '@hono/hono/factory';
import { LandingPage } from './core/LandingPage/LandingPage.tsx';
import { every } from '@hono/hono/combine';
import { jsxRenderer } from '@hono/hono/jsx-renderer';

const setHxVariables = createMiddleware(async (c, next) => {
  c.set('isHxRequest', c.req.header('HX-Request')?.toLowerCase() === 'true');
  c.set('isHxBoosted', c.req.header('HX-Boosted')?.toLowerCase() === 'true');

  await next();
});

const triggerAfterRedirect = createMiddleware(async (c, next) => {
  const triggerAfterRedirect = c.req.raw.headers.get('TriggerAfterRedirect');

  if (triggerAfterRedirect) {
    c.header('HX-Trigger', triggerAfterRedirect);
  }

  await next();
});

const middlewares = every(
  setHxVariables,
  triggerAfterRedirect,
  jsxRenderer(),
);

export const appRouter = new Hono();

appRouter.use(logger());

appRouter.use(
  '/static/*',
  serveStatic({
    fingerprintedCacheControl: 'public, max-age=31536000, immutable',
    cacheControl: 'public, max-age=3600',
  }),
);

appRouter.use(middlewares);

appRouter.get('/', (c) => c.render(LandingPage()));

declare module '@hono/hono' {
  interface ContextVariableMap {
    isHxRequest: boolean;
    isHxBoosted: boolean;
  }
}
