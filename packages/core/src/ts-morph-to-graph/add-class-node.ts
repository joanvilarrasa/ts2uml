import {
  type Node,
  type NodeAttribute,
  type NodeType,
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle,
} from '@ts2uml/models';
import type { ClassDeclaration } from 'ts-morph';
import { getNormalizedFilePath } from '../file-utils/get-normalized-file-path.ts';
import { getTargetIds } from './get-target-ids.ts';

export function addClassNode(tsMorphClass: ClassDeclaration, filePath: string, nodes: Node[]) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphClass.getSourceFile().getFilePath());
  const className = tsMorphClass.getName();
  const classId = `${sourceFileRelativePath}-${className}`;
  const classType: NodeType = 'class';

  const titleNode = createTitleNode(classId, classType, className ?? '');
  const attributes = createAttributeNodes(tsMorphClass, classId, filePath);
  const methods = createMethodNodes(tsMorphClass, classId, filePath);

  const attributeNodes = attributes.concat(methods);

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

function createAttributeNodes(tsMorphClass: ClassDeclaration, classId: string, filePath: string): NodeAttribute[] {
  return tsMorphClass.getProperties().map((prop) => {
    const attributeId = `${classId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop.getTypeNode()?.getDescendants() ?? [], filePath);
    const tsMorphScope = prop.getScope();

    // Push the links
    // targetIds.map((targetId) => {
    //   if (targetId !== classId && !links.find((link) => link.sourceId === classId && link.targetId === targetId)) {
    //     links.push(
    //       createLink({
    //         sourceId: classId,
    //         targetId: targetId,
    //         type: 'association',
    //       })
    //     );
    //   }
    // });

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
      scope: tsMorphScope,
      style: createNodeStyle(),
    });
  });
}

function createMethodNodes(tsMorphClass: ClassDeclaration, classId: string, filePath: string): NodeAttribute[] {
  return tsMorphClass.getMethods().map((method) => {
    const methodId = `${classId}-${method.getName()}`;
    const targetIds = getTargetIds(method.getParameters() ?? [], filePath);
    const tsMorphScope = method.getScope();

    return createNodeAttribute({
      docs: method
        .getJsDocs()
        .map((doc) => doc.getText())
        .join('\n'),

      id: methodId,
      isStatic: method.isStatic() ? true : undefined,
      name: method.getName(),
      targets: targetIds,
      type: 'method',
      text: method.removeBody().getText(),
      scope: tsMorphScope,
      style: createNodeStyle(),
    });
  });
}
