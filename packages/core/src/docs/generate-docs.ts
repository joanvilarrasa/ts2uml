import type { Graph, Node, TreeNode } from '@ts2uml/models';
import { createTreeNodeFromGraph } from '../tree-node/create-tree-node-from-graph.ts';
import { generateTOCEntries } from './generate-toc-entries.ts';
import { hasChildrenToProcess } from './has-children-to-process.ts';

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
  let treeNodes = createTreeNodeFromGraph(graph);
  // remove the root node
  while (Object.keys(treeNodes).length === 1 && treeNodes.root !== undefined) {
    treeNodes = treeNodes.root.children ?? {};
  }

  // Add a title
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
  if (treeNode.isFolder && hasChildrenToProcess(treeNode, nodes)) {
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
    return processNodeDocs(node, includeAttributes);
  }
  return '';
}

function processFolderNode(treeNode: TreeNode, ancestorNodes: string[], childrenMarkdown: string): string {
  let markdown = '## 📁    ';

  for (const ancestorNode of ancestorNodes) {
    if (ancestorNode !== '/.') {
      markdown += `/    ${ancestorNode}    `;
    }
  }

  markdown += `/    ${treeNode.name}\n`;
  markdown += childrenMarkdown;

  return markdown;
}

function processNodeDocs(node: Node, includeAttributes: boolean): string {
  let markdown = '\n\n---\n\n';
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
