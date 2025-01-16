import { isPlainObject, isString } from "is-what";
import { newNodeStyle, validateNodeStyle, type NodeStyle } from "./NodeStyle";
import { validateNodeType, type NodeType } from "./NodeType";

/**
 * Represents the title/header section of a node in the diagram.
 */
export interface NodeTitle {
    /** 
     * The type of node (class, interface, etc) 
     * @see {@link NodeType}
     */
    nodeType: NodeType;

    /**
     * The styling configuration for the title section
     * @see {@link NodeStyle}
     */
    style?: NodeStyle;

    /**
     * The text content/label displayed in the title
     */
    text: string;
}

export function validateNodeTitle(data: any): data is NodeTitle {
    if (!isPlainObject(data)) {
        console.debug("data must be a plain object, recieved: ", data);
        throw new Error("data must be a plain object");
    }
    validateNodeType(data.nodeType);    
    if (data.style !== undefined) {
        validateNodeStyle(data.style);
    }
    if (!isString(data.text)) {
        console.debug("data.text must be a string, recieved: ", data.text);
        throw new Error("text must be a string");
    }
    return true;
}

export function isNodeTitle(data: any): data is NodeTitle {
    try { return validateNodeTitle(data); }
    catch (e) { return false; }
}

export function newNodeTitle(data?: Partial<NodeTitle>): NodeTitle {
    return {
        nodeType: data?.nodeType || "interface",
        style: newNodeStyle(data?.style),
        text: data?.text || "",
    };
}

export function updateNodeTitle(nodeTitle: NodeTitle, updates: Partial<NodeTitle>): NodeTitle {
    return {
        ...nodeTitle,
        ...updates
    };
}

