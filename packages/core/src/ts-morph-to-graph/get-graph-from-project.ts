import type { Config, Graph, Link, Node } from '@ts2uml/models';
import { createLink } from '@ts2uml/models';
import type { ClassDeclaration, EnumDeclaration, InterfaceDeclaration, Project, TypeAliasDeclaration } from 'ts-morph';
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
    // console.log('sourceFile', sourceFile.getFilePath());

    // Interfaces
    const tsMorphInterfaces: InterfaceDeclaration[] = sourceFile.getInterfaces();
    for (const tsMorphInterface of tsMorphInterfaces) {
      addInterfaceNode(tsMorphInterface, filePath, links, nodes);
    }

    // Classes
    const tsMorphClasses: ClassDeclaration[] = sourceFile.getClasses();
    for (const tsMorphClass of tsMorphClasses) {
      addClassNode(tsMorphClass, filePath, links, nodes);
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
        addUnionTypeNode(tsMorphType, filePath, links, nodes);
      } else {
        addTypeNode(tsMorphType, filePath, links, nodes);
      }
    }
  }

  addExtendedLinks(links, nodes);

  links = filterErroneousLinks(links, nodes);

  return { nodes, links, config };
}

// Find all the attributes that are extended from other attributes and create links from the extended attributes to the extended type
// TODO I HAVE TO RETHINK ALL OF THIS TO MAKE IT MORE EFFICIENT!!! THIS IS OME VERYSHITTY CODE (STORE MORE INFO ON THE NODES I GUESS)
function addExtendedLinks(links: Link[], nodes: Node[]): void {
  for (const node of nodes) {
    for (const attribute of node.attributes) {
      if (attribute.extendedFrom) {
        const originalLink = links.find(
          (link) =>
            link.sourceId === attribute.extendedFrom &&
            link.sourceAttributeIds.some((id) => id.endsWith(attribute.id.split('-').at(-1) ?? ''))
        );
        if (originalLink) {
          links.push(
            createLink({
              sourceId: node.id,
              targetId: originalLink.targetId,
              type: 'association',
              sourceAttributeIds: [attribute.id],
            })
          );
        }
      }
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
