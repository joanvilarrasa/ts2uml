import {
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
import type { InterfaceDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../actions/get-normalized-file-path.ts';
import { getTargetIds } from './get-target-ids.ts';

export function addInterfaceNode(
  tsMorphInterface: InterfaceDeclaration,
  filePath: string,
  links: Link[],
  nodes: Node[]
) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphInterface.getSourceFile().getFilePath());
  const ifaceName = tsMorphInterface.getName();
  const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
  const ifaceType: NodeType = 'interface';

  const titleNode = createTitleNode(ifaceId, ifaceType, ifaceName);
  const attributeNodes = createAttributeNodes(tsMorphInterface, ifaceId, filePath, links);

  const node: Node = createNode({
    docs: tsMorphInterface
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n'),
    id: ifaceId,
    type: ifaceType,
    title: titleNode,
    attributes: attributeNodes,
  });

  nodes.push(node);
}

function createTitleNode(ifaceId: string, ifaceType: NodeType, ifaceName: string) {
  const titleNode = createNodeTitle({
    id: `${ifaceId}-TITLE`,
    nodeType: ifaceType,
    text: ifaceName,
    style: createNodeStyle(),
  });

  return titleNode;
}

function createAttributeNodes(
  tsMorphInterface: InterfaceDeclaration,
  ifaceId: string,
  filePath: string,
  links: Link[]
): NodeAttribute[] {
  return tsMorphInterface.getProperties().map((prop) => {
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
