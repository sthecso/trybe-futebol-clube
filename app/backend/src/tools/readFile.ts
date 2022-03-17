import * as fs from "fs/promises";

async function readFile(pathFile: string): Promise<string> {
  const resultFileRead = await fs.readFile(pathFile, "utf8");
  return resultFileRead;
}

export default readFile;
