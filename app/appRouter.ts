import { Hono } from '@hono/hono';
import { logger } from '@hono/hono/logger';
import { serveStatic } from './utils/serveStatic.ts';
import { createMiddleware } from '@hono/hono/factory';
import { LandingPage } from './core/LandingPage/LandingPage.tsx';
import { every } from '@hono/hono/combine';
import { jsxRenderer } from '@hono/hono/jsx-renderer';
import * as z from 'zod';
import { Success } from './core/Success.tsx';
import { join } from '@std/path/join';
import { ensureFile } from '@std/fs/ensure-file';

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

appRouter.post('/', async (c) => {
  const formData = await c.req.formData();

  const email = formData.get('email')?.toString() ?? '';

  const r = z.email({
    pattern: z.regexes.html5Email,
    error: 'Podany email jest nieprawidłowy',
  }).safeParse(email);

  if (r.error) {
    const error = z.flattenError(r.error).formErrors[0];
    return c.render(LandingPage({ emailError: error, email }));
  }

  const filePath = join(Deno.cwd(), 'data', 'emails.txt');

  await ensureFile(filePath);

  const encoder = new TextEncoder();
  const data = encoder.encode(`${email}\n`);

  await Deno.writeFile(filePath, data, { append: true });

  return c.redirect('/success');
});

appRouter.get('/success', (c) => {
  return c.render(Success());
});

declare module '@hono/hono' {
  interface ContextVariableMap {
    isHxRequest: boolean;
    isHxBoosted: boolean;
  }
}
