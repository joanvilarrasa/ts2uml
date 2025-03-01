import * as vscode from 'vscode';
import { generateGraph } from './ts2uml-libs/core-dist';
import { createMsgLoadGraph, is, MsgOpenNodeCode, ZMsgOpenNodeCode, MsgPageReady, ZMsgPageReady } from './ts2uml-libs/models-dist';
import { join } from 'node:path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('ts2uml.generateUml', async (uri: vscode.Uri) => {
      UMLPanel.createOrShow(context.extensionUri, uri.fsPath);
    })
  );
}

async function getFiles(dir: string): Promise<string[]> {
  const files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(dir));
  const allFiles: string[] = [];

  for (const [name, type] of files) {
    const fullPath = join(dir, name);
    if (type === vscode.FileType.Directory) {
      const subFiles = await getFiles(fullPath);
      allFiles.push(...subFiles);
    } else {
      allFiles.push(fullPath);
    }
  }

  return allFiles;
}

class UMLPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: UMLPanel | undefined;
  public static currentPath: string| null

  public static readonly viewType = 'ts2uml.umlView';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri, path: string) {
    UMLPanel.currentPath = path;
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // If we already have a panel, show it.
    if (UMLPanel.currentPanel) {
      UMLPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      UMLPanel.viewType,
      'ts2uml',
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri),
    );

    UMLPanel.currentPanel = new UMLPanel(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    UMLPanel.currentPanel = new UMLPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        if(is<MsgOpenNodeCode>(message, ZMsgOpenNodeCode) && UMLPanel.currentPath !== null) {
          this.handleMsgOpenNodeCode(message);
        }
        if(is<MsgPageReady>(message, ZMsgPageReady) && UMLPanel.currentPath !== null) {
          this.handleMsgPageReady();
        }
      },
      null,
      this._disposables
    );
  }

  public async genGraph(dir: string) {
    const files = await getFiles(dir);
    const initialGraph = generateGraph({
      files,
      baseDir: dir,
    });
    return initialGraph;
  }

  public async handleMsgPageReady() {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Generating UML...",
        cancellable: false
      },
      async (progress, token) => {
        const initialGraph = await this.genGraph(UMLPanel.currentPath ?? '');
        this.postMessage(createMsgLoadGraph({ graph: initialGraph }));
        vscode.window.showInformationMessage("UML generated!");
      }
    );
  }

  public handleMsgOpenNodeCode(message: MsgOpenNodeCode) {
    const node = message.node;
    const relativeFilePath = node.id.split('-').slice(0, -1).join('-');
    const relativePathParts = relativeFilePath.split('/');
    const finalPath = join(UMLPanel.currentPath ?? '', ...relativePathParts);
    
    // Try to open the file with .ts and .tsx extensions
    const tryOpenFile = (path: string, extensions: string[], index: number = 0) => {
      if (index >= extensions.length) {
        vscode.window.showErrorMessage(`File not found: ${finalPath}.ts or ${finalPath}.tsx`);
        return;
      }
      
      const fileUri = vscode.Uri.file(`${path}${extensions[index]}`);
      vscode.workspace.fs.stat(fileUri).then(() => {
          vscode.window.showTextDocument(fileUri, { preview: false, viewColumn: vscode.ViewColumn.Beside });
        },
        (error) => {
          tryOpenFile(path, extensions, index + 1);
        }
      );
    };
    
    tryOpenFile(finalPath, ['.ts', '.tsx']);
  }


  public postMessage(message: any) {
    this._panel.webview.postMessage(message);
  }

  public dispose() {
    UMLPanel.currentPanel = undefined;
    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;

    // Vary the webview's content based on where it is located in the editor.
    this._initialize(webview);
  }

  private async _initialize(webview: vscode.Webview) {
    // this._panel.title = catName;
    this._panel.webview.html = await this._getHtmlForWebview(webview);
  }

  private async _getHtmlForWebview(webview: vscode.Webview) {
    // Determine locations of your bundled files
    const mediaDir = vscode.Uri.joinPath(this._extensionUri, "media");
    const files = await vscode.workspace.fs.readDirectory(mediaDir);
    const jsFile = files.find(([name]) => name.endsWith(".js"));
    const cssFile = files.find(
      ([name]) => name.startsWith("index") && name.endsWith(".css")
    );
    if (!jsFile || !cssFile) {
      throw new Error("No JS or CSS file found in media directory");
    }

    // Build URIs for your JavaScript file and the main css file.
    const scriptPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      jsFile[0]
    );
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

    const cssPath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      cssFile[0]
    );
    
    // Read the CSS file as text
    const fontsCssPath = vscode.Uri.joinPath(this._extensionUri, "media", "font.css");
    const fontsCssContent = await getFileContent(fontsCssPath);
    const cssContent = await getFileContent(cssPath);
    // If you have additional fonts (e.g. bold, italic) repeat the check or refine the regex.

    // Get the URI for your additional CSS file (if needed)
    const stylesPathMainPath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "vscode.css"
    );
    const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

    // Use a nonce to allow only specific scripts to run
    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="
          default-src 'none'; 
          font-src ${webview.cspSource} data:; 
          style-src ${webview.cspSource} 'unsafe-inline'; 
          img-src ${webview.cspSource} data: https:; 
          script-src 'nonce-${nonce}';
          connect-src https://ts2uml.com;
        ">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Inject the modified CSS inline -->
        <style>
          ${fontsCssContent}
        </style>
        <style>
          ${cssContent}
        </style>

        <!-- Link to the additional main CSS if needed -->
        <link href="${stylesMainUri}" rel="stylesheet">
        
        <title>ts2uml</title>
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();
          window.addEventListener('message', event => {
            vscode.postMessage(event.data);
          });
        </script>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>`;
  }

}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewPanelOptions & vscode.WebviewOptions {
  return {
    enableScripts: true,
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
    retainContextWhenHidden: true
  };
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function getFileContent(uri: vscode.Uri): Promise<string> {
  const bytes = await vscode.workspace.fs.readFile(uri);
  return Buffer.from(bytes).toString("utf-8");
}