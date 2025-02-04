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

  // Initialize the component
  useEffect(() => {
    updateTree();
  }, []);

  function updateTree() {
    const tree = createTreeNodeFromGraph(gm.getGraph());
    setTreeNodes(tree);
  }

  function sendUpdateVisibleNodesMsg(nodeIdsToAdd: string[], nodeIdsToRemove: string[]) {
    window.postMessage({
      type: 'update-visible-nodes',
      data: {
        nodeIdsToAdd,
        nodeIdsToRemove,
      },
    });
  }

  function handleFilterByPathChange(treeNode: TreeNode) {
    const currentFilteredNodeIds = gm.getGraph().config.nodes.filter.filter_node;
    let newFilteredNodeIds = currentFilteredNodeIds;
    let nodeIdsToAdd: string[] = [];
    let nodeIdsToRemove: string[] = [];

    if (treeNode.isElement) {
      const res = getNewFilteredNodesFromElementNodeToggle(treeNode, currentFilteredNodeIds);
      newFilteredNodeIds = res.newFilteredNodeIds;
      nodeIdsToAdd = res.nodeIdsToAdd;
      nodeIdsToRemove = res.nodeIdsToRemove;
    } else {
      const res = getNewFilteredNodesFromFolderOrFileNodeToggle(treeNode, currentFilteredNodeIds);
      newFilteredNodeIds = res.newFilteredNodeIds;
      nodeIdsToAdd = res.nodeIdsToAdd;
      nodeIdsToRemove = res.nodeIdsToRemove;
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
    sendUpdateVisibleNodesMsg(nodeIdsToAdd, nodeIdsToRemove);
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
