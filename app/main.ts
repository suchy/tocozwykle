import { env } from '../env.ts';
import { fingerprint } from './utils/fingerprint.ts';
import { appRouter } from './appRouter.ts';

await fingerprint.loadManifestFile();

Deno.serve({ port: env.PORT }, appRouter.fetch);
