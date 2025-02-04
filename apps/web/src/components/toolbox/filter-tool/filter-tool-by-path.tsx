import { GraphManager } from '@/lib/graph-manager';
import { createTreeNodeFromGraph } from '@/lib/tree-node/create-tree-node-from-graph';
import { getLeafIds } from '@/lib/tree-node/get-leaf-ids';
import type { TreeNode } from '@ts2uml/models';
import { useEffect, useState } from 'react';
import { ScrollArea } from '../../ui/scroll-area';
import { FilterToolByPathTreeNode } from './filter-tool-by-path-tree-node';

export function FilterToolByPath() {
  const gm: GraphManager = GraphManager.getInstance();
  const [treeNodes, setTreeNodes] = useState<{
    [key: string]: TreeNode;
  }>({});

  useEffect(() => {
    const tree = createTreeNodeFromGraph(gm.getGraph());
    setTreeNodes(tree);
  }, [gm.getGraph]);

  function handleFilterByPathChange(treeNode: TreeNode) {
    let newFilteredNodes = gm.getGraph().config.nodes.filter.filter_node;
    if (treeNode.isElement) {
      newFilteredNodes = getNewFilteredNodesFromElementNodeToggle(treeNode, newFilteredNodes);
    } else {
      newFilteredNodes = getNewFilteredNodesFromFolderOrFileNodeToggle(treeNode, newFilteredNodes);
    }

    gm.updateGraph({
      config: {
        nodes: {
          filter: {
            filter_node: newFilteredNodes,
          },
        },
      },
    });
  }

  function getNewFilteredNodesFromElementNodeToggle(treeNode: TreeNode, originalFilteredNodes: string[]) {
    let newFilteredNodes = originalFilteredNodes;
    if (treeNode.checked === 'checked') {
      newFilteredNodes.push(treeNode.id);
    } else {
      newFilteredNodes = newFilteredNodes.filter((id) => id !== treeNode.id);
    }
    return newFilteredNodes;
  }

  function getNewFilteredNodesFromFolderOrFileNodeToggle(treeNode: TreeNode, originalFilteredNodes: string[]) {
    let newFilteredNodes = originalFilteredNodes;
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
    return newFilteredNodes;
  }

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
