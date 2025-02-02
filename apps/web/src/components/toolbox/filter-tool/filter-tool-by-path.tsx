import { useGraph } from '@/contexts/graph-context';
import { createTreeNodeFromGraph } from '@/utils/tree-node/create-tree-node-from-graph';
import { getLeafIds } from '@/utils/tree-node/get-leaf-ids';
import type { TreeNode } from '@ts2uml/models';
import { useEffect, useState } from 'react';
import { ScrollArea } from '../../ui/scroll-area';
import { FilterToolByPathTreeNode } from './filter-tool-by-path-tree-node';

export function FilterToolByPath() {
  const { graph, updateGraph } = useGraph();
  const [treeNodes, setTreeNodes] = useState<{
    [key: string]: TreeNode;
  }>({});

  useEffect(() => {
    const tree = createTreeNodeFromGraph(graph);
    setTreeNodes(tree);
  }, [graph]);

  const handleFilterByPathChange = (treeNode: TreeNode) => {
    let newFilteredNodes = graph.config.nodes.filter.filter_node;
    if (treeNode.isElement) {
      if (treeNode.checked === 'checked') {
        newFilteredNodes.push(treeNode.id);
      } else {
        newFilteredNodes = newFilteredNodes.filter((id) => id !== treeNode.id);
      }
    } else {
      const filteredLeafIds = getLeafIds(treeNode);
      if (treeNode.checked === 'checked') {
        for (const leafId of filteredLeafIds) {
          if (!newFilteredNodes.includes(leafId)) {
            newFilteredNodes.push(leafId);
          }
        }
      } else {
        newFilteredNodes = newFilteredNodes.filter((id) => !filteredLeafIds.includes(id));
      }
    }

    updateGraph({
      config: {
        nodes: {
          filter: {
            filter_node: newFilteredNodes,
          },
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <span className="text-xs">By path</span>
      <ScrollArea className="h-72 pr-4">
        <div className="flex flex-col items-start justify-start">
          {Object.values(treeNodes).map((node) => (
            <FilterToolByPathTreeNode key={node.id} tree={node} onClick={handleFilterByPathChange} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
