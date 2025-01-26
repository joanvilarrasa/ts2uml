import type { Graph, Node } from '@ts2uml/models';
import type { Edge as RF_Edge, Node as RF_Node } from '@xyflow/react';
import demoGraph from '../assets/demo-graph.json';

const initialGraph = demoGraph as Graph;
export const getInitialNodes = () => {
  let initialX = 0;
  let initialY = 0;
  const newInitialNodes: RF_Node<{ data: Node }>[] = [];
  for (const node of initialGraph.nodes) {
    newInitialNodes.push({ id: node.id, type: 'interface', position: { x: initialX, y: initialY }, data: { data: node } });
    initialX += 200;
    initialY += 200;
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
      target: link.targetId,
    });
  }
  return newInitialEdges;
};
