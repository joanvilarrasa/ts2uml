import * as vscode from 'vscode';
import { findTsFiles } from './utils/findTsFiles';
import { generateUmlFromFiles } from './utils/generateUmlFromFiles';
import { umlToMermaid } from './utils/umlToMermaid';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('ts2uml.generateUml', async (uri: vscode.Uri) => {
        try {
            const dir = uri.fsPath;

            // Get all .ts and .tsx files in the directory and subdirectories
            const tsFiles = await findTsFiles(dir);

            if (tsFiles.length === 0) {
                vscode.window.showInformationMessage(`No .ts or .tsx files found in the directory: ${dir}`);
                return;
            }

            // Generate UML content from the files
            const umlText = generateUmlFromFiles(tsFiles);
            // Generate Mermaid content from the UML content
            const mermaidContent = umlToMermaid(umlText);
            console.log("mermaidContent :>> ", mermaidContent);

            // Create and show a new webview panel
            const panel = vscode.window.createWebviewPanel(
                'umlDiagram', // Internal identifier
                'UML Diagram', // Title of the tab
                vscode.ViewColumn.One, // Editor column to display the panel
                { enableScripts: true } // Webview options
            );

            // Set the webview's HTML content
            panel.webview.html = getWebviewContent(mermaidContent);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to process the directory: ${(err as Error).message}`);
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }

function getWebviewContent(content: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UML Diagram</title>
            <script type="module">
                import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

                window.addEventListener('DOMContentLoaded', () => {
                    const config = {
                        startOnLoad: true,
                        securityLevel: 'loose',
                    };
                    mermaid.initialize(config);
                    renderMermaid();
                });

                function renderMermaid() {
                    const container = document.querySelector('.mermaid');
                    mermaid.init(undefined, container);
                }

                // Attach functions to the global window object
                window.handleRefresh = () => {
                    renderMermaid();
                };

                window.handleExport = () => {
                    alert('Export functionality not implemented yet.');
                };

                window.handleZoomIn = () => {
                    const container = document.querySelector('#diagram-container');
                    const scale = parseFloat(container.style.zoom || '1') + 0.1;
                    container.style.zoom = scale.toString();
                };

                window.handleZoomOut = () => {
                    const container = document.querySelector('#diagram-container');
                    const scale = parseFloat(container.style.zoom || '1') - 0.1;
                    container.style.zoom = Math.max(scale, 0.5).toString();
                };

                window.handleResetZoom = () => {
                    const container = document.querySelector('#diagram-container');
                    container.style.zoom = '1';
                };
            </script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
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
                    padding: 20px;
                }
                .mermaid {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div id="toolbar">
                <button onclick="handleRefresh()">Refresh</button>
                <button onclick="handleExport()">Export</button>
                <button onclick="handleZoomIn()">Zoom In</button>
                <button onclick="handleZoomOut()">Zoom Out</button>
                <button onclick="handleResetZoom()">Reset Zoom</button>
            </div>
            <div id="diagram-container">
                <pre class="mermaid">
                    ${content}
                </pre>
            </div>
        </body>
        </html>
    `;
}

