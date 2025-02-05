import {
  type Link,
  type Node,
  type NodeAttribute,
  type NodeType,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import type { TypeAliasDeclaration } from 'ts-morph';
import { getRelativeFilePath } from '../actions/get-relative-path.ts';

export function addTypeNode(tsMorphType: TypeAliasDeclaration, filePath: string, links: Link[], nodes: Node[]) {
  const sourceFileRelativePath = getRelativeFilePath(filePath, tsMorphType.getSourceFile().getFilePath());
  const typeName = tsMorphType.getName();
  const typeId = `${sourceFileRelativePath}-${typeName}`;
  const typeType: NodeType = 'type';

  const titleNode = createTitleNode(typeId, typeType, typeName);
  const attributeNodes = createAttributeNodes(tsMorphType, typeId, filePath);

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

function createAttributeNodes(tsMorphType: TypeAliasDeclaration, typeId: string, filePath: string): NodeAttribute[] {
  return tsMorphType
    .getType()
    .getUnionTypes()
    .map((prop) => {
      const propText = prop.getText().replace(/^['"]|['"]$/g, '');
      const attributeId = `${typeId}-${propText}`;

      return createNodeAttribute({
        id: attributeId,
        type: 'attribute',
        text: propText,
        style: createNodeStyle(),
      });
    });
}
