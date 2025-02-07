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
import type { Type, TypeAliasDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../actions/get-normalized-file-path.ts';
import { getImportedName, getImportedPath } from './regex.ts';
import { isImported } from './regex.ts';

export function addUnionTypeNode(tsMorphType: TypeAliasDeclaration, filePath: string, links: Link[], nodes: Node[]) {
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
    .getUnionTypes()
    .map((prop) => {
      let propText = prop.getText().replace(/^['"]|['"]$/g, '');
      let attributeId = `${typeId}-${propText}`;

      const targetId = getDefaultDescendantTargetId(prop, filePath);
      if (targetId !== null) {
        propText = getImportedName(prop.getText()) ?? 'error';
        attributeId = `${typeId}-${propText}`;
        if (!links.find((link) => link.sourceId === typeId && link.targetId === targetId)) {
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
        type: 'enumOrTypeOption',
        text: propText,
        style: createNodeStyle(),
      });
    });
}

function getDefaultDescendantTargetId(descendant: Type, filePath: string) {
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
