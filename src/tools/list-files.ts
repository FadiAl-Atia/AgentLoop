import { readdir } from "fs/promises";

export async function listFilesInDirectory(
  directoryPath: string,
): Promise<string[]> {
  const files = await readdir(directoryPath);
  return files;
}
