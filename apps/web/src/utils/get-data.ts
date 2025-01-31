import type { Graph, Node } from '@ts2uml/models';
import type { Edge as RF_Edge, Node as RF_Node } from '@xyflow/react';
import demoGraph from '../assets/demo-graph.json';
const initialGraph = demoGraph as Graph;
export const getInitialNodes = () => {
  const newInitialNodes: RF_Node<{ data: Node }>[] = [];
  for (const node of initialGraph.nodes) {
    newInitialNodes.push({
      id: node.id,
      type: 'interface',
      position: { x: 0, y: 0 },
      data: { data: node },
    });
  }
  return newInitialNodes;
};
export const getInitialEdges = (overRideLinkPathAlgorithm?: string) => {
  const linkPathAlgorithm = overRideLinkPathAlgorithm ?? initialGraph.config.links.linkPathAlgorithm;
  const newInitialEdges: RF_Edge[] = [];
  for (const link of initialGraph.links) {
    newInitialEdges.push({
      id: `${link.sourceId}-${link.targetId}`,
      source: link.sourceId,
      target: link.targetId,
      type: `floating-${linkPathAlgorithm}`,
    });
  }
  return newInitialEdges;
};
