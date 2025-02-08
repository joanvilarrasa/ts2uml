import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createConfig } from '@ts2uml/models';
import { Project } from 'ts-morph';
import { findTypeScriptFiles } from '../file-utils/find-typescript-files.ts';
import { getGraphFromProject } from '../ts-morph-to-graph/get-graph-from-project.ts';

async function createDefaultGraph() {
  const dir = join(process.cwd(), '..', 'models', 'src');

  const config = createConfig();
  const tsFiles = await findTypeScriptFiles(dir);
  const project = new Project();
  for (const file of tsFiles) {
    project.addSourceFileAtPath(file);
  }
  const demoGraph = getGraphFromProject(project, dir, config);

  await writeFile('demo-graph/demo-graph.json', JSON.stringify(demoGraph, null, 2));
}

await createDefaultGraph();
