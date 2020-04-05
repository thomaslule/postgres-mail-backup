import moment from "moment";
import { dbDumpToFile } from "./dbDumpToFile";
import { logInfo } from "./log";
import { sendMail } from "./sendMail";

export async function doBackup() {
  logInfo("starting backup process...");
  const date = getDateString();
  const filepath = `/tmp/backup-${date}.sql.gz`;
  await dbDumpToFile(filepath);
  await sendMail(filepath);
  logInfo("backup process finished");
}

function getDateString() {
  return moment().format("YYYY-MM-DD");
}
