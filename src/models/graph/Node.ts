export type NodeType = "interface" | "class" | "enum" | "type" | "function" | "variable";

export interface Node {
    id: string;
    type: NodeType;
    title: NodeTitle;
    attributes: NodeAttribute[];
}
export function getDefaultNode(data?: Partial<Node>): Node {
    return {
        id: data?.id || "",
        type: data?.type || "interface",
        title: getDefaultNodeTitle(data?.title),
        attributes: data?.attributes ? data?.attributes.map(getDefaultNodeAttribute) : [],
    };
}

export interface NodeTitle {
    nodeType: NodeType;
    text: string;
    style: Style;
}
export function getDefaultNodeTitle(data?: Partial<NodeTitle>): NodeTitle {
    return {
        nodeType: data?.nodeType || "interface",
        text: data?.text || "",
        style: getDefaultStyle(data?.style),
    };
}

export interface NodeAttribute {
    type: "attribute" | "method" | "separator" | "enumOrTypeOption";
    text: string;
    scope?: "public" | "protected" | "private";
    style: Style;
}
export function getDefaultNodeAttribute(data?: Partial<NodeAttribute>): NodeAttribute {
    return {
        type: data?.type || "attribute",
        text: data?.text || "",
        scope: data?.scope || undefined,
        style: getDefaultStyle(data?.style),
    };
}


export interface Style {
    color: string;
    fontSize: string;
    fontWeight: string;
    backgroundColor: string;
    height: string;
    width: string;
    borderWidth: string;
    borderColor: string;
}
export function getDefaultStyle(data?: Partial<Style>): Style {
    return {
        color: data?.color || "black",
        fontSize: data?.fontSize || "16px",
        fontWeight: data?.fontWeight || "normal",
        backgroundColor: data?.backgroundColor || "white",
        height: data?.height || "20px",
        width: data?.width || "100px",
        borderWidth: data?.borderWidth || "1px",
        borderColor: data?.borderColor || "black",
    };
}