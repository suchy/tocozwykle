import { Context } from '@hono/hono';

export function redirect(
  c: Context,
  path: string,
  eventToTrigger?: Record<string, unknown>,
  status = 302,
) {
  if (c.var.isHxRequest) {
    const headers = eventToTrigger
      ? { 'TriggerAfterRedirect': JSON.stringify(eventToTrigger) }
      : {};

    c.header(
      'HX-Location',
      JSON.stringify({ path, headers }),
    );

    return c.newResponse(null, 200);
  }

  if (eventToTrigger) {
    c.header('HX-Trigger', JSON.stringify(eventToTrigger));
  }

  return c.redirect(path, status as 301 | 302 | 303 | 307 | 308);
}

export function fullRedirect(c: Context, url: string, status = 302) {
  if (c.var.isHxRequest) {
    c.header('HX-Redirect', url);
    return c.newResponse(null, 200);
  }

  return c.redirect(url, status);
}
