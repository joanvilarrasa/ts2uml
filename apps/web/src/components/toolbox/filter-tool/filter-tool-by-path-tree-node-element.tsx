import { CheckboxPartial } from '@/components/checkbox-partial';
import type { TreeNode } from '@ts2uml/models';
import { ChevronsUpDown, Code } from 'lucide-react';

export function FilterToolByPathTreeNodeElement({
  tree,
  onClick,
}: {
  tree: TreeNode;
  onClick: (treeNode: TreeNode) => void;
}) {
  return (
    <div className="flex items-center justify-start gap-2" key={tree.id}>
      <ChevronsUpDown className="h-4 w-4 text-transparent" />
      <CheckboxPartial checked={tree.checked} onClick={() => onClick(tree)} />
      <div className="flex items-center justify-start gap-1">
        <span className="whitespace-nowrap text-sm">{tree.name}</span>

        <Code className="h-3 w-3" />
      </div>
    </div>
  );
}
