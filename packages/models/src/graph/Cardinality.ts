import { isArray, isNumber } from "is-what";

export type Cardinality = number | "*" | "?" | [(number | "*"), (number | "*")];

export function stringifyCardinality(cardinality: Cardinality): string {
    if (isNumber(cardinality)) return cardinality.toString();
    if (cardinality === "*") return "*";
    if (cardinality === "?") return "?";
    if (isArray(cardinality)) return `${cardinality[0]}...${cardinality[1]}`;
    return "";
}

export function validateCardinality(cardinality: any): cardinality is Cardinality {
    if (isNumber(cardinality)) return true;
    if (cardinality === "*") return true;
    if (cardinality === "?") return true;
    if (isArray(cardinality) && cardinality.length === 2 && (isNumber(cardinality[0]) || cardinality[0] === "*") && (isNumber(cardinality[1]) || cardinality[1] === "*")) return true;
    return false;
}

export function isCardinality(data: any): data is Cardinality {
    try { return validateCardinality(data); }
    catch (e) { return false; }
}