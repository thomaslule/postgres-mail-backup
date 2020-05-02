import { createTransport } from "nodemailer";
import { getConfig } from "./config";
import { logInfo } from "./log";

const transporter = createTransport(JSON.parse(getConfig("SMTP_CONFIG")));

export async function sendMail(attachment: string) {
  logInfo("sending mail...");
  await transporter.sendMail({
    from: getConfig("FROM_MAIL"),
    to: getConfig("TO_MAIL"),
    subject: "Your database backup!",
    text: "It's attached ;)",
    attachments: [
      {
        path: attachment,
      },
    ],
  });
  logInfo("mail sent");
}
