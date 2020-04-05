import moment from "moment";
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
  return moment().format("YYYY-MM-DD");
}
