import { generateGraph } from '@ts2uml/core';
import { createMsgLoadGraph } from '@ts2uml/models';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('ts2uml.generateUml', async (uri: vscode.Uri) => {
    const panel = vscode.window.createWebviewPanel('umlDiagram', 'UML Diagram', vscode.ViewColumn.One, {
      enableScripts: true,
    });

    const dir = uri.fsPath;
    const initialD3Graph = await generateGraph(dir);
    panel.webview.html = getWebviewContent(panel, context.extensionUri);

    // Listen for messages from the webview
    // panel.webview.onDidReceiveMessage(async (message) => {
    //   if (message.type === 'UpdateConfig') {
    //   }
    // });

    panel.webview.postMessage(createMsgLoadGraph({ graph: initialD3Graph }));
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri): string {
  const targetHtmlFile = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'web-dist', 'index.html'));
  return targetHtmlFile.toString();
}
