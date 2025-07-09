import {
  index,
  integer,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
// import { DEFAULT_USER_ROLE, UserRole } from '../app/utils/constants.ts';
import { dateTime } from './utils.ts';

const commonFields = {
  id: text('id').primaryKey(),
  createdAt: dateTime('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: dateTime('updated_at'),
};

export const credentialsTable = sqliteTable('credentials', {
  ...commonFields,
  userId: text('user_id').notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  password: text('password').notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
}, (t) => [
  index('credentials_password_idx').on(t.password),
  index('credentials_user_id_idx').on(t.userId),
]);

// export const usersTable = sqliteTable('users', {
//   ...commonFields,
//   email: text('email').notNull(),
//   changingEmail: text('changing_email'),
//   name: text('name').notNull(),
//   phone: text('phone'),
//   roles: text('roles', { mode: 'json' })
//     .notNull()
//     .$type<UserRole[]>()
//     .default([DEFAULT_USER_ROLE]),
// }, (t) => [
//   index('users_email_idx').on(t.email),
//   index('users_roles_idx').on(t.roles),
// ]);

// export const sessionsTable = sqliteTable('sessions', {
//   ...commonFields,
//   token: text('token').notNull(),
//   userAgent: text('user_agent').notNull(),
//   expiresAt: dateTime('expires_at').notNull(),
// }, (t) => [
//   unique('sessions_token_idx').on(t.token),
//   index('sessions_expires_at_idx').on(t.expiresAt),
// ]);

// export const verificationTokensTable = sqliteTable('verification_tokens', {
//   ...commonFields,
//   userId: text('user_id').notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   token: text('token').notNull(),
//   type: text('type', {
//     enum: [
//       'email_confirmation',
//       'password_reset',
//       'invitation',
//       'email_change_confirmation',
//     ],
//   })
//     .notNull(),
//   expiresAt: dateTime('expires_at').notNull(),
// }, (t) => [
//   index('verification_tokens_user_id_idx').on(t.userId),
//   index('verification_tokens_type_idx').on(t.type),
//   unique('verification_tokens_token_idx').on(t.token),
// ]);

// export const signinsTable = sqliteTable('signins', {
//   ...commonFields,
//   userId: text('user_id').notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   userAgent: text('user_agent').notNull(),
// });

// export type User = typeof usersTable.$inferSelect;
// export type Session = typeof sessionsTable.$inferSelect;
// export type VerificationToken = typeof verificationTokensTable.$inferSelect;
