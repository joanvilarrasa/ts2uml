import type { TreeNode } from '@ts2uml/models';

export function getLeafIds(tree: TreeNode): string[] {
  if (tree.isElement) {
    return [tree.id];
  }
  if (!tree.children) {
    return [];
  }
  return Object.values(tree.children).flatMap(getLeafIds);
}
