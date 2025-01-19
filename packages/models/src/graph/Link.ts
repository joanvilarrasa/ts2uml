import { isPlainObject, isString } from "is-what";
import { isCardinality, validateCardinality, type Cardinality } from "./Cardinality";

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "aggregation": Indicates a has-a relationship where parts can exist independently
 * - "association": Indicates a basic association between nodes
 * - "composition": Indicates a contains relationship where parts cannot exist independently
 * - "dependency": Indicates a uses/depends-on relationship
 * - "inheritance": Indicates an inheritance/extends relationship
 * - "realization": Indicates an implements/realizes relationship
 */
export type LinkType = "aggregation" | "association" | "composition" | "dependency" | "inheritance" | "realization";

/**
 * Array containing all valid link types that can be used in the diagram.
 * @see {@link LinkType}
 */
export const LinkTypeList: LinkType[] = ["aggregation", "association", "composition", "dependency", "inheritance", "realization"];

export function validateLinkType(data: unknown): data is LinkType {
	if (!isString(data) || !LinkTypeList.includes(data as LinkType)) {
		console.debug("data must be a valid LinkType, recieved: ", data);
		throw new Error("data must be a valid LinkType");
	}
	return true;
}

export function isLinkType(data: unknown): data is LinkType {
	try {
		return validateLinkType(data);
	} catch (e) {
		return false;
	}
}

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export type Link = {
	/**
	 *  The cardinality (multiplicity) at the source end of the relationship
	 * @see {@link Cardinality}
	 */
	sourceCardinality: Cardinality;

	/**
	 * The unique identifier of the source node
	 * @see {@link Node}
	 */
	sourceId: string;

	/**
	 * Optional identifier for a specific port on the source node
	 * @see {@link NodePort}
	 */
	sourcePortId?: string;

	/**
	 * The cardinality (multiplicity) at the target end of the relationship
	 * @see {@link Cardinality}
	 */
	targetCardinality: Cardinality;

	/**
	 * The unique identifier of the target node
	 * @see {@link Node}
	 */
	targetId: string;

	/**
	 * Optional identifier for a specific port on the target node
	 * @see {@link NodePort}
	 */
	targetPortId?: string;

	/**
	 * Optional text label to display on the relationship
	 */
	text?: string;

	/**
	 * The type of relationship between the nodes
	 * @see {@link LinkType}
	 */
	type: LinkType;
};

export function validateLink(data: unknown): data is Link {
	if (!isPlainObject(data)) {
		console.debug("data must be an object, recieved: ", data);
		throw new Error("data must be an object");
	}
	validateCardinality(data.sourceCardinality);
	if (!isString(data.sourceId)) {
		console.debug("data.sourceId must be a string, recieved: ", data.sourceId);
		throw new Error("sourceId must be a string");
	}
	if (data.sourcePortId !== undefined && !isString(data.sourcePortId)) {
		console.debug("data.sourcePortId must be a string or null, recieved: ", data.sourcePortId);
		throw new Error("sourcePortId must be a string or null");
	}
	validateCardinality(data.targetCardinality);
	if (!isString(data.targetId)) {
		console.debug("data.targetId must be a string, recieved: ", data.targetId);
		throw new Error("targetId must be a string");
	}
	if (data.targetPortId !== undefined && !isString(data.targetPortId)) {
		console.debug("data.targetPortId must be a string or null, recieved: ", data.targetPortId);
		throw new Error("targetPortId must be a string or null");
	}
	if (data.text !== undefined && !isString(data.text)) {
		console.debug("data.text must be a string, recieved: ", data.text);
		throw new Error("text must be a string");
	}
	validateLinkType(data.type);
	return true;
}

export function isLink(data: unknown): data is Link {
	try {
		return validateLink(data);
	} catch (e) {
		return false;
	}
}

export function newLink(data?: Partial<Link>): Link {
	return {
		sourceCardinality: data?.sourceCardinality || "*",
		sourceId: data?.sourceId || "",
		sourcePortId: data?.sourcePortId,
		targetCardinality: data?.targetCardinality || "*",
		targetId: data?.targetId || "",
		targetPortId: data?.targetPortId,
		text: data?.text,
		type: data?.type || "association",
	};
}

export function updateLink(link: Link, updates: Partial<Link>): Link {
	return {
		...link,
		...updates,
	};
}
