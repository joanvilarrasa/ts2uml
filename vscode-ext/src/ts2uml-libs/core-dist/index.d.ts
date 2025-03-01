import * as _ts2uml_models from '@ts2uml/models';
import { Config, Graph, TreeNode, Node } from '@ts2uml/models';

declare function generateGraph({ files, config, baseDir, }: {
    files: string[];
    config?: Partial<Config>;
    baseDir: string;
}): _ts2uml_models.Graph;

declare function ts2umlToJson(graph: Graph): string;

/**
 * Converts a TS2UML graph to Excalidraw format
 * @param graph The TS2UML graph to convert
 * @returns An Excalidraw-compatible JSON object
 */
declare function ts2umlToExcalidraw(graph: Graph): string;

declare function generateDocs({ graph, includeAttributes, includeTOC, }: {
    graph: Graph;
    title?: string;
    includeAttributes?: boolean;
    includeTOC?: boolean;
}): string;

declare function createTreeNodeFromGraph(graph: Graph): {
    [key: string]: TreeNode;
};

declare function getLeafIds(tree: TreeNode): string[];

declare function computeNodeWidth(node: Node): number;
declare function computeNodeHeight(node: Node): number;

export { computeNodeHeight, computeNodeWidth, createTreeNodeFromGraph, generateDocs, generateGraph, getLeafIds, ts2umlToExcalidraw, ts2umlToJson };
