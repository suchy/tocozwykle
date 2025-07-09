import { z } from 'zod';

const requiredString = z.string().min(1);

const envSchema = z.object({
  APP_ENV: requiredString,
  PORT: z.coerce.number(),
  APP_URL: requiredString,
  RESEND_API_KEY: requiredString,
  RESEND_EMAIL: requiredString,
  TURSO_AUTH_TOKEN: requiredString,
  TURSO_DATABASE_URL: requiredString,
});

export const env = envSchema.parse(Deno.env.toObject());
