import type { Graph, Node } from '@ts2uml/models';
import type { Edge as RF_Edge, Node as RF_Node } from '@xyflow/react';
import demoGraph from '../assets/demo-graph.json';

const initialGraph = demoGraph as Graph;
export const getInitialNodes = () => {
  const newInitialNodes: RF_Node<{ data: Node }>[] = [];
  for (const node of initialGraph.nodes) {
    newInitialNodes.push({ id: node.id, type: 'interface', position: { x: 0, y: 0 }, data: { data: node } });
  }
  return newInitialNodes;
};
export const getInitialEdges = () => {
  const newInitialEdges: RF_Edge[] = [];
  for (const link of initialGraph.links) {
    const sourceId = link.sourcePortId ?? link.sourceId;
    newInitialEdges.push({
      id: `${sourceId}-${link.targetId}`,
      source: link.sourceId,
      sourceHandle: link.sourcePortId,
      target: link.targetId,
      type: 'step',
    });
  }
  return newInitialEdges;
};
