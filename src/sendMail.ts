import { createTransport } from "nodemailer";
import { logInfo } from "./log";
import { MailAttachment } from "./MailAttachment";

const transporter = createTransport({
  host: process.env.MAILBACKUP_SMTP_HOST,
  auth: {
    user: process.env.MAILBACKUP_FROM_MAIL,
    pass: process.env.MAILBACKUP_FROM_PASSWORD,
  },
});

export async function sendMail(attachment: MailAttachment) {
  logInfo("sending mail...");
  await transporter.sendMail({
    from: process.env.MAILBACKUP_FROM_MAIL,
    to: process.env.MAILBACKUP_TO_MAIL,
    subject: "Your database backup!",
    text: "It's attached ;)",
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.filepath,
      },
    ],
  });
  logInfo("mail sent");
}
