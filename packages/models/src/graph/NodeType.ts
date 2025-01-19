import { isString } from "is-what";

/**
 * Represents the different types of nodes that can be displayed in the diagram.
 * - "class": Represents a class definition
 * - "enum": Represents an enumeration
 * - "function": Represents a function declaration
 * - "interface": Represents an interface definition
 * - "type": Represents a type definition
 * - "variable": Represents a variable declaration
 */
export type NodeType = "class" | "enum" | "function" | "interface" | "type" | "variable";

/**
 * Array containing all valid node types that can be used in the diagram.
 * @see {@link NodeType}
 */
export const NodeTypeList: NodeType[] = ["class", "enum", "function", "interface", "type", "variable"];

export function validateNodeType(data: unknown): data is NodeType {
	if (!isString(data) || !NodeTypeList.includes(data as NodeType)) {
		console.debug("data must be a valid NodeType, recieved: ", data);
		throw new Error("data must be a valid NodeType");
	}
	return true;
}

export function isNodeType(data: unknown): data is NodeType {
	try {
		return validateNodeType(data);
	} catch (e) {
		return false;
	}
}
