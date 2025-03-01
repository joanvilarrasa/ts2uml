import type { Node, TreeNode } from '@ts2uml/models';
import { hasChildrenToProcess } from './has-children-to-process.ts';

export function generateTOCEntries(treeNode: TreeNode, entries: string[], nodes: Node[]): void {
  // Process current node
  if (treeNode.isFolder) {
    if (hasChildrenToProcess(treeNode, nodes)) {
      entries.push(`├─ 📁/${treeNode.name}\n`);
    }
  } else if (treeNode.isElement && !treeNode.isFile) {
    const node = nodes.find((n) => n.id === treeNode.id && treeNode.checked === 'checked');
    if (node?.docs) {
      entries.push(`├─ ${node.title.text}    \`<${node.title.nodeType}>\`\n`);
    }
  }

  // Process children
  if (treeNode.children) {
    processChildrenTOC(treeNode, entries, nodes);
  }
}

function processChildrenTOC(treeNode: TreeNode, entries: string[], nodes: Node[]): void {
  if (!treeNode.children) {
    return;
  }

  for (const childNode of Object.values(treeNode.children)) {
    if (childNode.isFile && hasChildrenToProcess(childNode, nodes)) {
      // Print all the models from the file
      processFileChildrenTOC(childNode, entries, nodes);
    } else if (childNode.isFolder || childNode.isElement) {
      // Print a line
      processRegularChildTOC(childNode, entries, nodes);
    }
  }
}
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
    if (entries[i] !== '/root') {
      entries[i] = `.    ${entries[i]}`;
    }
  }
}
