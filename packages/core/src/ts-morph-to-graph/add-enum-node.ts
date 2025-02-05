import {
  type Node,
  type NodeAttribute,
  type NodeType,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import type { EnumDeclaration } from 'ts-morph';
import { getRelativeFilePath } from '../actions/get-relative-path.ts';

export function addEnumNode(tsMorphEnum: EnumDeclaration, filePath: string, nodes: Node[]) {
  const sourceFileRelativePath = getRelativeFilePath(filePath, tsMorphEnum.getSourceFile().getFilePath());
  const enumName = tsMorphEnum.getName();
  const enumId = `${sourceFileRelativePath}-${enumName}`;
  const enumType: NodeType = 'enum';

  const titleNode = createTitleNode(enumId, enumType, enumName);
  const attributeNodes = createAttributeNodes(tsMorphEnum, enumId);

  const node: Node = createNode({
    docs: tsMorphEnum
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n'),

    id: enumId,
    type: enumType,
    title: titleNode,
    attributes: attributeNodes,
  });

  nodes.push(node);
}

function createTitleNode(enumId: string, enumType: NodeType, enumName: string) {
  const titleNode = createNodeTitle({
    id: `${enumId}-TITLE`,
    nodeType: enumType,
    text: enumName,
    style: createNodeStyle(),
  });
  return titleNode;
}

function createAttributeNodes(tsMorphEnum: EnumDeclaration, enumId: string): NodeAttribute[] {
  return tsMorphEnum.getMembers().map((prop) => {
    const attributeId = `${enumId}-${prop.getName()}`;
    return createNodeAttribute({
      docs: prop
        .getJsDocs()
        .map((doc) => doc.getText())
        .join('\n'),
      id: attributeId,
      type: 'enumOrTypeOption',
      text: prop.getText(),
      style: createNodeStyle(),
    });
  });
}
