import { CronJob } from "cron";
import { doBackup } from "./doBackup";
import { logError, logInfo } from "./log";

const job = new CronJob(process.env.MAILBACKUP_CRON_SCHEDULE!, async () => {
  try {
    await doBackup();
  } catch (error) {
    logError(error);
    logError(`stack: ${error.stack}`);
  }
});

job.start();
logInfo("cron job scheduled");
