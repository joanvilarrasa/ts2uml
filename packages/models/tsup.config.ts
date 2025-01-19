import { defineConfig } from "tsup";

export default defineConfig({
	dts: true,
	format: "esm",
	entry: ["index.ts"],
});
