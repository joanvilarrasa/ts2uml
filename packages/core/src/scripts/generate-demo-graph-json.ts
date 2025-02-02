import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createConfig } from '@ts2uml/models';
import { Project } from 'ts-morph';
import { findTypeScriptFiles } from '../actions/find-typescript-files.ts';
import { generateGraph } from '../actions/generate-graph.ts';

async function createDefaultGraph() {
  const dir = join(process.cwd(), '..', 'models', 'src');

  const config = createConfig();
  const tsFiles = await findTypeScriptFiles(dir);
  const project = new Project();
  for (const file of tsFiles) {
    project.addSourceFileAtPath(file);
  }
  const demoGraph = generateGraph(project, dir, config);

  await writeFile('src/scripts/demo-graph.json', JSON.stringify(demoGraph, null, 2));
}

await createDefaultGraph();
