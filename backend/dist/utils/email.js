"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBookingCancellation = exports.sendBookingConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Use Ethereal Email for testing purposes automatically
let transporter = null;
async function getTransporter() {
    if (transporter)
        return transporter;
    // Generate test SMTP service account from ethereal.email
    // Only needed for testing/demo purposes. For production, use real credentials via process.env
    const testAccount = await nodemailer_1.default.createTestAccount();
    transporter = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    console.log(`[Email] Configured Ethereal Transporter: ${testAccount.user}`);
    return transporter;
}
const sendBookingConfirmation = async (recipientEmail, recipientName, eventTitle, dateString) => {
    try {
        const t = await getTransporter();
        const info = await t.sendMail({
            from: '"Cal Clone System" <noreply@calclone.local>',
            to: recipientEmail,
            subject: `Confirmed: ${eventTitle}`,
            text: `Hi ${recipientName},\n\nYour booking for "${eventTitle}" on ${dateString} has been confirmed.\n\nThank you!`,
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Booking Confirmed ✅</h2>
          <p>Hi <strong>${recipientName}</strong>,</p>
          <p>Your booking for <strong>"${eventTitle}"</strong> on <strong>${dateString}</strong> has been successfully scheduled.</p>
          <p>Thank you for using Cal Clone!</p>
        </div>
      `,
        });
        console.log(`[Email] Confirmation sent to ${recipientEmail}. Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
    }
    catch (err) {
        console.error('[Email] Failed to send confirmation email', err);
    }
};
exports.sendBookingConfirmation = sendBookingConfirmation;
const sendBookingCancellation = async (recipientEmail, recipientName, eventTitle, dateString) => {
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
        console.log(`[Email] Cancellation sent to ${recipientEmail}. Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
    }
    catch (err) {
        console.error('[Email] Failed to send cancellation email', err);
    }
};
exports.sendBookingCancellation = sendBookingCancellation;
