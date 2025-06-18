import nodemailer, { Transporter } from 'nodemailer';

type SendResetCodeEmail = (email: string, code: string) => Promise<void>;

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export const sendResetCodeEmail: SendResetCodeEmail = async (email, code) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.TARGET_EMAIL) {
    throw new Error('Email configuration is incomplete');
  }

  try {
    await transporter.sendMail({
      from: process.env.TARGET_EMAIL,
      to: email,
      subject: 'Password Reset Code',
      html: `
        <p>Your password reset code is: <strong>${code}</strong></p>
        <p>This code will expire in 15 minutes.</p>
      `,
    });
  } catch (error) {
    console.error('Error sending email:', (error as Error).message);
    throw error;
  }
};
