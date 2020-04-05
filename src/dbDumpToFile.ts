import { exec } from "child_process";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { createGzip } from "zlib";

const pipe = promisify(pipeline);

export async function dbDumpToFile(filepath: string): Promise<void> {
  const sqlFile = "/tmp/dump.sql";
  await dumpToFile(sqlFile);
  await zip(sqlFile, filepath);
}

async function dumpToFile(filepath: string) {
  return new Promise((resolve, reject) => {
    exec(
      `pg_dump ${process.env.MAILBACKUP_DB_CONNECTION_STRING} -f ${filepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error: JSON.stringify(error), stderr });
          return;
        }
        resolve();
      }
    );
  });
}

async function zip(fromFile: string, toFile: string): Promise<void> {
  const gzip = createGzip();
  const source = createReadStream(fromFile);
  const destination = createWriteStream(toFile);
  await pipe(source, gzip, destination);
}
