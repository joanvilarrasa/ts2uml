import type { Config, Node } from '@ts2uml/models';
import type { Node as RF_Node } from '@xyflow/react';
import { isNodeHidden } from './is-node-hidden';

export function nodeToRFNode(node: Node, config: Config): RF_Node {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: { data: node },
    hidden: isNodeHidden(node, config),
  };
}
