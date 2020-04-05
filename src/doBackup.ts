import { getDbDump } from "./getDbDump";
import { sendMail } from "./sendMail";

export async function doBackup() {
  const date = getDateString();
  const filename = `backup-${date}.sql.gz`;
  const dumpBuffer = await getDbDump();
  await sendMail({
    filename,
    content: dumpBuffer,
  });
}

function getDateString() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}
