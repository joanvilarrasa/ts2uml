import { readdir } from "node:fs/promises";
import { join, extname } from 'path';
import type { Config } from "@ts2uml/models";

export async function findTsFiles(directory: string, config: Config): Promise<string[]> {
    const results: string[] = [];
    const filterPaths = config.items.filter.filter_path;
    const items = await readdir(directory, { recursive: true });

    await Promise.all(items.map(async (itemName) => {
        if (!filterPaths.some((filterPath) => itemName.endsWith(filterPath))) {
            const fullPath = join(directory, itemName);
            if (isTypeScriptFile(fullPath)) {
                results.push(fullPath);
            }
        }
    }));

    return results;
}


const isTypeScriptFile = (filename: string): boolean => {
    const ext = extname(filename).toLowerCase();
    return ext === '.ts' || ext === '.tsx';
};