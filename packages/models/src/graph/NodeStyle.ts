import { isPlainObject, isString } from "is-what";

/**
 * Represents the styling configuration for an element inside a node in the diagram.
 */
export interface NodeStyle {
	/**
	 * The background color of the node element
	 */
	backgroundColor: string;

	/**
	 * The border color of the node element
	 */
	borderColor: string;

	/**
	 * The border width of the node element
	 */
	borderWidth: string;

	/**
	 * The text color of the node element
	 */
	color: string;

	/**
	 * The font size of text within the node element
	 */
	fontSize: string;

	/**
	 * The font weight of text within the node element
	 */
	fontWeight: string;

	/**
	 * The height of the node element
	 */
	height: string;

	/**
	 * The width of the node element
	 */
	width: string;
}

export function validateNodeStyle(data: unknown): data is NodeStyle {
	if (!isPlainObject(data)) {
		console.debug("data must be a plain object, recieved: ", data);
		throw new Error("data must be a plain object");
	}
	if (!isString(data.backgroundColor)) {
		console.debug("data.backgroundColor must be a string, recieved: ", data.backgroundColor);
		throw new Error("backgroundColor must be a string");
	}
	if (!isString(data.borderColor)) {
		console.debug("data.borderColor must be a string, recieved: ", data.borderColor);
		throw new Error("borderColor must be a string");
	}
	if (!isString(data.borderWidth)) {
		console.debug("data.borderWidth must be a string, recieved: ", data.borderWidth);
		throw new Error("borderWidth must be a string");
	}
	if (!isString(data.color)) {
		console.debug("data.color must be a string, recieved: ", data.color);
		throw new Error("color must be a string");
	}
	if (!isString(data.fontSize)) {
		console.debug("data.fontSize must be a string, recieved: ", data.fontSize);
		throw new Error("fontSize must be a string");
	}
	if (!isString(data.fontWeight)) {
		console.debug("data.fontWeight must be a string, recieved: ", data.fontWeight);
		throw new Error("fontWeight must be a string");
	}
	if (!isString(data.height)) {
		console.debug("data.height must be a string, recieved: ", data.height);
		throw new Error("height must be a string");
	}
	if (!isString(data.width)) {
		console.debug("data.width must be a string, recieved: ", data.width);
		throw new Error("width must be a string");
	}
	return true;
}

export function isNodeStyle(data: unknown): data is NodeStyle {
	try {
		return validateNodeStyle(data);
	} catch (e) {
		return false;
	}
}

export function newNodeStyle(data?: Partial<NodeStyle>): NodeStyle {
	return {
		backgroundColor: data?.backgroundColor || "white",
		borderColor: data?.borderColor || "black",
		borderWidth: data?.borderWidth || "1px",
		color: data?.color || "black",
		fontSize: data?.fontSize || "16px",
		fontWeight: data?.fontWeight || "normal",
		height: data?.height || "20px",
		width: data?.width || "100px",
	};
}

export function updateNodeStyle(style: NodeStyle, updates: Partial<NodeStyle>): NodeStyle {
	return {
		...style,
		...updates,
	};
}
