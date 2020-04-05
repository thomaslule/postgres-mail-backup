import { dbDumpToFile } from "./dbDumpToFile";
import { sendMail } from "./sendMail";

export async function doBackup() {
  const date = getDateString();
  const filename = `backup-${date}.sql.gz`;
  const filepath = `/tmp/${filename}`;
  await dbDumpToFile(filepath);
  await sendMail({
    filename,
    filepath,
  });
}

function getDateString() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}
