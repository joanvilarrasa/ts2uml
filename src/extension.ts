import * as vscode from 'vscode';
import { findTsFiles } from './utils/findTsFiles';
import { getDefaultConfig } from './models/Config';
import { Project } from 'ts-morph';
import { D3Graph, generateD3Graph } from './utils/generateD3Graph';


export async function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('ts2uml.generateUml', async (uri: vscode.Uri) => {
        const panel = vscode.window.createWebviewPanel(
            'umlDiagram',
            'UML Diagram',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        const dir = uri.fsPath;
        let config = getDefaultConfig();

        // Initial content generation
        let tsFiles = await findTsFiles(dir, config);
        const project = new Project();
        for (const file of tsFiles) {
            const sourceFile = project.addSourceFileAtPath(file);
        }

        const initialD3Graph = generateD3Graph(project);



        panel.webview.html = getWebviewContent(panel, context.extensionUri, initialD3Graph);

        // Listen for messages from the webview
        panel.webview.onDidReceiveMessage(async (message) => {
            // console.log("Recieved message", message)
            if (message.type === 'UpdateConfig') {
                // console.log('Received updated config:', message.config);
                // config = updateConfig(config, message.config)

                // // Regenerate content with the updated config
                // tsFiles = await findTsFiles(dir, config); // Optional if file filtering might change
                // umlText = generateUmlFromFiles(tsFiles, config);

                // // Send updated content back to the webview
                // panel.webview.postMessage({
                //     type: 'UpdatedContent',
                //     content: mermaidContent,
                // });
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, initialGraph: D3Graph): string {
    const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'd3', 'd3.js'));

    panel.webview.postMessage({
        type: 'UpdatedContent',
        graph: initialGraph,
    });

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UML Diagram</title>
            <script src="https://d3js.org/d3.v7.min.js"></script>
        </head>
        <body>
            <div id="diagram-container">
                <svg id="diagram" width="800" height="600"></svg>
            </div>
            <script type="module" src="${scriptUri}"></script>
        </body>
        </html>
    `;
}


