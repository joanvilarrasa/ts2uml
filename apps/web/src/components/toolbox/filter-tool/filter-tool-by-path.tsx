import { ScrollArea } from '@/components/ui/scroll-area';
import { GraphManager } from '@/lib/graph-manager';
import { createTreeNodeFromGraph } from '@ts2uml/core/src/tree-node/create-tree-node-from-graph.ts';
import { getLeafIds } from '@ts2uml/core/src/tree-node/get-leaf-ids';
import { type TreeNode, createMsgUpdateVisibleNodes } from '@ts2uml/models';
import { useEffect, useState } from 'react';
import { FilterToolByPathTreeNode } from './filter-tool-by-path-tree-node';

export function FilterToolByPath() {
  const gm: GraphManager = GraphManager.getInstance();
  const [treeNodes, setTreeNodes] = useState<{
    [key: string]: TreeNode;
  }>({});

  const [sortedTreeNodes, setSortedTreeNodes] = useState<TreeNode[]>([]);
  useEffect(() => {
    const sorted = Object.values(treeNodes).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setSortedTreeNodes(sorted);
  }, [treeNodes]);

  // Initialize the component
  useEffect(() => {
    updateTree();
  }, []);

  function updateTree() {
    const tree = createTreeNodeFromGraph(gm.getGraph());
    setTreeNodes(tree);
  }

  function handleFilterByPathChange(treeNode: TreeNode) {
    const currentFilteredNodeIds = gm.getGraph().config.nodes.filter.filter_node;
    let newFilteredNodeIds = currentFilteredNodeIds;

    if (treeNode.isElement) {
      const res = getNewFilteredNodesFromElementNodeToggle(treeNode, currentFilteredNodeIds);
      newFilteredNodeIds = res.newFilteredNodeIds;
    } else {
      const res = getNewFilteredNodesFromFolderOrFileNodeToggle(treeNode, currentFilteredNodeIds);
      newFilteredNodeIds = res.newFilteredNodeIds;
    }

    // Update the graph
    gm.updateGraph({
      config: {
        nodes: {
          filter: {
            filter_node: newFilteredNodeIds,
          },
        },
      },
    });

    updateTree();
    window.postMessage(createMsgUpdateVisibleNodes());
  }

  function getNewFilteredNodesFromElementNodeToggle(treeNode: TreeNode, originalFilteredNodes: string[]) {
    let newFilteredNodeIds = originalFilteredNodes;
    const nodeIdsToAdd: string[] = [];
    const nodeIdsToRemove: string[] = [];
    if (treeNode.checked === 'checked') {
      nodeIdsToRemove.push(treeNode.id);
      newFilteredNodeIds.push(treeNode.id);
    } else {
      nodeIdsToAdd.push(treeNode.id);
      newFilteredNodeIds = newFilteredNodeIds.filter((id) => id !== treeNode.id);
    }

    return { newFilteredNodeIds, nodeIdsToAdd, nodeIdsToRemove };
  }

  function getNewFilteredNodesFromFolderOrFileNodeToggle(treeNode: TreeNode, originalFilteredNodes: string[]) {
    let newFilteredNodeIds = originalFilteredNodes;
    const leafIdsOfTreeNode = getLeafIds(treeNode);
    const nodeIdsToAdd: string[] = [];
    const nodeIdsToRemove: string[] = [];
    // If the node is checked it means we want to remove all children from the graph, so add them to the nodesToRemove array
    if (treeNode.checked === 'checked') {
      for (const leafId of leafIdsOfTreeNode) {
        if (!newFilteredNodeIds.includes(leafId)) {
          nodeIdsToRemove.push(leafId);
          newFilteredNodeIds.push(leafId);
        }
      }
    } else {
      newFilteredNodeIds = newFilteredNodeIds.filter((id) => {
        if (leafIdsOfTreeNode.includes(id)) {
          nodeIdsToAdd.push(id);
          return false;
        }
        return true;
      });
    }
    return { newFilteredNodeIds, nodeIdsToAdd, nodeIdsToRemove };
  }

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <span className="text-xs">{'By folder / file / node'}</span>
      <ScrollArea className="h-80 max-h-80 pr-4">
        {sortedTreeNodes.map((node) => (
          <FilterToolByPathTreeNode key={node.id} tree={node} onClick={handleFilterByPathChange} />
        ))}
      </ScrollArea>
    </div>
  );
}
