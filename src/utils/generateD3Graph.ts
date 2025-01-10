import { Project } from "ts-morph";
import { Link } from "../models/graph/Link";
import { getDefaultNode, getDefaultNodeAttribute, getDefaultNodeTitle, getDefaultStyle, Node, NodeAttribute } from "../models/graph/Node";

export type D3StructuredGraph = {
    nodes: Node[];
    links: Link[];
};

/**
 * Generates a D3-structured graph from a ts-morph project, processing only interfaces.
 * @param project - The ts-morph project instance.
 * @returns A D3-structured graph (nodes and links).
 */
export function generateD3Graph(project: Project): D3StructuredGraph {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Iterate over all source files in the project
    project.getSourceFiles().forEach((sourceFile) => {
        sourceFile.getInterfaces().forEach((iface) => {
            const ifaceName = iface.getName();
            const ifaceId = `${sourceFile.getBaseName()}-${ifaceName}`;
            const ifaceType = "interface";

            // Create title
            const nodeTitle = getDefaultNodeTitle({
                nodeType: ifaceType,
                text: ifaceName,
                style: getDefaultStyle(),
            });

            // Create attributes
            const attributeNodes: NodeAttribute[] = iface.getProperties().map((prop, index) => {
                return getDefaultNodeAttribute({
                    type: "attribute",
                    text: prop.getNameNode().getText(),
                    style: getDefaultStyle(),
                });
            });

            const node: Node = getDefaultNode({
                id: `${ifaceId}-node`,
                type: "interface",
                title: nodeTitle,
                attributes: attributeNodes,
            });

            nodes.push(node);
        });
    });

    return { nodes, links };
}
