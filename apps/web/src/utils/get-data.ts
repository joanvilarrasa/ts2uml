import type { Graph, Node } from '@ts2uml/models';
import type { Edge as RF_Edge, Node as RF_Node } from '@xyflow/react';

export const getInitialNodes = (graph: Graph) => {
  const newInitialNodes: RF_Node<{ data: Node }>[] = [];
  const nodesToFilter = graph.config.nodes.filter.filter_node;
  for (const node of graph.nodes) {
    if (!nodesToFilter.includes(node.id)) {
      newInitialNodes.push({
        id: node.id,
        type: 'interface',
        position: { x: 0, y: 0 },
        data: { data: node },
      });
    }
  }
  return newInitialNodes;
};

export const getInitialEdges = (graph: Graph, overRideLinkPathAlgorithm?: string) => {
  const nodesToFilter = graph.config.nodes.filter.filter_node;
  const linkPathAlgorithm = overRideLinkPathAlgorithm ?? graph.config.links.linkPathAlgorithm;
  const newInitialEdges: RF_Edge[] = [];
  for (const link of graph.links) {
    if (!nodesToFilter.includes(link.sourceId) && !nodesToFilter.includes(link.targetId)) {
      newInitialEdges.push({
        id: `${link.sourceId}-${link.targetId}`,
        source: link.sourceId,
        target: link.targetId,
        type: `floating-${linkPathAlgorithm}`,
      });
    }
  }
  return newInitialEdges;
};
