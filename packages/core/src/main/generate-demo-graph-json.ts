import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {} from '@ts2uml/models';
import { findTypeScriptFiles } from '../file-utils/find-typescript-files.ts';
import { generateGraph } from './generate-graph.ts';

async function createDefaultGraph() {
  const dir = join(process.cwd(), 'test', '21-inheritance', 'test-files');
  // const dir = join(process.cwd(), 'demo-graph', 'test-files');

  const tsFiles = await findTypeScriptFiles(dir);
  const demoGraph = generateGraph({
    files: tsFiles,
    baseDir: dir,
  });

  await writeFile('demo-graph/demo-graph.json', JSON.stringify(demoGraph, null, 2));
}

await createDefaultGraph();
