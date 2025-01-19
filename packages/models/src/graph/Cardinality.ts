import { isArray, isNumber } from "is-what";

/**
 * Represents the cardinality of a relationship in a graph.
 * @typedef {number | "*" | "?" | [(number | "*"), (number | "*")]} Cardinality
 */
export type Cardinality = number | "*" | "?" | [number | "*", number | "*"];

/**
 * Converts a Cardinality object to a string representation.
 */
export function stringifyCardinality(cardinality: Cardinality): string {
	if (isNumber(cardinality)) return cardinality.toString();
	if (cardinality === "*") return "*";
	if (cardinality === "?") return "?";
	if (isArray(cardinality)) return `${cardinality[0]}...${cardinality[1]}`;
	return "";
}

export function validateCardinality(cardinality: unknown): cardinality is Cardinality {
	if (isNumber(cardinality)) return true;
	if (cardinality === "*") return true;
	if (cardinality === "?") return true;
	if (isArray(cardinality) && cardinality.length === 2 && (isNumber(cardinality[0]) || cardinality[0] === "*") && (isNumber(cardinality[1]) || cardinality[1] === "*")) return true;
	return false;
}

export function isCardinality(data: unknown): data is Cardinality {
	try {
		return validateCardinality(data);
	} catch (e) {
		return false;
	}
}
