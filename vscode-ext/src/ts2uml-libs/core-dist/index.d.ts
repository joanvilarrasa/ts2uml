import * as _ts2uml_models from '@ts2uml/models';
import { Config, Graph } from '@ts2uml/models';

declare function generateGraph({ files, config, baseDir, }: {
    files: string[];
    config?: Partial<Config>;
    baseDir: string;
}): _ts2uml_models.Graph;

declare function ts2umlToJson(graph: Graph): string;

export { generateGraph, ts2umlToJson };
