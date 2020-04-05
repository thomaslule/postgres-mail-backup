import { dumpDbToFile } from "./dumpDbToFile";
import { sendMail } from "./sendMail";

export async function doBackup() {
  const date = getDateString();
  const filename = `backup-${date}.sql.gz`;
  const filepath = `${filename}`;
  await dumpDbToFile(filepath);
  await sendMail({
    filename,
    content: filepath,
  });
}

function getDateString() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}
