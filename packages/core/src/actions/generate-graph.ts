import { type Config, createConfig } from '@ts2uml/models';
import { Project } from 'ts-morph';
import { findTypeScriptFiles } from '../actions/find-typescript-files.ts';
import { getGraphFromProject } from '../ts-morph-to-graph/get-graph-from-project.ts';

export async function generateGraph(dir: string, config?: Partial<Config>) {
  const graphConfig = createConfig(config);
  const tsFiles = await findTypeScriptFiles(dir);
  const project = new Project();
  for (const file of tsFiles) {
    project.addSourceFileAtPath(file);
  }
  const graph = getGraphFromProject(project, dir, graphConfig);

  return graph;
}
