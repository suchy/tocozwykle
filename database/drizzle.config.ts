import { Config } from '@libsql/client/node';
import { defineConfig } from 'drizzle-kit';
import { env } from '../env.ts';

let config: Config = {
  // url: 'file:./data/local.db',
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
};

// if (env.APP_ENV === 'production') {
//   config = {
//     ...config,
//     syncUrl: env.TURSO_DATABASE_URL,
//     authToken: env.TURSO_AUTH_TOKEN,
//   };
// }

export default defineConfig({
  schema: './database/schema',
  out: './database/migrations',
  dialect: 'turso',
  dbCredentials: config,
  migrations: {
    prefix: 'timestamp',
  },
  verbose: true,
});
