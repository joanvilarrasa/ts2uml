import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../models/Config';

export async function findTsFiles(directory: string, config: Config): Promise<string[]> {

    console.log(directory, config);
    let results: string[] = [];
    const filterPaths = config.items.filter.filter_path;
    const items = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const item of items) {
        if (!filterPaths.some((filterPath) => item.name.endsWith(filterPath))) {
            const fullPath = path.join(directory, item.name);
            if (item.isDirectory()) {
                const subDirFiles = await findTsFiles(fullPath, config);
                results = results.concat(subDirFiles);
            } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
                results.push(fullPath);
            }
        }
    }

    return results;
};