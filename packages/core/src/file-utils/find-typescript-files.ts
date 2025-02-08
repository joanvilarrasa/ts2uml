import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { isTypeScriptFile } from './is-typescript-file.ts';

export async function findTypeScriptFiles(directory: string): Promise<string[]> {
  const results: string[] = [];
  const items = await readdir(directory, { recursive: true });
  await Promise.all(
    items.map((itemName) => {
      const fullPath = join(directory, itemName);
      if (isTypeScriptFile(fullPath)) {
        results.push(fullPath);
      }
    })
  );

  return results;
}
