import * as vscode from 'vscode';
import { findTsFiles } from './utils/findTsFiles';
import { getDefaultConfig } from './models/Config';
import { Project } from 'ts-morph';
import { generateGraph, Graph } from './utils/generateGraph';

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
            project.addSourceFileAtPath(file);
        }

        const initialD3Graph = generateGraph(project, dir, config);

        panel.webview.html = getWebviewContent(panel, context.extensionUri, initialD3Graph);

        // Listen for messages from the webview
        panel.webview.onDidReceiveMessage(async (message) => {
            if (message.type === 'UpdateConfig') {
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, initialGraph: Graph): string {
    const fontCssUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'joint', 'font.css'));
    const jointShapesUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'joint', 'shapes.js'));
    const jointScriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'joint', 'joint.js'));

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
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Sometype+Mono:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
            <link href="${fontCssUri}" rel="stylesheet">
            <title>UML Diagram</title>
        </head>
        <body>
            <div id="diagram-container">
                <button id="button">Toggle opacity</button>
                <div id="paper"></div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/@joint/core@4.1.1/dist/joint.js"></script>
            <script type="text/javascript" src="${jointScriptUri}"></script>
        </body>
        </html>
    `;
}


