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
import type { ClassDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../file-utils/get-normalized-file-path.ts';
import { getTargetIds } from './get-target-ids.ts';

export function addClassNode(tsMorphClass: ClassDeclaration, filePath: string, links: Link[], nodes: Node[]) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphClass.getSourceFile().getFilePath());
  const className = tsMorphClass.getName();
  const classId = `${sourceFileRelativePath}-${className}`;
  const classType: NodeType = 'interface';

  const titleNode = createTitleNode(classId, classType, className ?? '');
  const attributes = createAttributeNodes(tsMorphClass, classId, filePath, links);
  const methods = createMethodNodes(tsMorphClass, classId, filePath, links);
  const separator = createNodeAttribute({ id: `${classId}-SEPARATOR`, type: 'separator' });

  const attributeNodes = attributes.concat([separator]).concat(methods);

  const node: Node = createNode({
    docs: tsMorphClass
      .getJsDocs()
      .map((doc) => doc.getText())
      .join('\n'),

    id: classId,
    type: classType,
    title: titleNode,
    attributes: attributeNodes,
  });

  nodes.push(node);
}

function createTitleNode(classId: string, classType: NodeType, className: string) {
  const titleNode = createNodeTitle({
    id: `${classId}-TITLE`,
    nodeType: classType,
    text: className,
    style: createNodeStyle(),
  });

  return titleNode;
}

function createAttributeNodes(
  tsMorphClass: ClassDeclaration,
  classId: string,
  filePath: string,
  links: Link[]
): NodeAttribute[] {
  return tsMorphClass.getProperties().map((prop) => {
    const attributeId = `${classId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop.getTypeNode()?.getDescendants() ?? [], filePath);
    const tsMorphScope = prop.getScope();

    // Push the links
    targetIds.map((targetId) => {
      if (targetId !== classId && !links.find((link) => link.sourceId === classId && link.targetId === targetId)) {
        links.push(
          createLink({
            sourceId: classId,
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
      scope: tsMorphScope,
      style: createNodeStyle(),
    });
  });
}

function createMethodNodes(
  tsMorphClass: ClassDeclaration,
  classId: string,
  filePath: string,
  links: Link[]
): NodeAttribute[] {
  return tsMorphClass.getMethods().map((method) => {
    const methodId = `${classId}-${method.getName()}`;
    const targetIds = getTargetIds(method.getParameters() ?? [], filePath);
    const tsMorphScope = method.getScope();
    // Push the links
    targetIds.map((targetId) => {
      if (!links.find((link) => link.sourceId === classId && link.targetId === targetId)) {
        links.push(
          createLink({
            sourceId: classId,
            targetId: targetId,
            type: 'association',
          })
        );
      }
    });

    return createNodeAttribute({
      docs: method
        .getJsDocs()
        .map((doc) => doc.getText())
        .join('\n'),

      id: methodId,
      isStatic: method.isStatic() ? true : undefined,
      type: 'method',
      text: method.removeBody().getText(),
      scope: tsMorphScope,
      style: createNodeStyle(),
    });
  });
}
