import { extname } from "node:path";

export function isTypeScriptFile(filename: string): boolean {
	const ext = extname(filename).toLowerCase();
	return ext === ".ts" || ext === ".tsx";
}
