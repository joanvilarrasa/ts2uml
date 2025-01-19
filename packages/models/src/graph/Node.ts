import { isArray, isPlainObject, isString } from "is-what";
import { newNodeTitle, validateNodeTitle, type NodeTitle } from "./NodeTitle";
import { newNodeStyle, validateNodeStyle, type NodeStyle } from "./NodeStyle";
import { newNodeAttribute, validateNodeAttribute, type NodeAttribute } from "./NodeAttribute";
import { validateNodeType, type NodeType } from "./NodeType";

/**
 * Represents a node in the diagram, which can be a class, interface, type, enum, function, or variable.
 */
export interface Node {
	/**
	 * Array of attributes, methods, or other items displayed in the node body
	 * @see {@link NodeAttribute}
	 */
	attributes: NodeAttribute[];

	/** Unique identifier for the node */
	id: string;

	/**
	 * Optional styling configuration for the node
	 * @see {@link NodeStyle}
	 */
	style?: NodeStyle;

	/**
	 * The title/header section of the node
	 * @see {@link NodeTitle}
	 */
	title: NodeTitle;

	/**
	 * The type of node (class, interface, etc)
	 * @see {@link NodeType}
	 */
	type: NodeType;
}

export function validateNode(data: unknown): data is Node {
	if (!isPlainObject(data)) {
		console.debug("data must be a plain object, recieved: ", data);
		throw new Error("data must be a plain object");
	}
	if (data.attributes !== undefined) {
		if (!isArray(data.attributes)) {
			console.debug("data.attributes must be an array, recieved: ", data.attributes);
			throw new Error("attributes must be an array");
		}
		for (const attribute of data.attributes) {
			validateNodeAttribute(attribute);
		}
	}
	if (!isString(data.id)) {
		console.debug("data.id must be a string, recieved: ", data.id);
		throw new Error("id must be a string");
	}
	if (data.style !== undefined) {
		validateNodeStyle(data.style);
	}
	validateNodeTitle(data.title);
	validateNodeType(data.type);
	return true;
}

export function isNode(data: unknown): data is Node {
	try {
		return validateNode(data);
	} catch (e) {
		return false;
	}
}

export function newNode(data?: Partial<Node>): Node {
	return {
		id: data?.id || "",
		type: data?.type || "interface",
		title: newNodeTitle(data?.title),
		attributes: data?.attributes ? data?.attributes.map(newNodeAttribute) : [],
		style: newNodeStyle(data?.style),
	};
}

export function updateNode(node: Node, updates: Partial<Node>): Node {
	return {
		...node,
		...updates,
	};
}
