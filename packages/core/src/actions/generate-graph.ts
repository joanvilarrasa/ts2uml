import {
  type Config,
  type Graph,
  type Link,
  type Node,
  type NodeAttribute,
  type NodeType,
  createLink,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import type { InterfaceDeclaration, Project, PropertySignature } from 'ts-morph';
import { getRelativeFilePath } from './get-relative-path.ts';

const IMPORT_REGEX = /import\("(.*?)"\)/;

export function generateGraph(project: Project, filePath: string, config: Config): Graph {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Iterate over all source files in the project
  project.getSourceFiles().map((sourceFile) => {
    sourceFile.getInterfaces().map((iface) => {
      const { ifaceId, ifaceType, nodeTitle } = createInterfaceMetadata(iface, filePath);
      const attributeNodes = createAttributeNodes(iface, ifaceId, filePath, links);

      const node: Node = createNode({
        docs: iface
          .getJsDocs()
          .map((doc) => doc.getText())
          .join('\n'),
        id: ifaceId,
        type: ifaceType,
        title: nodeTitle,
        attributes: attributeNodes,
      });

      nodes.push(node);
    });
  });

  return { nodes, links, config };
}

function createInterfaceMetadata(iface: InterfaceDeclaration, filePath: string) {
  const sourceFileRelativePath = getRelativeFilePath(filePath, iface.getSourceFile().getFilePath());
  const ifaceName = iface.getName();
  const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
  const ifaceType: NodeType = 'interface';

  // Create title
  const nodeTitle = createNodeTitle({
    id: `${sourceFileRelativePath}-${ifaceName}-TITLE`,
    nodeType: ifaceType,
    text: ifaceName,
    style: createNodeStyle(),
  });

  return { ifaceId, ifaceType, nodeTitle };
}

function createAttributeNodes(
  iface: InterfaceDeclaration,
  ifaceId: string,
  filePath: string,
  links: Link[]
): NodeAttribute[] {
  return iface.getProperties().map((prop) => {
    const attributeId = `${ifaceId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop, filePath);

    // Push the links
    targetIds.map((targetId) => {
      if (!links.find((link) => link.sourceId === ifaceId && link.targetId === targetId)) {
        links.push(
          createLink({
            sourceId: ifaceId,
            targetId: targetId,
            type: 'association',
          })
        );
      }
    });

    return createNodeAttribute({
      docs: prop
        .getJsDocs()
        .map((doc) => doc.getText())
        .join('\n'),
      id: attributeId,
      type: 'attribute',
      text: prop.getText(),
      style: createNodeStyle(),
    });
  });
}

function getTargetIds(prop: PropertySignature, filePath: string): string[] {
  const targetIds: string[] = [];
  const descendants = prop.getTypeNode()?.getDescendants() ?? [];

  for (const descendant of descendants) {
    const descendantText = descendant.getType().getText();
    if (descendantText.startsWith('import(') && !descendant.getType().isArray()) {
      const importText = descendantText.match(IMPORT_REGEX)?.[1];
      if (importText) {
        const targetSourceFileRelativePath = getRelativeFilePath(filePath, importText);
        const targetId = `${targetSourceFileRelativePath}-${descendant.getText()}`;
        if (!targetIds.includes(targetId)) {
          targetIds.push(targetId);
        }
      }
    }
  }

  return targetIds;
}
