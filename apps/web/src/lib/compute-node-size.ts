import { NODE_TITLE_HEIGHT } from '@/lib/constants';
import { NODE_ATTRIBUTE_HEIGHT } from '@/lib/constants';
import type { Node } from '@ts2uml/models';

export function computeNodeWidth(node: Node) {
  let maxWidth = 0;

  // Calculate title width
  const titleWidth = node.title.text.length * 10;
  maxWidth = Math.max(maxWidth, titleWidth);

  // Calculate attributes width
  for (const attribute of node.attributes) {
    const attributeWidth = attribute.text.length * 10;
    maxWidth = Math.max(maxWidth, attributeWidth);
  }

  // Add some padding to the max width
  return maxWidth + 100; // Adding 100px for padding
}

export function computeNodeHeight(node: Node) {
  return NODE_TITLE_HEIGHT + node.attributes.length * NODE_ATTRIBUTE_HEIGHT + 2; // Add 6px for border
}
