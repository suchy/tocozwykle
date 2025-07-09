import { Resend } from 'resend';
import { env } from '../../env.ts';

export async function sendEmail(email: Email) {
  const config = {
    from: env.RESEND_EMAIL,
    to: email.to,
    subject: email.subject,
    html: email.content,
  };

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send(config);

  if (error) {
    console.log(error);
  }
}

export type Email = {
  to: string;
  subject: string;
  content: string;
};
