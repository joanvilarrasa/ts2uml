import type { Node } from '@ts2uml/models';
import type { Node as RF_Node } from '@xyflow/react';

export function nodeToRFNode(node: Node, hidden: boolean): RF_Node {
  return {
    id: node.id,
    type: 'interface',
    position: node.position,
    data: { data: node },
    hidden,
  };
}
