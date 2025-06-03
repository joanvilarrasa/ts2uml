import { type Config, type Graph, type Link, type Node, type NodeAttribute, createLink } from '@ts2uml/models';
import type {
  ClassDeclaration,
  EnumDeclaration,
  InterfaceDeclaration,
  ModuleDeclaration,
  Project,
  TypeAliasDeclaration,
} from 'ts-morph';
import { addEnumNode } from './add-enum-node.ts';
import { addUnionTypeNode } from './add-union-type-node.ts';

import { addInterfaceNode } from '../ts-morph-to-graph/add-interface-node.ts';
import { addClassNode } from './add-class-node.ts';
import { addTypeNode } from './add-type-node.ts';

export function getGraphFromProject(project: Project, filePath: string, config: Config): Graph {
  const nodes: Node[] = [];
  let links: Link[] = [];

  // Iterate over all source files in the project
  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    // Process namespaces and their contents
    const tsMorphNamespaces: ModuleDeclaration[] = sourceFile.getModules();
    for (const tsMorphNamespace of tsMorphNamespaces) {
      // Process interfaces inside namespace
      const interfaces = tsMorphNamespace.getInterfaces();
      for (const iface of interfaces) {
        addInterfaceNode(iface, filePath, nodes);
      }

      // Process classes inside namespace
      const classes = tsMorphNamespace.getClasses();
      for (const cls of classes) {
        addClassNode(cls, filePath, nodes);
      }

      // Process enums inside namespace
      const enums = tsMorphNamespace.getEnums();
      for (const enum_ of enums) {
        addEnumNode(enum_, filePath, nodes);
      }

      // Process types inside namespace
      const types = tsMorphNamespace.getTypeAliases();
      for (const type of types) {
        if (type.getType().isUnion()) {
          addUnionTypeNode(type, filePath, nodes);
        } else {
          addTypeNode(type, filePath, nodes);
        }
      }
    }

    // Process top-level declarations
    // Interfaces
    const tsMorphInterfaces: InterfaceDeclaration[] = sourceFile.getInterfaces();
    for (const tsMorphInterface of tsMorphInterfaces) {
      addInterfaceNode(tsMorphInterface, filePath, nodes);
    }

    // Classes
    const tsMorphClasses: ClassDeclaration[] = sourceFile.getClasses();
    for (const tsMorphClass of tsMorphClasses) {
      addClassNode(tsMorphClass, filePath, nodes);
    }

    // Enums
    const tsMorphEnums: EnumDeclaration[] = sourceFile.getEnums();
    for (const tsMorphEnum of tsMorphEnums) {
      addEnumNode(tsMorphEnum, filePath, nodes);
    }

    // Types
    const tsMorphTypes: TypeAliasDeclaration[] = sourceFile.getTypeAliases();
    for (const tsMorphType of tsMorphTypes) {
      if (tsMorphType.getType().isUnion()) {
        addUnionTypeNode(tsMorphType, filePath, nodes);
      } else {
        addTypeNode(tsMorphType, filePath, nodes);
      }
    }
  }

  computeExtendedAttributes(nodes);
  computeLinks(nodes, links);

  links = filterErroneousLinks(links, nodes);

  return { nodes, links, config };
}

function computeExtendedAttributes(nodes: Node[]): void {
  for (const node of nodes) {
    // Maybe test moving this a level up for performance later
    const fatherNodeCache: { [key: string]: Node } = {};
    for (const attribute of node.attributes) {
      // Build the target Ids for the links if it is extended
      if (attribute.extended) {
        const { ancestorName, ancestorId, targets } = getAttributeAncestorAndTargets(fatherNodeCache, attribute, nodes);
        attribute.extended.ancestorNodeId = ancestorId;
        attribute.extended.ancestorNodeName = ancestorName;
        attribute.targets = targets;
      }
    }
  }
}

function getAttributeAncestorAndTargets(
  fatherNodeCache: { [key: string]: Node },
  attribute: NodeAttribute,
  nodes: Node[]
): { ancestorName: string; ancestorId: string; targets: string[] | undefined } {
  if (!attribute.extended) {
    const ancestorIdList = attribute.id.split('-');
    ancestorIdList.pop(); // Remove the last part (the NodeAttribute name)
    const ancestorId = ancestorIdList.join('-');
    return { ancestorName: ancestorIdList.at(-1) ?? '', ancestorId, targets: attribute.targets };
  }

  let fatherNode: Node | undefined = fatherNodeCache[attribute.extended?.fatherNodeId ?? 'WRONG_ID'];
  if (!fatherNode) {
    fatherNode = nodes.find((node) => node.id === attribute.extended?.fatherNodeId);
    if (fatherNode) {
      fatherNodeCache[fatherNode.id] = fatherNode;
    }
  }
  if (fatherNode) {
    const fatherAttribute = fatherNode.attributes.find((attr) => attr.name === attribute?.name);
    if (fatherAttribute) {
      return getAttributeAncestorAndTargets(fatherNodeCache, fatherAttribute, nodes);
    }
  }
  return { ancestorName: '', ancestorId: '', targets: undefined };
}

function computeLinks(nodes: Node[], links: Link[]): void {
  for (const node of nodes) {
    // Handle attribute links
    for (const attribute of node.attributes) {
      computeAttributeLinks(attribute, links, node.id);
    }

    // Handle interface implementations
    if (node.implements && node.implements.length > 0) {
      for (const interfaceId of node.implements) {
        const link = links.find((link) => link.sourceId === node.id && link.targetId === interfaceId);
        if (link) {
          // Link already exists, update its type if needed
          if (link.type !== 'implements') {
            link.type = 'implements';
          }
        } else {
          const newLink = createLink({
            sourceId: node.id,
            targetId: interfaceId,
            sourceAttributeIds: [],
            type: 'implements',
          });
          links.push(newLink);
        }
      }
    }

    // Handle class inheritance
    if (node.extends && node.extends.length > 0) {
      for (const baseClassId of node.extends) {
        const link = links.find((link) => link.sourceId === node.id && link.targetId === baseClassId);
        if (link) {
          // Link already exists, update its type if needed
          if (link.type !== 'inheritance') {
            link.type = 'inheritance';
          }
        } else {
          const newLink = createLink({
            sourceId: node.id,
            targetId: baseClassId,
            sourceAttributeIds: [],
            type: 'inheritance',
          });
          links.push(newLink);
        }
      }
    }
  }
}

function computeAttributeLinks(attribute: NodeAttribute, links: Link[], nodeId: string): void {
  if (attribute.targets === undefined || attribute.targets.length === 0) {
    return;
  }
  for (const target of attribute.targets) {
    const link = links.find((link) => link.sourceId === nodeId && link.targetId === target);
    if (link) {
      link.sourceAttributeIds.push(attribute.id);
    } else {
      const newLink = createLink({
        sourceId: nodeId,
        targetId: target,
        sourceAttributeIds: [attribute.id],
        type: 'association',
      });
      links.push(newLink);
    }
  }
}

function filterErroneousLinks(links: Link[], nodes: Node[]): Link[] {
  return links.filter((link) => {
    if (!nodes.some((node) => node.id === link.sourceId)) {
      return false;
    }
    if (!nodes.some((node) => node.id === link.targetId)) {
      return false;
    }
    return true;
  });
}
