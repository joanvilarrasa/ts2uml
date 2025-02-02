import { CheckboxPartial } from '@/components/checkbox-partial';
import type { TreeNode } from '@ts2uml/models';
import { ChevronRight, Folder } from 'lucide-react';
import { CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import { Collapsible } from '../../ui/collapsible';
import { FilterToolByPathTreeNode } from './filter-tool-by-path-tree-node';

export function FilterToolByPathTreeNodeFolder({
  tree,
  onClick,
}: { tree: TreeNode; onClick: (treeNode: TreeNode) => void }) {
  return (
    <Collapsible key={tree.id} defaultOpen={true}>
      <div className="flex items-center justify-start gap-2">
        <CollapsibleTrigger asChild className="chevron-right-collapsible-icon">
          <ChevronRight className="chevron-icon h-4 w-4" />
        </CollapsibleTrigger>
        <CheckboxPartial checked={tree.checked} onClick={() => onClick(tree)} />
        <div className="flex items-center justify-start gap-1">
          <span className="whitespace-nowrap text-sm">{tree.name}</span>
          <Folder className="h-3 w-3" />
        </div>
      </div>
      <CollapsibleContent className="pl-4">
        {tree.children &&
          Object.values(tree.children).map((child) => (
            <FilterToolByPathTreeNode key={child.id} tree={child} onClick={onClick} />
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
