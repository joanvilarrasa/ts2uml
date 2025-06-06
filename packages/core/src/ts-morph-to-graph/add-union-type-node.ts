import {
  type Node,
  type NodeAttribute,
  type NodeType,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import type { Type, TypeAliasDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../file-utils/get-normalized-file-path.ts';
import { getImportedName, getImportedPath } from './regex.ts';
import { isImported } from './regex.ts';

export function addUnionTypeNode(tsMorphType: TypeAliasDeclaration, filePath: string, nodes: Node[]) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphType.getSourceFile().getFilePath());
  const typeName = tsMorphType.getName();
  const typeId = `${sourceFileRelativePath}-${typeName}`;
  const typeType: NodeType = 'union';

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

      const targetId = getDescendantTargetId(prop, filePath);

      return createNodeAttribute({
        id: attributeId,
        name: propText,
        targets: targetId ? [targetId] : undefined,
        type: 'unionOption',
        text: propText,
        style: createNodeStyle(),
      });
    });
}

function getDescendantTargetId(descendant: Type, filePath: string) {
  const descendantText = descendant.getText();
  if (!isImported(descendantText) || descendant.isArray()) {
    return null;
  }
  const importText = getImportedPath(descendantText);
  if (importText === undefined) {
    return null;
  }

  const targetSourceFileRelativePath: string | null = getNormalizedFilePath(filePath, importText);
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${getImportedName(descendantText)}`;
}
