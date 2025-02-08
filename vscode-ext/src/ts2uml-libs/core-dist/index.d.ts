import * as _ts2uml_models from '@ts2uml/models';
import { Config, Graph } from '@ts2uml/models';

declare function generateGraph(dir: string, config?: Partial<Config>): Promise<_ts2uml_models.Graph>;

declare function ts2umlToJson(graph: Graph): string;

export { generateGraph, ts2umlToJson };
