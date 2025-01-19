import { newConfig } from "@ts2uml/models";
import { findTypeScriptFiles } from "./src/findTypeScriptFiles";
import { Project } from "ts-morph";
import { generateGraph } from "./src/generateGraph";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";

export { findTypeScriptFiles } from "./src/findTypeScriptFiles";
export { isTypeScriptFile } from "./src/isTypeScriptFile";
export { generateGraph } from "./src/generateGraph";
export { getRelativeFilePath } from "./src/getRelativePath";


async function createDefaultGraph() {
    const dir = join("C:\\Users\\Vila\\Desktop\\Joan\\Dev\\ts2uml\\packages\\models\\src");

    const config = newConfig();
    const tsFiles = await findTypeScriptFiles(dir, config);
    const project = new Project();
    for (const file of tsFiles) {
      project.addSourceFileAtPath(file);
    }
    const demoGraph = generateGraph(project, dir, config);


    await writeFile('demo-graph.json', JSON.stringify(demoGraph, null, 2));
}

await createDefaultGraph();