import { exec } from "child_process";
import { gzip } from "zlib";

export async function getDbDump(): Promise<Buffer> {
  const dumpBuffer: Buffer = await new Promise((resolve, reject) => {
    exec(
      `pg_dump ${process.env.MAILBACKUP_DB_CONNECTION_STRING}`,
      { encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          reject({ error: JSON.stringify(error), stdout: stderr.toString() });
          return;
        }
        resolve(stdout);
      }
    );
  });
  return new Promise((resolve, reject) => {
    gzip(dumpBuffer, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}
