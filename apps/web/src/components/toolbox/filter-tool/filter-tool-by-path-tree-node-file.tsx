import { CheckboxPartial } from '@/components/checkbox-partial';
import type { TreeNode } from '@ts2uml/models';
import { ChevronRight, ChevronsUpDown, Code, FileCode } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import { Collapsible } from '../../ui/collapsible';
import { FilterToolByPathTreeNode } from './filter-tool-by-path-tree-node';

export function FilterToolByPathTreeNodeFile({
  tree,
  onClick,
}: { tree: TreeNode; onClick: (treeNode: TreeNode) => void }) {
  const [sortedTreeNodes, setSortedTreeNodes] = useState<TreeNode[]>([]);
  useEffect(() => {
    const sorted = Object.values(tree.children).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setSortedTreeNodes(sorted);
  }, [tree.children]);

  if (Object.keys(tree.children).length === 1) {
    const childTree = Object.values(tree.children)[0];
    return (
      <div className="flex items-center justify-start gap-2" key={tree.id}>
        <ChevronsUpDown className="h-4 w-4 text-transparent" />
        <CheckboxPartial checked={tree.checked} onClick={() => onClick(childTree)} />
        <div className="flex items-center justify-start gap-1">
          <span className="whitespace-nowrap text-sm">{`${childTree.name}`}</span>
          <FileCode className="h-3 w-3" />

          <Code className="h-3 w-3" />
        </div>
      </div>
    );
  }
  return (
    <Collapsible key={tree.id} defaultOpen={true}>
      <div className="flex items-center justify-start gap-2">
        <CollapsibleTrigger asChild>
          <div className="chevron-right-collapsible-icon">
            <ChevronRight className="chevron-icon h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CheckboxPartial checked={tree.checked} onClick={() => onClick(tree)} />
        <div className="flex items-center justify-start gap-1">
          <span className="whitespace-nowrap text-sm">{tree.name}</span>
          <FileCode className="h-3 w-3" />
        </div>
      </div>
      <CollapsibleContent className="pl-4">
        {sortedTreeNodes.map((child) => (
          <FilterToolByPathTreeNode key={child.id} tree={child} onClick={onClick} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
