import { CHAR_WIDTH, NODE_ATTRIBUTE_HEIGHT, NODE_TITLE_HEIGHT, type Node } from '@ts2uml/models';

export function computeNodeWidth(node: Node) {
  let maxWidth = 0;

  // Calculate title width
  const titleWidth = node.title.text.length * CHAR_WIDTH;
  maxWidth = Math.max(maxWidth, titleWidth);

  // Calculate attributes width
  for (const attribute of node.attributes) {
    let length = attribute.text.length;
    if (attribute.extended) {
      length += attribute.extended.ancestorNodeName?.length ?? 0;
      length += 2;
    }
    const attributeWidth = length * CHAR_WIDTH;

    maxWidth = Math.max(maxWidth, attributeWidth);
  }

  // Add some padding to the max width
  return maxWidth + 100; // Adding 100px for padding
}

export function computeNodeHeight(node: Node) {
  return NODE_TITLE_HEIGHT + node.attributes.length * NODE_ATTRIBUTE_HEIGHT + 8; // Add 6px for border
}
