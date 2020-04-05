import { dbDumpToFile } from "./dbDumpToFile";
import { logInfo } from "./log";
import { sendMail } from "./sendMail";

export async function doBackup() {
  logInfo("starting backup process...");
  const date = getDateString();
  const filename = `backup-${date}.sql.gz`;
  const filepath = `/tmp/${filename}`;
  await dbDumpToFile(filepath);
  await sendMail({
    filename,
    filepath,
  });
  logInfo("backup process finished");
}

function getDateString() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}
