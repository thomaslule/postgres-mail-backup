import { CronJob } from "cron";
import { doBackup } from "./doBackup";

const everyMinute = "* * * * * * *";

const job = new CronJob(everyMinute, async () => {
  try {
    await doBackup();
  } catch (error) {
    console.error(error, error.stack);
  }
});

job.start();
