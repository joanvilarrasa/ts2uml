import * as vscode from 'vscode';
import { findTsFiles } from './utils/findTsFiles';
import { generateUmlFromFiles } from './utils/generateUmlFromFiles';
import { getDefaultConfig, updateConfig } from './models/Config';


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
        let umlText = generateUmlFromFiles(tsFiles, config);
        let mermaidContent = {
            type: 'UpdatedContent',
            content: {
                classes: [
                    { name: 'Person', attributes: [{ name: 'name', type: 'string' }], methods: [{ name: 'greet', params: [], returnType: 'void' }] },
                ],
                links: [
                    { source: 'Person', target: 'Employee', type: 'inheritance' },
                ],
            },
        }

        panel.webview.html = getWebviewContent(panel, context.extensionUri);

        // Listen for messages from the webview
        panel.webview.onDidReceiveMessage(async (message) => {
            console.log("Recieved message", message)
            if (message.type === 'UpdateConfig') {
                console.log('Received updated config:', message.config);
                config = updateConfig(config, message.config)

                // Regenerate content with the updated config
                tsFiles = await findTsFiles(dir, config); // Optional if file filtering might change
                umlText = generateUmlFromFiles(tsFiles, config);

                // Send updated content back to the webview
                panel.webview.postMessage({
                    type: 'UpdatedContent',
                    content: mermaidContent,
                });
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri): string {
    const jointUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'joint.js'));
    const jointCssUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'extension.css'));
    const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'jointScript.js'));

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UML Diagram</title>
            <script src="${jointUri}"></script>
            <link rel="stylesheet" href="${jointCssUri}">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }
                #toolbar {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background-color: #f4f4f4;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                }
                #toolbar button {
                    margin-right: 10px;
                    padding: 5px 10px;
                    font-size: 14px;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background-color: #fff;
                }
                #diagram-container {
                    flex: 1;
                    position: relative;
                }
            </style>
        </head>
        <body>
            <div id="toolbar">
                <button onclick="scaleToFit()">Scale to Fit</button>
            </div>
            <div id="diagram-container"></div>
            <script type="module" src="${scriptUri}"></script>
        </body>
        </html>
    `;
}


