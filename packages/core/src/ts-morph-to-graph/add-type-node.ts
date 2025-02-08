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
import type { TypeAliasDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../file-utils/get-normalized-file-path.ts';
import { getTargetIds } from './get-target-ids.ts';

export function addTypeNode(tsMorphType: TypeAliasDeclaration, filePath: string, links: Link[], nodes: Node[]) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphType.getSourceFile().getFilePath());
  const typeName = tsMorphType.getName();
  const typeId = `${sourceFileRelativePath}-${typeName}`;
  const typeType: NodeType = 'type';

  const titleNode = createTitleNode(typeId, typeType, typeName);
  const attributeNodes = createAttributeNodes(tsMorphType, typeId, filePath, links);

  const node: Node = createNode({
    docs: tsMorphType
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n'),
    id: typeId,
    type: typeType,
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
  tsMorphType: TypeAliasDeclaration,
  typeId: string,
  filePath: string,
  links: Link[]
): NodeAttribute[] {
  return tsMorphType
    .getType()
    .getProperties()
    .map((prop) => {
      const propText = prop.getName();
      const attributeId = `${typeId}-${propText}`;
      const targetIds = getTargetIds(prop.getDeclarations(), filePath);

      for (const targetId of targetIds) {
        if (targetId !== null && !links.find((link) => link.sourceId === typeId && link.targetId === targetId)) {
          links.push(
            createLink({
              sourceId: typeId,
              targetId: targetId,
              type: 'association',
            })
          );
        }
      }

      return createNodeAttribute({
        id: attributeId,
        type: 'unionOption',
        text: propText,
        style: createNodeStyle(),
      });
    });
}
