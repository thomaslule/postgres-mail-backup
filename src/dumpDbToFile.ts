import { promises } from "fs";

export async function dumpDbToFile(filepath: string) {
  await promises.writeFile(filepath, "big dump wow", "utf8");
}
