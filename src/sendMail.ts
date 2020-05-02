import { createTransport } from "nodemailer";
import { getConfig } from "./config";
import { logInfo } from "./log";

export async function sendMail(attachment: string) {
  const transporter = createTransport(getSmtpConfig());
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

function getSmtpConfig() {
  let configString = getConfig("SMTP_CONFIG");
  try {
    return JSON.parse(configString);
  } catch (error) {
    throw new Error(`Could not parse JSON: ${configString}`);
  }
}
