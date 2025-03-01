import type { Node, TreeNode } from '@ts2uml/models';

export function hasChildrenToProcess(treeNode: TreeNode, nodes: Node[]): boolean {
  if (!treeNode.children) {
    return false;
  }
  if (
    Object.values(treeNode.children).some((child) => {
      if (!child.isElement) {
        return hasChildrenToProcess(child, nodes);
      }
      return nodes.some((n) => n.id === child.id && child.checked === 'checked');
    })
  ) {
    return true;
  }
  return false;
}
