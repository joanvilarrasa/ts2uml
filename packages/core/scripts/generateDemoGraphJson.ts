import { newConfig } from "@ts2uml/models";
import { Project } from "ts-morph";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { findTypeScriptFiles } from "../src/findTypeScriptFiles";
import { generateGraph } from "../src/generateGraph";

async function createDefaultGraph() {
    const dir = join(process.cwd(), '..', 'models', 'src');
    console.log("dir", dir);

    const config = newConfig();
    const tsFiles = await findTypeScriptFiles(dir, config);
    const project = new Project();
    for (const file of tsFiles) {
      project.addSourceFileAtPath(file);
    }
    const demoGraph = generateGraph(project, dir, config);


    await writeFile('scripts/demo-graph.json', JSON.stringify(demoGraph, null, 2));
}

await createDefaultGraph();