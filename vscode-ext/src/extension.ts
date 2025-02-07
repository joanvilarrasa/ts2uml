import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { generateGraph } from './ts2uml-libs/core-dist';
import { createMsgLoadGraph } from './ts2uml-libs/models-dist';


export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('ts2uml.generateUml', async (uri: vscode.Uri) => {
		const panel = vscode.window.createWebviewPanel('umlDiagram', 'UML Diagram', vscode.ViewColumn.One, {
			enableScripts: true,
		});

		const dir = uri.fsPath;
		const initialD3Graph = await generateGraph(dir);
		panel.webview.html = getWebviewContent(panel, context.extensionUri);

		panel.webview.postMessage(createMsgLoadGraph({ graph: initialD3Graph }));
	});

	context.subscriptions.push(disposable);
}


function getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri): string {
	const indexPath = vscode.Uri.joinPath(
		extensionUri,
		'src',
		'ts2uml-libs',
		'web-dist',
		'index.html'
	).fsPath;

	try {
		let htmlContent = fs.readFileSync(indexPath, 'utf8');
		htmlContent = htmlContent.replace(
			/(<script.+?src="|<link.+?href="|<img.+?src=")(.+?)"/g,
			(match, prefix, filePath) => {
				if (filePath.startsWith('./') || filePath.startsWith('/')) {
					const absolutePath = path.join(path.dirname(indexPath), filePath);
					const webviewUri = panel.webview.asWebviewUri(vscode.Uri.file(absolutePath));
					return `${prefix}${webviewUri}"`;
				}
				return match;
			}
		);
		return htmlContent;
	} catch (e) {
		return `<h1>Error loading webview: ${e}</h1>`;
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
