import type { Graph, Node, TreeNode } from '@ts2uml/models';
import { createTreeNodeFromGraph } from '../tree-node/create-tree-node-from-graph.ts';

/**
 * Generates markdown documentation from JSDoc comments in a graph
 * @param options - Options for generating documentation
 * @param options.graph - The graph containing nodes with JSDoc comments
 * @param options.title - Optional title for the documentation (defaults to "API Documentation")
 * @param options.includeAttributes - Whether to include node attributes in the documentation (defaults to true)
 * @returns The generated markdown documentation
 */
export function generateDocs({
  graph,
  title = 'API Documentation',
  includeAttributes = true,
}: {
  graph: Graph;
  title?: string;
  includeAttributes?: boolean;
}): string {
  // Create tree structure from graph
  const treeNodes = createTreeNodeFromGraph(graph);

  // Start building markdown
  let markdown = `# ${title}\n\n`;

  // Add table of contents
  markdown += '## Models\n\n';

  // Generate TOC entries
  const tocEntries: string[] = [];
  for (const rootNodeKey of Object.keys(treeNodes)) {
    generateTOCEntries(treeNodes[rootNodeKey], tocEntries, graph.nodes);
  }

  // Add TOC entries to markdown
  markdown += tocEntries.join('\n');
  markdown += '\n\n---\n\n'; // Add separator after TOC

  // Process tree nodes recursively
  for (const rootNodeKey of Object.keys(treeNodes)) {
    markdown += processTreeNode(treeNodes[rootNodeKey], graph.nodes, 0, includeAttributes);
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
  // Skip the root node
  if (treeNode.id !== '/root') {
    if (treeNode.isFolder) {
      // Add folder as a section
      const folderLink = treeNode.name.toLowerCase().replace(/\s+/g, '-');
      entries.push(`- [📁 ${treeNode.name}](#-${folderLink})`);
    } else if (treeNode.isElement && !treeNode.isFile) {
      // Add element as a subsection
      const node = nodes.find((n) => n.id === treeNode.id);
      if (node?.docs) {
        const elementLink = node.title.text.toLowerCase().replace(/\s+/g, '-');
        entries.push(`- [📄 ${node.title.text}](#-${elementLink}-${node.type.toLowerCase()})`);
      }
    }
  }

  // Process children if they exist
  if (treeNode.children) {
    // Sort children: folders first, then elements (ignoring files)
    const sortedChildKeys = Object.keys(treeNode.children).sort((a, b) => {
      const nodeA = treeNode.children?.[a];
      const nodeB = treeNode.children?.[b];

      if (nodeA && nodeB) {
        // Only consider folders vs non-folders
        if (nodeA.isFolder && !nodeB.isFolder) {
          return -1;
        }
        if (!nodeA.isFolder && nodeB.isFolder) {
          return 1;
        }
      }

      return a.localeCompare(b);
    });

    for (const childKey of sortedChildKeys) {
      const childNode = treeNode.children[childKey];

      if (childNode) {
        // Process files differently - don't generate TOC for the file itself
        // but still process its children (elements inside the file)
        if (childNode.isFile) {
          // Process children of files without generating TOC for the file
          if (childNode.children) {
            for (const fileChildKey of Object.keys(childNode.children)) {
              const fileChildNode = childNode.children[fileChildKey];
              if (fileChildNode?.isElement) {
                // Add indentation for nested elements
                const currentEntryCount = entries.length;
                generateTOCEntries(fileChildNode, entries, nodes);

                // Add indentation to the entries that were just added
                for (let i = currentEntryCount; i < entries.length; i++) {
                  entries[i] = `  ${entries[i]}`; // Add two spaces for indentation
                }
              }
            }
          }
        } else if (childNode.isFolder || childNode.isElement) {
          // Process folders and elements normally with indentation
          const currentEntryCount = entries.length;
          generateTOCEntries(childNode, entries, nodes);

          // Add indentation to the entries that were just added
          for (let i = currentEntryCount; i < entries.length; i++) {
            entries[i] = `  ${entries[i]}`; // Add two spaces for indentation
          }
        }
      }
    }
  }
}

function processTreeNode(treeNode: TreeNode, nodes: Node[], level: number, includeAttributes: boolean): string {
  let markdown = '';
  // Skip the root node heading
  if (treeNode.id !== '/root' && treeNode.isFolder) {
    markdown += `## 📁 ${treeNode.name}\n\n`;
  }

  // If this is an element node, add its documentation
  if (treeNode.isElement && !treeNode.isFile) {
    const node = nodes.find((n) => n.id === treeNode.id);
    if (node?.docs) {
      markdown += processNodeDocs(node, includeAttributes);
    }
  }

  // Process children if they exist
  if (treeNode.children) {
    // Sort children: folders first, then elements (ignoring files)
    const sortedChildKeys = Object.keys(treeNode.children).sort((a, b) => {
      const nodeA = treeNode.children?.[a];
      const nodeB = treeNode.children?.[b];

      if (nodeA && nodeB) {
        // Only consider folders vs non-folders
        if (nodeA.isFolder && !nodeB.isFolder) {
          return -1;
        }
        if (!nodeA.isFolder && nodeB.isFolder) {
          return 1;
        }
      }

      return a.localeCompare(b);
    });

    for (const childKey of sortedChildKeys) {
      const childNode = treeNode.children[childKey];

      if (childNode) {
        // Process files differently - don't generate markdown for the file itself
        // but still process its children (elements inside the file)
        if (childNode.isFile) {
          // Process children of files without generating markdown for the file
          if (childNode.children) {
            for (const fileChildKey of Object.keys(childNode.children)) {
              const fileChildNode = childNode.children[fileChildKey];
              if (fileChildNode?.isElement) {
                markdown += processTreeNode(fileChildNode, nodes, level, includeAttributes);
              }
            }
          }
        } else if (childNode.isFolder || childNode.isElement) {
          // Process folders and elements normally
          markdown += processTreeNode(childNode, nodes, level, includeAttributes);
        }
      }
    }
  }

  return markdown;
}

function processNodeDocs(node: Node, includeAttributes: boolean): string {
  let markdown = '';

  // Add element name with code icon and file name
  markdown += `### 📄 **${node.title.text}** \`${node.type}\`\n\n`;

  // Process node documentation
  if (node.docs) {
    const cleanDocs = cleanJSDoc(node.docs);
    markdown += '#### Description\n\n';
    markdown += `${cleanDocs}\n\n`;
  }

  // Process attributes if requested
  if (includeAttributes && node.attributes && node.attributes.length > 0) {
    markdown += '#### Properties\n\n';
    markdown += '| Name | Description |\n';
    markdown += '|------|-------------|\n';

    for (const attr of node.attributes) {
      if (!attr.docs) {
        continue;
      }

      const name = attr.name || 'Unnamed';

      // Get the raw docs
      const rawDocs = attr.docs || '';

      // Just take the first line of the documentation
      const firstLine = rawDocs.split('\n')[0];

      // Clean the first line
      const cleanedDocs = firstLine
        .replace(/\/\*\*|\*\/|^\s*\*\s?/gm, '') // Remove JSDoc markers
        .replace(/\|/g, '\\|') // Escape pipe characters
        .trim();

      markdown += `| ${name} | ${cleanedDocs} |\n`;
    }

    markdown += '\n';
  }

  return markdown;
}

/**
 * Infers the node type based on naming conventions
 * @param typeName - The name of the type
 * @returns The inferred node type
 */
function inferNodeType(typeName: string): string {
  if (
    typeName.endsWith('Type') ||
    typeName.endsWith('Algorithm') ||
    typeName.includes('Status') ||
    typeName.startsWith('Msg')
  ) {
    return 'union';
  }

  if (typeName.startsWith('I') && /^I[A-Z]/.test(typeName)) {
    return 'interface';
  }

  if (/^[A-Z][a-z]/.test(typeName)) {
    return 'interface';
  }

  return 'interface';
}

/**
 * Cleans JSDoc comments by removing comment markers and extra whitespace
 * @param jsDoc - The JSDoc comment to clean
 * @returns The cleaned JSDoc text
 */
function cleanJSDoc(jsDoc: string): string {
  if (!jsDoc) {
    return '';
  }

  // First, remove the JSDoc comment markers
  let cleaned = jsDoc.replace(/\/\*\*|\*\/|^\s*\*\s?/gm, '').trim();

  // Split by lines to process each line individually
  const lines = cleaned.split('\n');

  // Process each line to remove trailing slashes and clean up
  const processedLines = lines.map((line) => {
    // Remove trailing slashes and whitespace
    return line
      .replace(/\s*\/+\s*$/, '') // Remove trailing slashes with whitespace
      .trim();
  });

  // Join the lines back together
  cleaned = processedLines.join('\n');

  // Normalize multiple newlines
  cleaned = cleaned.replace(/\n\s*\n/g, '\n\n');

  // Process JSDoc tags separately
  // Split the content by JSDoc tags to process them individually
  const docParts = cleaned.split(/(@\w+)/);
  const description = docParts[0].trim();
  let tagContent = '';

  // Process JSDoc tags
  for (let i = 1; i < docParts.length; i += 2) {
    const tag = docParts[i];
    const value = i + 1 < docParts.length ? docParts[i + 1].trim() : '';

    if (tag === '@see') {
      // Just include the see reference without trying to make it a link
      tagContent += `**See:** ${value.replace(/{@link\s+([^}]+)}/g, '$1')}\n\n`;
    } else if (tag === '@example') {
      tagContent += `**Example:**\n\`\`\`typescript\n${value}\n\`\`\`\n\n`;
    } else if (tag === '@default') {
      tagContent += `**Default:** ${value}\n\n`;
    } else if (tag) {
      // Handle other tags
      tagContent += `**${tag.substring(1)}:** ${value}\n\n`;
    }
  }

  // Combine the description and tag content
  cleaned = tagContent ? `${description}\n\n${tagContent}` : description;

  // Additional cleanup for any remaining issues
  cleaned = cleaned
    .replace(/\/$/gm, '') // Remove trailing slashes at the end of lines
    .replace(/\s*\/\s*$/gm, '') // Remove trailing slashes with whitespace
    .replace(/\s*\/\s*\n/gm, '\n') // Remove trailing slashes before newlines
    .replace(/\n\s*\//gm, '\n') // Remove leading slashes after newlines
    .replace(/([^\n])\s*\/\s*\n/g, '$1\n') // Remove trailing slashes at the end of lines
    .trim();

  // Remove any link references that might break the table
  cleaned = cleaned
    // Remove "link: Type}" format
    .replace(/link:\s*([A-Za-z0-9_]+)}/g, '')
    // Remove "**link:** Type}" format
    .replace(/\*\*link:\*\*\s*([A-Za-z0-9_]+)}/g, '')
    // Remove "**link:** Type" format
    .replace(/\*\*link:\*\*\s*([A-Za-z0-9_]+)/g, '')
    // Handle the specific format in the documentation
    .replace(/\n\[([A-Za-z0-9_]+)\].*?\)/g, '')
    // Escape any remaining pipe characters
    .replace(/\|/g, '\\|');

  return cleaned;
}
