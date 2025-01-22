import { z } from "zod";

/**
 * Represents the different types of nodes that can be displayed in the diagram.
 * - "class": Represents a class definition
 * - "enum": Represents an enumeration
 * - "function": Represents a function declaration
 * - "interface": Represents an interface definition
 * - "type": Represents a type definition
 * - "variable": Represents a variable declaration
 */
export enum NodeType {
	class = "class",
	enum = "enum",
	function = "function",
	interface = "interface",
	type = "type",
	variable = "variable",
}



/**
 * Array containing all valid node types that can be used in the diagram.
 * @see {@link NodeType}
 */
export const NodeTypeList: NodeType[] = Object.values(NodeType);

