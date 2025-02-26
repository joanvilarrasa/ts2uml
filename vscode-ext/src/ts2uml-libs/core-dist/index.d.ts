import * as _ts2uml_models from '@ts2uml/models';
import { Config, Graph, TreeNode } from '@ts2uml/models';

declare function generateGraph({ files, config, baseDir, }: {
    files: string[];
    config?: Partial<Config>;
    baseDir: string;
}): _ts2uml_models.Graph;

declare function ts2umlToJson(graph: Graph): string;

declare function generateDocs({ graph, title, includeAttributes, }: {
    graph: Graph;
    title?: string;
    includeAttributes?: boolean;
}): string;

declare function createTreeNodeFromGraph(graph: Graph): {
    [key: string]: TreeNode;
};

export { createTreeNodeFromGraph, generateDocs, generateGraph, ts2umlToJson };
