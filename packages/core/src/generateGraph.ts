import { newLink, newNode, newNodeAttribute, newNodeStyle, newNodeTitle, type Config, type Link, type Node, type NodeAttribute, type Graph } from "@ts2uml/models";
import { Project } from "ts-morph";
import { getRelativeFilePath } from "./getRelativePath";

export function generateGraph(project: Project, filePath: string, config: Config): Graph {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Iterate over all source files in the project
    project.getSourceFiles().forEach((sourceFile) => {
        sourceFile.getInterfaces().forEach((iface) => {
            const sourceFileRelativePath = getRelativeFilePath(filePath, sourceFile.getFilePath())
            const ifaceName = iface.getName();
            const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
            const ifaceType = "interface";

            // Create title
            const nodeTitle = newNodeTitle({
                nodeType: ifaceType,
                text: ifaceName,
                style: newNodeStyle(),
            });

            // Create attributes
            const attributeNodes: NodeAttribute[] = iface.getProperties().map((prop, index) => {
                const sourcePortId = `${ifaceId}-${prop.getName()}`;
                const targetIds = [];

                // This is some weird shit to know if the type is basic or not
                const descendands = prop.getTypeNode()?.getDescendants() ?? [];
                for (const descendant of descendands) {
                    const descendantText = descendant.getType().getText();
                    if (descendantText.startsWith("import(") && !descendant.getType().isArray()) {
                        // get the text that inside the import(" ... ")
                        const importText = descendantText.match(/import\(\"(.*?)\"\)/)?.[1];
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
                    links.push(newLink({
                        sourceId: ifaceId,
                        sourcePortId: sourcePortId,
                        targetId: targetId,
                        type: "association",
                    }))
                }

                return newNodeAttribute({
                    type: "attribute",
                    text: prop.getText(),
                    style: newNodeStyle(),
                });
            });

            const node: Node = newNode({
                id: `${ifaceId}`,
                type: "interface",
                title: nodeTitle,
                attributes: attributeNodes,
            });

            nodes.push(node);
        });
    });

    return { nodes, links };
}