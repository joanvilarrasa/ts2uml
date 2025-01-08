import { Project, PropertyDeclaration, MethodDeclaration } from "ts-morph";

export type D3Node = {
    id: string;
    name: string;
    type: "title" | "attribute" | "method";
    groupId: string;
};

export type D3Link = {
    source: string;
    target: string;
    relationship: string;
};

export type D3Group = {
    groupId: string;
    nodes: D3Node[];
};

export type D3StructuredGraph = {
    groups: D3Group[];
    links: D3Link[];
};

/**
 * Determines if a type is basic (e.g., string, number, etc.)
 * @param typeName - The name of the type to check.
 * @returns True if the type is basic, false otherwise.
 */
function isBasicType(typeName: string): boolean {
    const basicTypes = ["string", "number", "boolean", "any", "void", "undefined", "null"];
    return basicTypes.includes(typeName.toLowerCase());
}

/**
 * Maps a ts-morph visibility keyword to our representation.
 * @param member - The class or interface member.
 * @returns The visibility as "public", "private", or "protected".
 */
function getVisibility(member: PropertyDeclaration | MethodDeclaration): "public" | "private" | "protected" {
    return (member.getScope() as "public" | "private" | "protected") || "public";
}

/**
 * Generates a D3-structured graph from a ts-morph project, processing only interfaces.
 * @param project - The ts-morph project instance.
 * @returns A D3-structured graph (groups and links).
 */
export function generateD3Graph(project: Project): D3StructuredGraph {
    const groups: D3Group[] = [];
    const links: D3Link[] = [];

    project.getSourceFiles().forEach((sourceFile) => {
        sourceFile.getInterfaces().forEach((iface) => {
            const interfaceName = iface.getName();
            if (!interfaceName) return;

            const groupId = `${interfaceName}-group`;

            // Create the title node
            const titleNode: D3Node = {
                id: `${interfaceName}-title`,
                name: interfaceName,
                type: "title",
                groupId,
            };

            // Create attribute nodes
            const attributeNodes: D3Node[] = iface.getProperties().map((prop, index) => ({
                id: `${interfaceName}-attr-${index}`,
                name: prop.getName(),
                type: "attribute",
                groupId,
            }));

            // Create method nodes
            const methodNodes: D3Node[] = iface.getMethods().map((method, index) => ({
                id: `${interfaceName}-method-${index}`,
                name: method.getName(),
                type: "method",
                groupId,
            }));

            // Add the group
            groups.push({
                groupId,
                nodes: [titleNode, ...attributeNodes, ...methodNodes],
            });

            // Add links for extends relationships
            iface.getExtends().forEach((ext) => {
                const extendedInterfaceName = ext.getExpression().getText();
                links.push({
                    source: `${interfaceName}-title`,
                    target: `${extendedInterfaceName}-title`,
                    relationship: "extends",
                });
            });

            // Add links for attributes referencing other types
            attributeNodes.forEach((attrNode, i) => {
                const attrType = iface.getProperties()[i]?.getTypeNode()?.getText() || "any";
                if (!isBasicType(attrType)) {
                    links.push({
                        source: attrNode.id,
                        target: `${attrType}-title`,
                        relationship: "has",
                    });
                }
            });
        });
    });

    return { groups, links };
}
