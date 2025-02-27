import type { Graph, Node, TreeNode } from '@ts2uml/models';
import { createTreeNodeFromGraph } from '../tree-node/create-tree-node-from-graph.ts';

const CLEAN_JSDOC_LINE_REGEX = /\/\*\*|\*\/|\//;

export function generateDocs({
  graph,
  includeAttributes = true,
  includeTOC = true,
}: {
  graph: Graph;
  title?: string;
  includeAttributes?: boolean;
  includeTOC?: boolean;
}): string {
  // Create tree structure from graph
  const treeNodes = createTreeNodeFromGraph(graph);

  // Add table of contents
  let markdown = '## Models\n\n';

  // Generate TOC entries
  if (includeTOC) {
    markdown += '\n';
    const tocEntries: string[] = [];
    for (const rootNodeKey of Object.keys(treeNodes)) {
      generateTOCEntries(treeNodes[rootNodeKey], tocEntries, graph.nodes);
    }
    // in the last entry, remove the last \n
    markdown += tocEntries.join('\n');
    markdown += '\n';
  }

  // Process tree nodes recursively
  for (const rootNodeKey of Object.keys(treeNodes)) {
    markdown += processTreeNode(treeNodes[rootNodeKey], graph.nodes, [], includeAttributes);
  }

  return markdown;
}

/**
 * Generates table of contents entries recursively
 * @param treeNode - The current tree node
 * @param entries - Array to collect TOC entries
 * @param nodes - All nodes from the graph
 */
function generateTOCEntries(treeNode: TreeNode, entries: string[], nodes: Node[]): void {
  // Process current node
  processCurrentNodeTOC(treeNode, entries, nodes);

  // Process children
  if (treeNode.children) {
    processChildrenTOC(treeNode, entries, nodes);
  }
}

/**
 * Process the current node for TOC entry
 */
function processCurrentNodeTOC(treeNode: TreeNode, entries: string[], nodes: Node[]): void {
  // Skip the root node
  if (treeNode.id === '/root') {
    return;
  }

  if (treeNode.isFolder) {
    if (hasChildrenToProcess(treeNode, nodes)) {
      entries.push(`├─ [📁/${treeNode.name}](#-${treeNode.id})\n`);
    }
  } else if (treeNode.isElement && !treeNode.isFile) {
    const node = nodes.find((n) => n.id === treeNode.id && treeNode.checked === 'checked');
    if (node?.docs) {
      entries.push(`├─ [ ${node.title.text}](#-${treeNode.id})    <${node.title.nodeType}>\n`);
    }
  }
}

function hasChildrenToProcess(treeNode: TreeNode, nodes: Node[]): boolean {
  if (!treeNode.children) {
    return false;
  }
  if (
    Object.values(treeNode.children).some((child) => {
      if (!child.isElement) {
        return hasChildrenToProcess(child, nodes);
      }
      return nodes.some((n) => n.id === child.id && child.checked === 'checked');
    })
  ) {
    return true;
  }
  return false;
}

/**
 * Process children nodes for TOC entries
 */
function processChildrenTOC(treeNode: TreeNode, entries: string[], nodes: Node[]): void {
  if (!treeNode.children) {
    return;
  }

  for (const childNode of Object.values(treeNode.children)) {
    if (childNode.isFile && childNode.children) {
      processFileChildrenTOC(childNode, entries, nodes);
    } else if (childNode.isFolder || childNode.isElement) {
      processRegularChildTOC(childNode, entries, nodes);
    }
  }
}

/**
 * Process file children for TOC entries
 */
function processFileChildrenTOC(fileNode: TreeNode, entries: string[], nodes: Node[]): void {
  if (!fileNode.children) {
    return;
  }

  for (const fileChildNode of Object.values(fileNode.children)) {
    if (fileChildNode?.isElement) {
      const currentEntryCount = entries.length;
      generateTOCEntries(fileChildNode, entries, nodes);
      for (let i = currentEntryCount; i < entries.length; i++) {
        entries[i] = `.    ${entries[i]}`;
      }
    }
  }
}

