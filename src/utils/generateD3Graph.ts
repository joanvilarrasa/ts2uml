import { Project } from "ts-morph";

export type D3Node = {
    id: string;
    name: string;
    type: "class" | "interface" | "other";
};

export type D3Link = {
    source: string;
    target: string;
    relationship: string;
};

export type D3Graph = {
    nodes: D3Node[];
    links: D3Link[];
};

/**
 * Generates a D3-compatible graph from a ts-morph project.
 * @param project - The ts-morph project instance.
 * @returns A D3-compatible graph (nodes and links).
 */
export function generateD3Graph(project: Project): D3Graph {
    const nodes: D3Node[] = [];
    const links: D3Link[] = [];

    project.getSourceFiles().forEach((sourceFile) => {
        sourceFile.getClasses().forEach((cls) => {
            const className = cls.getName();
            if (!className) return;

            // Add the class as a node
            nodes.push({
                id: className,
                name: className,
                type: "class",
            });

            // Add links for extends relationships
            const baseClass = cls.getBaseClass();
            if (baseClass) {
                const baseClassName = baseClass.getName();
                if (baseClassName) {
                    links.push({
                        source: className,
                        target: baseClassName,
                        relationship: "extends",
                    });
                }
            }

            // Add links for implements relationships
            cls.getImplements().forEach((impl) => {
                const interfaceName = impl.getExpression().getText();
                links.push({
                    source: className,
                    target: interfaceName,
                    relationship: "implements",
                });
            });
        });

        sourceFile.getInterfaces().forEach((iface) => {
            const interfaceName = iface.getName();
            if (!interfaceName) return;

            // Add the interface as a node
            nodes.push({
                id: interfaceName,
                name: interfaceName,
                type: "interface",
            });

            // Add links for extends relationships
            iface.getExtends().forEach((ext) => {
                const extendedInterfaceName = ext.getExpression().getText();
                links.push({
                    source: interfaceName,
                    target: extendedInterfaceName,
                    relationship: "extends",
                });
            });
        });
    });

    return { nodes, links };
}