import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  
  if (user && pass) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
    console.log(`[Email] Configured Gmail SMTP Transporter for: ${user}`);
  } else {
    // Fallback if env vars not provided
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log(`[Email] Configured Ethereal Transporter: ${testAccount.user}`);
  }
  return transporter;
}

export const sendBookingConfirmationEmail = async (
  recipientEmail: string,
  recipientName: string,
  eventTitle: string,
  dateString: string,
  timeString: string,
  meetingUrl: string
) => {
  try {
    const t = await getTransporter();
    
    const info = await t.sendMail({
      from: '"Cal Clone System" <noreply@calclone.local>',
      to: recipientEmail,
      subject: `Booking Confirmation: ${eventTitle}`,
      text: `Hi ${recipientName},\n\nYour booking for "${eventTitle}" on ${dateString} at ${timeString} has been confirmed.\n\nThank you!`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; margin-top: 0;">Booking Confirmation ✅</h2>
          <p style="color: #334155;">Hi <strong>${recipientName}</strong>,</p>
          <p style="color: #334155;">Your booking has been successfully scheduled. Here are the details:</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; color: #475569;"><strong>Event Type:</strong> ${eventTitle}</p>
            <p style="margin: 0 0 8px 0; color: #475569;"><strong>Date:</strong> ${dateString}</p>
            <p style="margin: 0 0 8px 0; color: #475569;"><strong>Time:</strong> ${timeString}</p>
            <p style="margin: 0; color: #475569;"><strong>Link:</strong> <a href="${meetingUrl}" style="color: #2563eb;">${meetingUrl}</a></p>
          </div>
          <p style="margin-bottom: 24px;">
            <a href="${meetingUrl}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Join Meeting
            </a>
          </p>
          <p style="color: #334155; margin-bottom: 0;">Thank you for using Cal Clone!</p>
        </div>
      `,
    });

    console.log(`[Email] Confirmation sent to ${recipientEmail}`);
  } catch (err) {
    console.error('[Email] Failed to send confirmation email', err);
  }
};

export const sendBookingCancellation = async (
  recipientEmail: string,
  recipientName: string,
  eventTitle: string,
  dateString: string
) => {
  try {
    const t = await getTransporter();
    
    const info = await t.sendMail({
      from: '"Cal Clone System" <noreply@calclone.local>',
      to: recipientEmail,
      subject: `Canceled: ${eventTitle}`,
      text: `Hi ${recipientName},\n\nYour booking for "${eventTitle}" on ${dateString} has been canceled.\n\nThank you!`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Booking Canceled ❌</h2>
          <p>Hi <strong>${recipientName}</strong>,</p>
          <p>Your booking for <strong>"${eventTitle}"</strong> on <strong>${dateString}</strong> has been canceled as requested.</p>
        </div>
      `,
    });

    console.log(`[Email] Cancellation sent to ${recipientEmail}. Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    console.error('[Email] Failed to send cancellation email', err);
  }
};
