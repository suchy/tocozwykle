import { hash as hashPassword, verify as verifyPassword } from '@bronti/argon2';
import { Context } from '@hono/hono';
import {
  credentialsTable,
  organizationsTable,
  Session,
  sessionsTable,
  signinsTable,
  User,
  usersTable,
  verificationTokensTable,
} from '../../database/schema/schema.ts';
import { db } from '../../database/client.ts';
import { and, eq, ne } from 'drizzle-orm';
import { randomString } from './randomString.ts';
import { deleteCookie, getCookie, setCookie } from '@hono/hono/cookie';
import { USER_ROLES, UserRole } from './constants.ts';
import { env } from '../../env.ts';
import { signupEmailVerification } from '../core/emails/signupEmailVerification.ts';
import { sendEmail } from './sendEmail.ts';
import { changeEmailVerification } from '../core/emails/changeEmailVerification.ts';
import { tenantUrl } from './tenantUrl.ts';
import { lectorInvitation } from '../core/emails/lectorInvitation.ts';
import { Email } from './types.ts';
import { studentInvitation } from '../core/emails/studentInvitation.ts';
import { emailChanged } from '../core/emails/emailChanged.ts';
import { passwordChanged } from '../core/emails/passwordChanged.ts';
import { passwordReset } from '../core/emails/passwordReset.ts';
import { passwordResetConfirm } from '../core/emails/passwordResetConfirm.ts';

type Errors = Record<string, string>;

interface Auth<U extends {}, S extends {}> {
  createUser(
    c: Context,
  ): Promise<
    | { user: U; errors: undefined }
    | { user: undefined; errors: Errors }
  >;
  createSession(
    c: Context,
  ): Promise<
    | { data: { session: S; user: U }; errors: undefined }
    | { data: undefined; errors: Errors }
  >;
  getSession(c: Context): Promise<
    | { session: S; user: U }
    | undefined
  >;
  destroySession(c: Context): Promise<Errors | undefined>;
}

// TODO take another look at ERRORORRRRRRS MESSAGEEES
class EmailPasswordAuth implements Auth<User, Session> {
  async createUser(c: Context) {
    if (c.var.org) {
      throw new Error('Organization already exists');
    }

    const form = await c.req.raw.clone().formData();

    const email = form.get('email')?.toString() ?? '';
    const password = form.get('password')?.toString() ?? '';
    const name = form.get('name')?.toString() ?? '';
    const phone = form.get('phone')?.toString() ?? null;
    const orgName = form.get('orgName')?.toString() ?? '';
    let orgSlug = form.get('orgSlug')?.toString() ?? '';

    if (orgSlug) {
      orgSlug = orgSlug.toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/( )+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-');
    }

    const errors: Errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    const passwordStrengthErrors = this.#validatePasswordStrength(password);

    if (passwordStrengthErrors.length > 0) {
      errors.password = passwordStrengthErrors.join(', ');
    }

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!orgName) {
      errors.orgName = 'Organization name is required';
    }

    if (!orgSlug) {
      errors.orgSlug = 'Organization slug is required';
    }

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const orgExists = await db.$count(
      organizationsTable,
      eq(organizationsTable.slug, orgSlug),
    );

    if (orgExists) {
      errors.orgSlug = 'Organization with this slug already exists';
      return { errors };
    }

    const userId = randomString('user');
    const orgId = randomString('org');

    const userExists = await db.$count(
      usersTable,
      and(eq(usersTable.email, email), eq(usersTable.orgId, orgId)),
    );

    if (userExists) {
      errors.general = 'User with this email already exists';
      return { errors };
    }

    const user = await db.transaction(async (tx) => {
      await tx.insert(organizationsTable).values({
        id: orgId,
        name: orgName,
        slug: orgSlug,
      });

      const [user] = await tx.insert(usersTable).values({
        id: userId,
        orgId,
        email,
        name,
        phone,
        roles: [USER_ROLES.ADMIN],
      }).returning();

      if (!user) {
        throw new Error('User not created');
      }

      await tx.insert(credentialsTable).values({
        id: randomString('cred'),
        userId: user.id,
        password: hashPassword(password),
      });

      return user;
    });

    await this.#sendEmailVerificationEmail(user, orgSlug);