function processRegularChildTOC(childNode: TreeNode, entries: string[], nodes: Node[]): void {
  const currentEntryCount = entries.length;
  generateTOCEntries(childNode, entries, nodes);
  for (let i = currentEntryCount; i < entries.length; i++) {
    entries[i] = `.    ${entries[i]}`;
  }
}

function processTreeNode(
  treeNode: TreeNode,
  nodes: Node[],
  ancestorNodes: string[],
  includeAttributes: boolean
): string {
  let markdown = '';

  // Process children
  const childrenMarkdown = processChildren(treeNode, nodes, ancestorNodes, includeAttributes);
  // Process element node documentation
  if (treeNode.isElement && !treeNode.isFile) {
    markdown += processElementNode(treeNode, nodes, includeAttributes);
  }
  // Process folder node
  if (treeNode.id !== '/root' && treeNode.isFolder && childrenMarkdown !== '') {
    markdown += processFolderNode(treeNode, ancestorNodes, childrenMarkdown);
  }

  return markdown;
}

function processChildren(
  treeNode: TreeNode,
  nodes: Node[],
  ancestorNodes: string[],
  includeAttributes: boolean
): string {
  if (!treeNode.children) {
    return '';
  }
  let childrenMarkdown = '';
  const updatedAncestors = ancestorNodes.concat(treeNode.name);
  for (const childNode of Object.values(treeNode.children)) {
    if (childNode.isFile && childNode.children) {
      childrenMarkdown += processFileChildren(childNode, nodes, updatedAncestors, includeAttributes);
    } else if (childNode.isFolder || childNode.isElement) {
      childrenMarkdown += processTreeNode(childNode, nodes, updatedAncestors, includeAttributes);
    }
  }
  return childrenMarkdown;
}

function processFileChildren(
  fileNode: TreeNode,
  nodes: Node[],
  ancestorNodes: string[],
  includeAttributes: boolean
): string {
  let markdown = '';
  if (fileNode.children) {
    for (const fileChildNode of Object.values(fileNode.children)) {
      markdown += processTreeNode(fileChildNode, nodes, ancestorNodes, includeAttributes);
    }
  }
  return markdown;
}

function processElementNode(treeNode: TreeNode, nodes: Node[], includeAttributes: boolean): string {
  const node = nodes.find((n) => n.id === treeNode.id && treeNode.checked === 'checked');
  if (node?.docs) {
    return processNodeDocs(node, includeAttributes, treeNode.id);
  }
  return '';
}

function processFolderNode(treeNode: TreeNode, ancestorNodes: string[], childrenMarkdown: string): string {
  let markdown = `<a id="-${treeNode.id}"></a>\n`;
  markdown = '## 📁    ';

  for (const ancestorNode of ancestorNodes) {
    markdown += `/    ${ancestorNode}    `;
  }

  markdown += `/    ${treeNode.name}\n`;
  markdown += childrenMarkdown;

  return markdown;
}

function processNodeDocs(node: Node, includeAttributes: boolean, id: string): string {
  let markdown = '\n\n---\n\n';
  markdown += `<a id="-${id}"></a>\n`;
  markdown += `> ### **${node.title.text}** \`${node.title.nodeType}\`\n\n`;

  // Process node documentation
  if (node.docs) {
    const cleanDocs = cleanJSDoc(node.docs, ' \n ');
    markdown += `${cleanDocs}\n`;
  }
  // Process attributes if requested
  if (includeAttributes && node.attributes && node.attributes.length > 0 && node.attributes.some((attr) => attr.docs)) {
    markdown += '| Name | Description |\n';
    markdown += '|------|-------------|\n';

    for (const attr of node.attributes) {
      if (attr.docs) {
        const cleanedDocs = cleanJSDoc(attr.docs, ' | ');
        markdown += `| ${attr.name} | ${cleanedDocs} |\n`;
      }
    }
    markdown += '\n';
  }
  return markdown;
}

function cleanJSDoc(jsDoc: string, lineJoin: string): string {
  if (!jsDoc) {
    return '';
  }
  const cleaned = jsDoc
    .split('\n')
    .map((line) => line.replace(CLEAN_JSDOC_LINE_REGEX, '').replace(/\*/g, '').trim())
    .filter((line) => line.trim() !== '')
    .join(lineJoin);

  return cleaned;
}
