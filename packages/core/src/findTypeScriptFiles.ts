import { readdir } from "node:fs/promises";
import { join } from 'path';
import type { Config } from "@ts2uml/models";
import { isTypeScriptFile } from "./isTypeScriptFile";

export async function findTypeScriptFiles(directory: string, config: Config): Promise<string[]> {
    const results: string[] = [];
    const filterPaths = config.nodes.filter.filter_path;
    const items = await readdir(directory, { recursive: true });

    await Promise.all(items.map(async (itemName) => {
        if (!filterPaths.some((filterPath) => itemName.includes(filterPath))) {
            const fullPath = join(directory, itemName);
            if (isTypeScriptFile(fullPath)) {
                results.push(fullPath);
            }
        }
    }));

    return results;
}