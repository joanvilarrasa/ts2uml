import type { Graph, Node, TreeNode } from '@ts2uml/models';

export function createTreeNodeFromGraph(graph: Graph): { [key: string]: TreeNode } {
  const innerTree: { [key: string]: TreeNode } = {};

  const nodes = graph.nodes.filter((node) => !graph.config.nodes.filter.filter_type.includes(node.type));
  const pathFilterList = graph.config.nodes.filter.filter_node;

  for (const node of nodes) {
    const idClean = node.id.startsWith('/') ? node.id.slice(1) : node.id;

    // Check if invalid id
    const lastDashIndex = idClean.lastIndexOf('-');
    if (lastDashIndex === -1) {
      continue;
    }

    // The part before the last dash is the file path.
    const filePath = idClean.substring(0, lastDashIndex);
    // The part after the last dash is the element name.
    const elementName = idClean.substring(lastDashIndex + 1);

    // Split the filePath into parts. These parts represent folders and the last part is the file.
    const pathParts = filePath.split('/');

    // This variable will be used to traverse the tree.
    let currentLevel = innerTree;
    let pathPartId = '';

    for (let index = 0; index < pathParts.length; index++) {
      const pathPart = pathParts[index];

      if (pathPartIsFolder(index, pathParts)) {
        pathPartId = `${pathPartId}/${pathPart}`;

        createTreeNodeFolderIfNotExists(currentLevel, pathPart, pathPartId);

        // Move deeper into the tree.
        currentLevel = currentLevel[pathPart].children || {};
      } else {
        pathPartId = `${pathPartId}/${pathPart}`;
        // The last part is treated as the file.
        createTreeNodeFileIfNotExists(currentLevel, pathPart, pathPartId);
        // Now attach the element (using its id as key) under the file.
        createTreeNodeElementInFileTreeNode(currentLevel[pathPart], node, pathFilterList, elementName);
      }
    }
  }

  // go down the tree and set the checked status of the children
  for (const node of Object.values(innerTree)) {
    computeTreeCheckedStatus(node);
  }

  // Create the root level tree with a single "root" node containing all other nodes
  const rootTree: { [key: string]: TreeNode } = {
    root: {
      id: '/root',
      checked: 'checked',
      children: innerTree,
      name: './',
      isFolder: true,
      isFile: false,
      isElement: false,
    },
  };

  // Compute the checked status for the root node
  computeTreeCheckedStatus(rootTree.root);

  return rootTree;
}

function createTreeNodeFolderIfNotExists(
  currentLevel: {
    [key: string]: TreeNode;
  },
  pathPart: string,
  pathPartId: string
) {
  if (!currentLevel[pathPart]) {
    currentLevel[pathPart] = {
      id: pathPartId,
      checked: 'checked',
      children: {},
      name: pathPart,
      isFolder: true,
      isFile: false,
      isElement: false,
    };
  }
}

function createTreeNodeFileIfNotExists(
  currentLevel: {
    [key: string]: TreeNode;
  },
  pathPart: string,
  pathPartId: string
) {
  if (!currentLevel[pathPart]) {
    currentLevel[pathPart] = {
      id: pathPartId,
      checked: 'checked',
      children: {},
      name: pathPart,
      isFolder: false,
      isFile: true,
      isElement: false,
    };
  }
}

function createTreeNodeElementInFileTreeNode(
  fileTreeNode: TreeNode,
  node: Node,
  pathFilterList: string[],
  elementName: string
) {
  if (fileTreeNode.children === undefined) {
    fileTreeNode.children = {};
  }

  fileTreeNode.children[elementName] = {
    id: node.id,
    checked: pathFilterList.includes(node.id) ? 'unchecked' : 'checked',
    name: elementName,
    isFolder: false,
    isFile: false,
    isElement: true,
  };
}

function pathPartIsFolder(index: number, pathParts: string[]) {
  return index < pathParts.length - 1;
}

function computeTreeCheckedStatus(tree: TreeNode): void {
  if (tree.isElement || !tree.children) {
    return;
  }

  let numChecked = 0;
  let numUnchecked = 0;
  let numPartial = 0;

  for (const child of Object.values(tree.children)) {
    computeTreeCheckedStatus(child);
    if (child.checked === 'checked') {
      numChecked++;
    } else if (child.checked === 'unchecked') {
      numUnchecked++;
    } else {
      numPartial++;
    }
  }

  if (numPartial > 0) {
    tree.checked = 'partial';
  } else if (numChecked > 0 && numUnchecked > 0) {
    tree.checked = 'partial';
  } else if (numUnchecked > 0) {
    tree.checked = 'unchecked';
  } else {
    tree.checked = 'checked';
  }
}
