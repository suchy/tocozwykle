import { extname, join } from '@std/path';
import { fingerprint } from './fingerprint.ts';
import { createMiddleware } from '@hono/hono/factory';
import { contentType } from '@std/media-types';

export function serveStatic(
  config: {
    cacheControl?: string;
    fingerprintedCacheControl?: string;
  },
) {
  return createMiddleware(async (c, next) => {
    try {
      const path = c.req.path;

      const fingerprintedOriginalPath = fingerprint.getAssetOriginalPath(path);

      const isFingerprintedFile = !!fingerprintedOriginalPath;

      const filePath = join(
        fingerprint.config.appDirPath,
        fingerprintedOriginalPath ?? path,
      );

      const stat = await Deno.stat(filePath);

      if (!stat.isFile) {
        return await next();
      }

      const file = await Deno.readFile(filePath);
      const ext = extname(filePath);
      const type = contentType(ext) || 'application/octet-stream';

      const headers = new Headers({ 'Content-Type': type });

      if (config.cacheControl) {
        headers.set('Cache-Control', config.cacheControl);
      }

      if (isFingerprintedFile && config.fingerprintedCacheControl) {
        headers.set('Cache-Control', config.fingerprintedCacheControl);
      }

      const acceptEncoding = c.req.header('accept-encoding') ?? '';
      const shouldGzip = acceptEncoding.includes('gzip');

      if (shouldGzip) {
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(file);
            controller.close();
          },
        });

        const compressedStream = stream
          .pipeThrough(new CompressionStream('gzip'));

        headers.set('Content-Encoding', 'gzip');

        return c.newResponse(compressedStream, { headers });
      }

      return c.newResponse(file, { headers });
    } catch (e) {
      const isNotFound = e instanceof Deno.errors.NotFound;

      if (isNotFound) {
        return c.notFound();

        // because of admin router and hono problem with scoping middlewares, can't continue with next,
        // it will return forbidden instead of not fount
        // return await next();
      }

      throw e;
    }
  });
}
