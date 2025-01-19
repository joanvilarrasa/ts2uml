import { isPlainObject, isString } from "is-what";
import { isNodeStyle, newNodeStyle, validateNodeStyle, type NodeStyle } from "./NodeStyle";

/**
 * Represents the different types of attributes that can be displayed in a node.
 * - "attribute": Represents a class/interface property or field
 * - "enumOrTypeOption": Represents an enum value or type union option
 * - "method": Represents a class/interface method or function
 * - "separator": Represents a visual separator line
 */
export type NodeAttributeType = "attribute" | "enumOrTypeOption" | "method" | "separator";

/**
 * Array containing all valid node attribute types that can be used.
 * @see {@link NodeAttributeType}
 */
export const NodeAttributeTypeList: NodeAttributeType[] = ["attribute", "enumOrTypeOption", "method", "separator"];

export function validateNodeAttributeType(data: unknown): data is NodeAttributeType {
	if (!isString(data) || !NodeAttributeTypeList.includes(data as NodeAttributeType)) {
		console.debug("data must be a valid NodeAttributeType, recieved: ", data);
		throw new Error("data must be a valid NodeAttributeType");
	}
	return true;
}

export function isNodeAttributeType(data: unknown): data is NodeAttributeType {
	try {
		return validateNodeAttributeType(data);
	} catch (e) {
		return false;
	}
}

/**
 * Represents the visibility/access level of a node attribute.
 * - "private": Attribute is only accessible within the class
 * - "protected": Attribute is only accessible to the class and its subclasses
 * - "public": Attribute is publicly accessible
 */
export type NodeAttributeScope = "private" | "protected" | "public";

/**
 * Array containing all valid node attribute scopes that can be used.
 * @see {@link NodeAttributeScope}
 */
export const NodeAttributeScopeList: NodeAttributeScope[] = ["private", "protected", "public"];

export function validateNodeAttributeScope(data: unknown): data is NodeAttributeScope {
	if (!isString(data) || !NodeAttributeScopeList.includes(data as NodeAttributeScope)) {
		console.debug("data must be a valid NodeAttributeScope, recieved: ", data);
		throw new Error("data must be a valid NodeAttributeScope");
	}
	return true;
}

export function isNodeAttributeScope(data: unknown): data is NodeAttributeScope {
	try {
		return validateNodeAttributeScope(data);
	} catch (e) {
		return false;
	}
}

/**
 * Represents an attribute or method within a node in the diagram.
 */
export interface NodeAttribute {
	/**
	 * The visibility/access level of the attribute (public, protected, private)
	 * @see {@link NodeAttributeScope}
	 */
	scope?: NodeAttributeScope;

	/**
	 * The styling configuration for this attribute
	 * @see {@link NodeStyle}
	 */
	style?: NodeStyle;

	/**
	 * The text content/label of the attribute
	 */
	text: string;

	/**
	 * The type of attribute (attribute, method, separator, etc)
	 * @see {@link NodeAttributeType}
	 */
	type: NodeAttributeType;
}

export function validateNodeAttribute(data: unknown): data is NodeAttribute {
	if (!isPlainObject(data)) {
		console.debug("data must be a plain object, recieved: ", data);
		throw new Error("data must be a plain object");
	}
	if (data.scope !== undefined) {
		validateNodeAttributeScope(data.scope);
	}
	if (data.style !== undefined) {
		validateNodeStyle(data.style);
	}
	if (!isString(data.text)) {
		console.debug("data.text must be a string, recieved: ", data.text);
		throw new Error("text must be a string");
	}
	validateNodeAttributeType(data.type);
	return true;
}

export function isNodeAttribute(data: unknown): data is NodeAttribute {
	try {
		return validateNodeAttribute(data);
	} catch (e) {
		return false;
	}
}

export function newNodeAttribute(data?: Partial<NodeAttribute>): NodeAttribute {
	return {
		scope: data?.scope || undefined,
		style: newNodeStyle(data?.style),
		text: data?.text || "",
		type: data?.type || "attribute",
	};
}

export function updateNodeAttribute(nodeAttribute: NodeAttribute, updates: Partial<NodeAttribute>): NodeAttribute {
	return {
		...nodeAttribute,
		...updates,
	};
}
