import type { Config, Graph, Link, Node } from '@ts2uml/models';
import type { EnumDeclaration, InterfaceDeclaration, Project, TypeAliasDeclaration } from 'ts-morph';
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
    sourceFile.getClasses().map((cls) => {
      addClassNode(cls, filePath, links, nodes);
    });

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

  // [START] TEMP for development
  links = links.filter((link) => {
    if (!nodes.some((node) => node.id === link.sourceId)) {
      return false;
    }
    if (!nodes.some((node) => node.id === link.targetId)) {
      return false;
    }
    return true;
  });
  // [END] TEMP for development

  return { nodes, links, config };
}
