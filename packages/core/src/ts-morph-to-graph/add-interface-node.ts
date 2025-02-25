import {
  type Node,
  type NodeAttribute,
  type NodeType,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import { createNodeAttributeExtended } from '@ts2uml/models/src/types/graph/node-attribute-extended.ts';
import type { InterfaceDeclaration } from 'ts-morph';
import { getNormalizedFilePath, normalizeAndDecodePath } from '../file-utils/get-normalized-file-path.ts';
import { getTargetIds } from './get-target-ids.ts';
import { getImportedName } from './regex.ts';
import { getImportedPath } from './regex.ts';

export function addInterfaceNode(tsMorphInterface: InterfaceDeclaration, filePath: string, nodes: Node[]) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphInterface.getSourceFile().getFilePath());
  const ifaceName = tsMorphInterface.getName();
  const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
  const ifaceType: NodeType = 'interface';

  const extendedTypeIds = getExtendedTypes(tsMorphInterface, filePath).map(
    (type) => getImportedName(type.getType().getText())?.split(',')[0] ?? ''
  );
  const titleNode = createTitleNode(ifaceId, ifaceType, ifaceName);
  const attributeNodes = createAttributeNodes(tsMorphInterface, ifaceId, filePath);

  const node: Node = createNode({
    docs: tsMorphInterface
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n'),
    extends: extendedTypeIds.length > 0 ? extendedTypeIds : undefined,
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
  filePath: string
): NodeAttribute[] {
  const properties = tsMorphInterface.getProperties();
  const extendedProperties = getExtendedProperties(tsMorphInterface, filePath);

  const propertiesAttributes = properties.map((prop) => {
    const attributeId = `${ifaceId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop.getTypeNode()?.getDescendants() ?? [], filePath);

    return createNodeAttribute({
      docs: prop
        .getJsDocs()
        .map((doc) => doc.getText())
        .join('\n'),
      id: attributeId,
      name: prop.getName(),
      targets: targetIds,
      type: 'attribute',
      text: prop.getText(),
      style: createNodeStyle(),
    });
  });

  const extendedPropertiesAttributes: NodeAttribute[] = [];
  for (const extendedProperty of extendedProperties) {
    for (const attribute of extendedProperty.attributes) {
      extendedPropertiesAttributes.push(
        createNodeAttribute({
          id: `${ifaceId}-${attribute.name}`,
          extended: createNodeAttributeExtended({
            fatherNodeName: extendedProperty.extendedTypeName,
            fatherNodeId: extendedProperty.extendedTypeId,
          }),
          name: attribute.name,
          type: 'attribute',
          text: `${attribute.text}`,
          style: createNodeStyle(),
        })
      );
    }
  }

  return propertiesAttributes.concat(extendedPropertiesAttributes);
}

function getExtendedTypes(tsMorphInterface: InterfaceDeclaration, filePath: string) {
  const normalizedFilePath = normalizeAndDecodePath(filePath);
  const extendedTypes = tsMorphInterface.getExtends().filter((prop) => {
    const importedPath = normalizeAndDecodePath(getImportedPath(prop.getType().getText()) ?? '');
    const isExternal = !importedPath?.startsWith(normalizedFilePath);
    return !isExternal;
  });

  return extendedTypes;
}

function getExtendedProperties(tsMorphInterface: InterfaceDeclaration, filePath: string) {
  const extendedTypes = getExtendedTypes(tsMorphInterface, filePath);

  const extendedProperties: {
    extendedTypeId: string;
    extendedTypeName: string;
    attributes: { name: string; text: string }[];
  }[] = [];
  for (const extendedType of extendedTypes) {
    const extendedTypeName = getImportedName(extendedType.getType().getText())?.split(',')[0] ?? '';
    const extendedTypePath = getImportedPath(extendedType.getType().getText()) ?? '';
    const normalizedFilePath = getNormalizedFilePath(filePath, extendedTypePath);
    const extendedTypeProperties = extendedType.getType().getProperties();
    extendedProperties.push({
      extendedTypeId: `${normalizedFilePath}-${extendedTypeName}`,
      extendedTypeName: extendedTypeName,
      attributes: extendedTypeProperties.map((prop) => ({
        name: prop.getName(),
        text: prop.getDeclarations()[0].getText(),
      })),
    });
  }

  return extendedProperties;
}
