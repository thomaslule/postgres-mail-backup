import { CronJob } from "cron";
import { checkEnvVariablesAreProvided, getConfig } from "./config";
import { doBackup } from "./doBackup";
import { logError, logInfo } from "./log";

checkEnvVariablesAreProvided();

const job = new CronJob(getConfig("CRON_SCHEDULE"), async () => {
  try {
    await doBackup();
  } catch (error) {
    logError(error);
    logError(`stack: ${error.stack}`);
  }
});

job.start();
logInfo("cron job scheduled");
