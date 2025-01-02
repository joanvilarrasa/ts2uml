import * as fs from 'fs';
import * as path from 'path';

export async function findTsFiles(directory: string):Promise<string[]> {
    let results: string[] = [];
    const items = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            const subDirFiles = await findTsFiles(fullPath);
            results = results.concat(subDirFiles);
        } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
            results.push(fullPath);
        }
    }

    return results;
};