    return { user };
  }

  async createSession(c: Context) {
    const request = c.req.raw.clone();
    const form = await request.formData();

    const email = form.get('email')?.toString() ?? '';
    const password = form.get('password')?.toString() ?? '';
    const orgId = c.var.org.id;

    const errors: Errors = {};

    const [result] = await db
      .select({
        user: {
          id: usersTable.id,
          email: usersTable.email,
          name: usersTable.name,
          phone: usersTable.phone,
          roles: usersTable.roles,
          orgId: usersTable.orgId,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        },
        credential: {
          id: credentialsTable.id,
          password: credentialsTable.password,
          emailVerified: credentialsTable.emailVerified,
        },
      })
      .from(usersTable)
      .innerJoin(
        credentialsTable,
        eq(usersTable.id, credentialsTable.userId),
      )
      .where(
        and(
          eq(usersTable.email, email),
          eq(usersTable.orgId, orgId),
        ),
      )
      .limit(1);

    if (!result) {
      console.log(`User not found for email ${email} in org ${orgId}`);
      errors.general = 'Invalid email or password';
      return { errors };
    }

    const { credential, user } = result;

    const isPasswordMatching = verifyPassword(password, credential.password);

    if (!isPasswordMatching) {
      console.log(`Password does not match for email ${email} in org ${orgId}`);
      errors.general = 'Invalid email or password';
      return { errors };
    }

    if (!credential.emailVerified) {
      console.log(`Email not verified for email ${email} in org ${orgId}`);
      errors.general = 'Invalid email or password';
      return { errors };
    }

    const session = await this.#createSession(c, user.id);

    c.set('user', user);
    c.set('orgSlug', c.var.org.slug);

    return { data: { session, user } };
  }

  async getSession(c: Context) {
    const sessionToken = getCookie(c, 'session');
    const orgId = c.var.org.id;

    if (!sessionToken) {
      return;
    }

    const [result] = await db
      .select({
        session: {
          id: sessionsTable.id,
          userId: sessionsTable.userId,
          token: sessionsTable.token,
          userAgent: sessionsTable.userAgent,
          expiresAt: sessionsTable.expiresAt,
          createdAt: sessionsTable.createdAt,
          updatedAt: sessionsTable.updatedAt,
        },
        user: {
          id: usersTable.id,
          email: usersTable.email,
          changingEmail: usersTable.changingEmail,
          name: usersTable.name,
          phone: usersTable.phone,
          roles: usersTable.roles,
          orgId: usersTable.orgId,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        },
      })
      .from(sessionsTable)
      .innerJoin(
        usersTable,
        eq(sessionsTable.userId, usersTable.id),
      )
      .where(
        and(
          eq(sessionsTable.token, sessionToken),
          eq(usersTable.orgId, orgId),
        ),
      );

    if (!result) {
      return;
    }

    c.set('session', result.session);
    c.set('user', result.user);

    return result;
  }

  async destroySession(c: Context) {
    const errors: Errors = {};

    const sessionToken = getCookie(c, 'session');

    if (!sessionToken) {
      errors.general = 'Session not found';
      return errors;
    }

    const result = await db
      .delete(sessionsTable)
      .where(
        eq(sessionsTable.token, sessionToken),
      ).returning({ deletedId: sessionsTable.id });

    const isSessionDestroyed = result.length > 0;

    if (!isSessionDestroyed) {
      errors.general = 'Session not found.';
      return errors;
    }

    deleteCookie(c, 'session');
  }

  async sendEmailVerificationEmail(c: Context, email: string) {
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        phone: usersTable.phone,
        orgId: usersTable.orgId,
        roles: usersTable.roles,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
        changingEmail: usersTable.changingEmail,
      })
      .from(usersTable)
      .innerJoin(credentialsTable, eq(usersTable.id, credentialsTable.userId))
      .where(
        and(
          eq(usersTable.email, email),
          eq(usersTable.orgId, orgId),
          eq(credentialsTable.emailVerified, false),
        ),
      )
      .limit(1);

    if (!user) {
      errors.general = 'User not found';
      return errors;
    }

    return this.#sendEmailVerificationEmail(user, c.var.org.slug);
  }

  async confirmEmail(c: Context) {
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const token = c.req.query('token');

    if (!token) {
      errors.general = 'Email confirmation token is required';
      return errors;
    }

    const [verificationToken] = await db
      .select({
        id: verificationTokensTable.id,
        userId: verificationTokensTable.userId,
        expiresAt: verificationTokensTable.expiresAt,
      })
      .from(verificationTokensTable)
      .innerJoin(usersTable, eq(verificationTokensTable.userId, usersTable.id))
      .where(
        and(
          eq(verificationTokensTable.token, token),
          eq(usersTable.orgId, orgId),
          eq(verificationTokensTable.type, 'email_confirmation'),
        ),
      )
      .limit(1);

    if (!verificationToken) {
      errors.general = 'Email confirmation token expired';
      console.log('Email confirmation token not found: ', token);
      return errors;
    }

    if (verificationToken.expiresAt < new Date()) {
      await db
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));

      errors.general = 'Email confirmation token expired';
      console.log('Email confirmation token expired: ', token);
      return errors;
    }

    await db.transaction(async (tx) => {
      await tx
        .update(credentialsTable)
        .set({ emailVerified: true })
        .where(eq(credentialsTable.userId, verificationToken.userId));

      await tx
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));
    });

    await this.#createSession(c, verificationToken.userId);
  }

  async sendPasswordResetEmail(c: Context, email: string) {
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        phone: usersTable.phone,
        roles: usersTable.roles,
        orgId: usersTable.orgId,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
        changingEmail: usersTable.changingEmail,
      })
      .from(usersTable)
      .innerJoin(credentialsTable, eq(usersTable.id, credentialsTable.userId))
      .where(
        and(
          eq(usersTable.email, email),
          eq(usersTable.orgId, orgId),
          eq(credentialsTable.emailVerified, true),
        ),
      )
      .limit(1);

    if (!user) {
      errors.general = 'User not found';
      return errors;
    }

    const verificationToken = await this.#createVerificationToken(
      user.id,
      'password_reset',
    );

    if (!verificationToken) {
      throw new Error('Password reset token not created');
    }

    const passwordResetUrl = tenantUrl(
      c.var.org.slug,
      '/reset-password/new?token=' + verificationToken.token,
    );

    const passwordResetEmail = passwordResetConfirm({ user, passwordResetUrl });
    await sendEmail(passwordResetEmail);
  }

  async resetPassword(c: Context) {
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const request = c.req.raw.clone();
    const form = await request.formData();
    const newPassword = form.get('password')?.toString() ?? '';

    const token = c.req.query('token');

    if (!token) {
      errors.general = 'Password reset token is required';
      return errors;
    }

    if (!newPassword) {
      errors.general = 'New password is required';
      return errors;
    }

    const passwordStrengthErrors = this.#validatePasswordStrength(newPassword);

    if (passwordStrengthErrors.length > 0) {
      errors.general = passwordStrengthErrors.join(', ');
      return { errors };
    }

    const [verificationToken] = await db
      .select({
        id: verificationTokensTable.id,
        userId: verificationTokensTable.userId,
        expiresAt: verificationTokensTable.expiresAt,
      })
      .from(verificationTokensTable)
      .innerJoin(usersTable, eq(verificationTokensTable.userId, usersTable.id))
      .where(
        and(
          eq(verificationTokensTable.token, token),
          eq(usersTable.orgId, orgId),
          eq(verificationTokensTable.type, 'password_reset'),
        ),
      )
      .limit(1);

    if (!verificationToken) {
      errors.general = 'Password reset token expired';
      console.log('Password reset token not found: ', token);
      return errors;
    }

    if (verificationToken.expiresAt < new Date()) {
      await db
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));

      errors.general = 'Password reset token expired';
      console.log('Password reset token expired: ', token);
      return errors;
    }

    const user = await db.transaction(async (tx) => {
      await tx
        .update(credentialsTable)
        .set({ password: hashPassword(newPassword) })
        .where(eq(credentialsTable.userId, verificationToken.userId));

      await tx
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));

      const [user] = await tx
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, verificationToken.userId));

      return user;
    });

    if (!user) {
      throw new Error('User not found');
    }

    const email = passwordReset({ user });
    await sendEmail(email);
  }

  async changePassword(c: Context) {
    const userId = c.var.user.id;
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const formData = await c.req.formData();

    const password = formData.get('password')?.toString() ?? '';
    const newPassword = formData.get('newPassword')?.toString() ?? '';

    if (!password) {
      errors.password = 'Password is required';
      return { errors };
    }

    if (!newPassword) {
      errors.newPassword = 'New password is required';
      return { errors };
    }

    const passwordStrengthErrors = this.#validatePasswordStrength(newPassword);

    if (passwordStrengthErrors.length > 0) {
      errors.newPassword = passwordStrengthErrors.join(', ');
      return { errors };
    }

    const [credential] = await db
      .select({
        id: credentialsTable.id,
        password: credentialsTable.password,
        emailVerified: credentialsTable.emailVerified,
      })
      .from(credentialsTable)
      .innerJoin(usersTable, eq(credentialsTable.userId, usersTable.id))
      .where(
        and(
          eq(credentialsTable.userId, userId),
          eq(usersTable.orgId, orgId),
        ),
      )
      .limit(1);

    if (!credential) {
      errors.password = 'Invalid password';
      return { errors };
    }

    const isPasswordMatching = verifyPassword(password, credential.password);

    if (!isPasswordMatching) {
      errors.password = 'Invalid password';
      return { errors };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(credentialsTable)
        .set({
          password: hashPassword(newPassword),
          updatedAt: new Date(),
        })
        .where(eq(credentialsTable.id, credential.id));

      await tx
        .delete(sessionsTable)
        .where(
          and(
            eq(sessionsTable.userId, userId),
            ne(sessionsTable.id, c.var.session.id),
          ),
        );
    });

    const email = passwordChanged({ user: c.var.user });
    await sendEmail(email);
  }

  async confirmChangeEmail(c: Context) {
    const user = c.var.user;
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const token = c.req.query('token');

    if (!token) {
      errors.general = 'Email confirmation token is required';
      return errors;
    }

    const [verificationToken] = await db
      .select({
        id: verificationTokensTable.id,
        userId: verificationTokensTable.userId,
        expiresAt: verificationTokensTable.expiresAt,
      })
      .from(verificationTokensTable)
      .innerJoin(usersTable, eq(verificationTokensTable.userId, usersTable.id))
      .where(
        and(
          eq(verificationTokensTable.token, token),
          eq(usersTable.orgId, orgId),
          eq(verificationTokensTable.type, 'email_change_confirmation'),
        ),
      )
      .limit(1);

    if (!verificationToken) {
      errors.general = 'Email confirmation token expired';
      console.log('Email confirmation token not found: ', token);
      return errors;
    }

    if (verificationToken.expiresAt < new Date()) {
      await db
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));

      errors.general = 'Email confirmation token expired';
      console.log('Email confirmation token expired: ', token);
      return errors;
    }

    await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ email: user.changingEmail, changingEmail: null })
        .where(eq(usersTable.id, verificationToken.userId));

      await tx
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, verificationToken.id));
    });

    const email = emailChanged({ user });
    await sendEmail(email);
  }

  async inviteUser(c: Context, role: UserRole) {
    const orgId = c.var.org.id;

    const formData = await c.req.raw.clone().formData();

    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? '';

    const errors: Record<string, string> = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    }

    const hasErrors = !!Object.keys(errors).length;

    if (hasErrors) {
      return { errors };
    }

    const userId = randomString('user');

    const [user] = await db
      .insert(usersTable)
      .values({
        id: userId,
        name,
        email,
        phone,
        orgId,
        roles: [role],
      }).returning();

    if (!user) {
      throw new Error('User not created');
    }

    const invitationToken = await this.#createVerificationToken(
      userId,
      'invitation',
    );

    if (!invitationToken) {
      throw new Error('Invitation token not created');
    }

    let invitationEmail: Email | undefined;

    const invitationUrl = tenantUrl(
      c.var.org.slug,
      '/invitation' + '?token=' + invitationToken.token,
    );

    if (role === USER_ROLES.LECTOR) {
      invitationEmail = lectorInvitation({ user, invitationUrl });
    }

    if (role === USER_ROLES.STUDENT) {
      invitationEmail = studentInvitation({ user, invitationUrl });
    }

    if (!invitationEmail) {
      throw new Error('Invitation email not created');
    }

    await sendEmail(invitationEmail);

    return { userId };
  }

  async acceptInvitation(c: Context) {
    const orgId = c.var.org.id;
    const token = c.req.query('token');
    const errors: Errors = {};

    if (!token) {
      errors.general = 'Invitation token is required';
      return errors;
    }

    const formData = await c.req.formData();

    const password = formData.get('password')?.toString() ?? '';

    if (!password) {
      errors.password = 'Password is required';
    }

    const [invitationToken] = await db
      .select({
        id: verificationTokensTable.id,
        userId: usersTable.id,
        expiresAt: verificationTokensTable.expiresAt,
      })
      .from(verificationTokensTable)
      .innerJoin(
        usersTable,
        eq(verificationTokensTable.userId, usersTable.id),
      )
      .where(
        and(
          eq(verificationTokensTable.token, token),
          eq(usersTable.orgId, orgId),
          eq(verificationTokensTable.type, 'invitation'),
        ),
      )
      .limit(1);

    if (!invitationToken) {
      errors.general = 'Invitation token is invalid';
      return errors;
    }

    if (invitationToken.expiresAt < new Date()) {
      await db
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.id, invitationToken.id));

      errors.general = 'Invitation token has expired';
      return errors;
    }

    await db.transaction(async (tx) => {
      await tx.insert(credentialsTable).values({
        id: randomString('cred'),
        userId: invitationToken.userId,
        password: hashPassword(password),
        emailVerified: true,
      });

      await tx.delete(verificationTokensTable).where(
        eq(verificationTokensTable.id, invitationToken.id),
      );
    });
  }

  async changeEmail(c: Context) {
    const user = c.var.user;
    const orgId = c.var.org.id;
    const errors: Errors = {};

    const request = c.req.raw.clone();
    const formData = await request.formData();

    const password = formData.get('password')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';

    if (!password) {
      errors.password = 'Password is required';
      return errors;
    }

    if (!email) {
      errors.email = 'Email is required';
      return errors;
    }

    const [credential] = await db
      .select({ password: credentialsTable.password })
      .from(credentialsTable)
      .innerJoin(usersTable, eq(credentialsTable.userId, usersTable.id))
      .where(
        and(
          eq(credentialsTable.userId, user.id),
          eq(usersTable.orgId, orgId),
        ),
      )
      .limit(1);

    if (!credential) {
      errors.password = 'Invalid password';
      return errors;
    }

    const isPasswordMatching = verifyPassword(password, credential.password);

    if (!isPasswordMatching) {
      errors.password = 'Invalid password';
      return errors;
    }

    await db
      .update(usersTable)
      .set({
        changingEmail: email,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, user.id));

    await this.#sendChangeEmailVerificationEmail(user, c.var.org.slug);
  }

  async #createVerificationToken(
    userId: string,
    type:
      | 'email_confirmation'
      | 'password_reset'
      | 'invitation'
      | 'email_change_confirmation',
  ) {
    const token = randomString('', 32);

    const [verificationToken] = await db
      .insert(verificationTokensTable)
      .values({
        id: randomString('token'),
        userId,
        token,
        type,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
      })
      .returning();

    return verificationToken;
  }

  async #createSession(c: Context, userId: string) {
    const sessionId = randomString('session');
    const sessionToken = randomString('', 24);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    const session = await db.transaction(async (tx) => {
      const [session] = await tx.insert(sessionsTable).values({
        id: sessionId,
        userId: userId,
        token: sessionToken,
        userAgent: c.req.raw.headers.get('user-agent') ?? '',
        expiresAt: expiresAt,
      }).returning();

      await tx.insert(signinsTable).values({
        id: randomString('signin'),
        userId,
        userAgent: c.req.raw.headers.get('user-agent') ?? '',
      });

      return session;
    });

    if (!session) {
      throw new Error('Session not created');
    }

    setCookie(c, 'session', session.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expiresAt), // todo probably should be without expire. check with owasp
      // TODO set domain
    });

    c.set('session', session);

    return session;
  }

  async #sendEmailVerificationEmail(user: User, orgSlug: string) {
    const verificationToken = await this.#createVerificationToken(
      user.id,
      'email_confirmation',
    );

    if (!verificationToken) {
      throw new Error('Verification token not created');
    }

    const email = signupEmailVerification({
      user,
      emailVerificationUrl: tenantUrl(
        orgSlug,
        '/confirm-email?token=' +
          verificationToken.token,
      ),
    });

    await sendEmail(email);
  }

  async #sendChangeEmailVerificationEmail(user: User, orgSlug: string) {
    const verificationToken = await this.#createVerificationToken(
      user.id,
      'email_change_confirmation',
    );

    if (!verificationToken) {
      throw new Error('Verification token not created');
    }

    const email = changeEmailVerification({
      user,
      emailVerificationUrl: tenantUrl(
        orgSlug,
        '/profile/email/confirm?token=' +
          verificationToken.token,
      ),
    });

    await sendEmail(email);
  }

  #validatePasswordStrength(password: string) {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (password.length > 128) {
      errors.push('Password must be less than 128 characters');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for common weak patterns
    if (/(.)\1{2,}/.test(password)) {
      errors.push(
        'Password cannot contain more than 2 consecutive identical characters',
      );
    }

    if (/^(?:123|abc|qwe)/i.test(password)) {
      errors.push('Password cannot start with common sequences');
    }

    return errors;
  }
}

export const emailPasswordAuth = new EmailPasswordAuth();
