import type { Config, Node } from '@ts2uml/models';
import type { Node as RF_Node } from '@xyflow/react';

export function nodeToRFNode(node: Node, config: Config): RF_Node {
  const isHiddenByNode = config.nodes.filter.filter_node.includes(node.id);
  const isHiddenByType = config.nodes.filter.filter_type.includes(node.type);
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: { data: node },
    hidden: isHiddenByNode || isHiddenByType,
  };
}
