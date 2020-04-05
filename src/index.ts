import { CronJob } from "cron";
import { doBackup } from "./doBackup";

const job = new CronJob(process.env.MAILBACKUP_CRON_SCHEDULE!, async () => {
  try {
    await doBackup();
  } catch (error) {
    console.error(error, error.stack);
  }
});

job.start();
