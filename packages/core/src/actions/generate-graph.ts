import {
  type Config,
  type Graph,
  type Link,
  type Node,
  type NodeAttribute,
  type NodeStyle,
  type NodeTitle,
  ZLink,
  ZNode,
  ZNodeAttribute,
  ZNodeStyle,
  ZNodeTitle,
  create,
} from '@ts2uml/models';
import type { Project } from 'ts-morph';
import { getRelativeFilePath } from './get-relative-path.ts';

const IMPORT_REGEX = /import\("(.*?)"\)/;

export function generateGraph(project: Project, filePath: string, config: Config): Graph {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Iterate over all source files in the project
  project.getSourceFiles().map((sourceFile) => {
    sourceFile.getInterfaces().map((iface) => {
      const sourceFileRelativePath = getRelativeFilePath(filePath, sourceFile.getFilePath());
      const ifaceName = iface.getName();
      const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
      const ifaceType = 'interface';

      // Create title
      const nodeTitle = create<NodeTitle>(
        {
          nodeType: ifaceType,
          text: ifaceName,
          style: create<NodeStyle>({}, ZNodeStyle),
        },
        ZNodeTitle
      );

      // Create attributes
      const attributeNodes: NodeAttribute[] = iface.getProperties().map((prop, index) => {
        const sourcePortId = `${ifaceId}-${prop.getName()}`;
        const targetIds: string[] = [];

        // This is some weird shit to know if the type is basic or not
        const descendands = prop.getTypeNode()?.getDescendants() ?? [];
        for (const descendant of descendands) {
          const descendantText = descendant.getType().getText();
          if (descendantText.startsWith('import(') && !descendant.getType().isArray()) {
            // get the text that inside the import(" ... ")
            const importText = descendantText.match(IMPORT_REGEX)?.[1];
            if (importText) {
              const targetSourceFileRelativePath = getRelativeFilePath(filePath, importText);
              const targetId = `${targetSourceFileRelativePath}-${descendant.getText()}`;
              if (targetIds.indexOf(targetId) === -1) {
                targetIds.push(targetId);
              }
            }
          }
        }

        // Push the links
        for (const targetId of targetIds) {
          links.push(
            create<Link>(
              {
                sourceId: ifaceId,
                sourcePortId: sourcePortId,
                targetId: targetId,
                type: 'association',
              },
              ZLink
            )
          );
        }

        return create<NodeAttribute>(
          {
            type: 'attribute',
            text: prop.getText(),
            style: create<NodeStyle>({}, ZNodeStyle),
          },
          ZNodeAttribute
        );
      });

      const node: Node = create<Node>(
        {
          id: `${ifaceId}`,
          type: 'interface',
          title: nodeTitle,
          attributes: attributeNodes,
        },
        ZNode
      );

      nodes.push(node);
    });
  });

  return { nodes, links, config };
}
