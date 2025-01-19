import { isArray, isPlainObject } from "is-what";
import { newNode, validateNode, type Node } from "./Node";
import { newLink, validateLink, type Link } from "./Link";

/**
 * Represents a graph/diagram containing nodes and their links.
 */
export interface Graph {
	/**
	 * Array of nodes in the graph (classes, interfaces, etc)
	 * @see {@link Node}
	 */
	nodes: Node[];

	/**
	 * Array of links/relationships between nodes
	 * @see {@link Link}
	 */
	links: Link[];
}

export function validateGraph(data: unknown): data is Graph {
	if (!isPlainObject(data)) {
		console.debug("data must be a plain object, recieved: ", data);
		throw new Error("data must be a plain object");
	}
	if (!isArray(data.nodes)) {
		console.debug("data.nodes must be an array, recieved: ", data.nodes);
		throw new Error("nodes must be an array");
	}
	for (const node of data.nodes) {
		validateNode(node);
	}

	if (!isArray(data.links)) {
		console.debug("data.links must be an array, recieved: ", data.links);
		throw new Error("links must be an array");
	}
	for (const link of data.links) {
		validateLink(link);
	}

	return true;
}

export function isGraph(data: unknown): data is Graph {
	try {
		return validateGraph(data);
	} catch (e) {
		return false;
	}
}

export function newGraph(data: Partial<Graph>): Graph {
	return {
		nodes: data.nodes?.map((node) => newNode(node)) ?? [],
		links: data.links?.map((link) => newLink(link)) ?? [],
	};
}

export function updateGraph(graph: Graph, data: Partial<Graph>): Graph {
	return {
		...graph,
		...data,
	};
}
