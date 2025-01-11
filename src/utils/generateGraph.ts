import { Project } from "ts-morph";
import { Link } from "../models/graph/Link";
import { getDefaultNode, getDefaultNodeAttribute, getDefaultNodeTitle, getDefaultStyle, Node, NodeAttribute } from "../models/graph/Node";
import { Config } from "../models/Config";

function getRelativeFilePath(basePath: string, sourceFilePath: string) {
    // Normalize paths for cross-platform compatibility
    const normalizedBasePath = basePath.replace(/\\/g, "/");
    const normalizedSourceFilePath = sourceFilePath.replace(/\\/g, "/");

    // Replace base path in source file path
    let relativePath = normalizedSourceFilePath.startsWith(normalizedBasePath)
        ? normalizedSourceFilePath.replace(normalizedBasePath, "")
        : normalizedSourceFilePath;

    // Remove the file extension
    relativePath = relativePath.replace(/\.[^/.]+$/, ""); // Regex to match and remove the extension

    return relativePath;
}

export type Graph = {
    nodes: Node[];
    links: Link[];
};

/**
 * Generates a D3-structured graph from a ts-morph project, processing only interfaces.
 * @param project - The ts-morph project instance.
 * @returns A D3-structured graph (nodes and links).
 */
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
            const nodeTitle = getDefaultNodeTitle({
                nodeType: ifaceType,
                text: ifaceName,
                style: getDefaultStyle(),
            });

            // Create attributes
            const attributeNodes: NodeAttribute[] = iface.getProperties().map((prop, index) => {
                const sourcePortId = `${ifaceId}-${prop.getName()}`;
                const targetIds = [];
                
                // This is some weird shit to know if the type is basic or not
                const descendands = prop.getTypeNode()?.getDescendants() ?? [];
                for(const descendant of descendands) {
                    const descendantText = descendant.getType().getText();
                    if(descendantText.startsWith("import(") && !descendant.getType().isArray()) {
                        // get the text that inside the import(" ... ")
                        const importText = descendantText.match(/import\(\"(.*?)\"\)/)?.[1];
                        if(importText) {
                            const targetSourceFileRelativePath = getRelativeFilePath(filePath, importText);
                            const targetId = `${targetSourceFileRelativePath}-${descendant.getText()}`;
                            if(targetIds.indexOf(targetId) === -1) {
                                targetIds.push(targetId);
                            }
                        }
                    }
                }

                // Push the links
                for(const targetId of targetIds) {
                    links.push({
                        sourceId: ifaceId,
                        sourcePortId: sourcePortId,
                        targetId: targetId,
                        type: "association",
                    })
                }
                
                return getDefaultNodeAttribute({
                    type: "attribute",
                    text: prop.getText(),
                    style: getDefaultStyle(),
                });
            });

            const node: Node = getDefaultNode({
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
