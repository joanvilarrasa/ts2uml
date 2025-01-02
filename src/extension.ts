import * as vscode from 'vscode';
import { findTsFiles } from './utils/findTsFiles';
import { generateUmlFromFiles } from './utils/generateUmlFromFiles';

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

            // Create and show a new webview panel
            const panel = vscode.window.createWebviewPanel(
                'umlDiagram', // Internal identifier
                'UML Diagram', // Title of the tab
                vscode.ViewColumn.One, // Editor column to display the panel
                { enableScripts: true } // Webview options
            );

            // Set the webview's HTML content
            panel.webview.html = getWebviewContent(umlText);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to process the directory: ${(err as Error).message}`);
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Function to get the HTML content for the webview
function getWebviewContent(content: string): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UML Diagram</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                pre { padding: 10px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <h1>Generated UML Diagram</h1>
            <pre>${content}</pre>
        </body>
        </html>
    `;
}
