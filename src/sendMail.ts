import { createTransport } from "nodemailer";
import { MailAttachment } from "./MailAttachment";

export async function sendMail(attachment: MailAttachment) {
  const transporter = createTransport({
    host: process.env.MAILBACKUP_SMTP_HOST,
    auth: {
      user: process.env.MAILBACKUP_FROM_MAIL,
      pass: process.env.MAILBACKUP_FROM_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.MAILBACKUP_FROM_MAIL,
    to: process.env.MAILBACKUP_TO_MAIL,
    subject: "Your database backup!",
    text: "It's attached ;)",
    attachments: [attachment],
  });
}
