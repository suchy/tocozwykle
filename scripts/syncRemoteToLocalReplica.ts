import { libsqlClient } from '../database/client.ts';

await libsqlClient.sync();

Deno.exit(0);
