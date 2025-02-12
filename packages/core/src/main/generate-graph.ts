import { isTypeScriptFile } from '@/file-utils/is-typescript-file.ts';
import { type Config, createConfig } from '@ts2uml/models';
import { Project } from 'ts-morph';
import { getGraphFromProject } from '../ts-morph-to-graph/get-graph-from-project.ts';

export function generateGraph({
  files,
  config,
  baseDir,
}: {
  files: string[];
  config?: Partial<Config>;
  baseDir: string;
}) {
  const graphConfig = createConfig(config);
  const project = new Project();

  for (const file of files) {
    if (isTypeScriptFile(file)) {
      project.addSourceFileAtPath(file);
    }
  }

  const graph = getGraphFromProject(project, baseDir, graphConfig);

  return graph;
}
