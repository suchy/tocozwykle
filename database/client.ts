import { drizzle } from 'drizzle-orm/libsql/node';
import { Config, createClient } from '@libsql/client/node';
import { env } from '../env.ts';
import * as schema from './schema.ts';

let config: Config = {
  url: 'file:./data/local.db',
  syncUrl: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
};

// if (env.APP_ENV === 'production') {
//   config = {
//     ...config,
// syncUrl: env.TURSO_DATABASE_URL,
// authToken: env.TURSO_AUTH_TOKEN,
//   };
// }

export const libsqlClient = createClient(config);

export const db = drizzle({
  client: libsqlClient,
  schema,
  logger: true,
});
