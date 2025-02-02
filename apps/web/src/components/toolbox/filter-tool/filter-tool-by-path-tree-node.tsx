import type { TreeNode } from '@ts2uml/models';
import { FilterToolByPathTreeNodeElement } from './filter-tool-by-path-tree-node-element';
import { FilterToolByPathTreeNodeFile } from './filter-tool-by-path-tree-node-file';
import { FilterToolByPathTreeNodeFolder } from './filter-tool-by-path-tree-node-folder';

export function FilterToolByPathTreeNode({ tree, onClick }: { tree: TreeNode; onClick: (treeNode: TreeNode) => void }) {
  if (tree.isFolder) {
    return <FilterToolByPathTreeNodeFolder tree={tree} onClick={onClick} />;
  }
  if (tree.isFile) {
    return <FilterToolByPathTreeNodeFile tree={tree} onClick={onClick} />;
  }
  return <FilterToolByPathTreeNodeElement tree={tree} onClick={onClick} />;
}
