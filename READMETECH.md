# Technical Documentation for TS2UML

## Project Structure

```
ts2uml/
├── apps/
│   ├── web/                        # The main web application. Logic for displaying and interacting with the diagram.
│       ├── src/            
|           ├── components/  
|               ├── graph/              # Components for the nodes and links of the diagram
|               ├── toolbox/            # Components for bottom center toolbox
|                   ├── docs-tool/      # Component for generating markdown docs from the diagram
|                   ├── filter-tool/    # Component for filtering the nodes of the diagram
|                   ├── import-tool/    # Component for importing a diagram from a json
|                   ├── layout-tool/    # Component for changinf the layout algorithm or the link routing algorithm
|                   ├── save-tool/      # Component for saving the diagram as json or as a png
|                   ├── share-tool/     # Component for generating links and storing the diagram to the pastebin service
|                   ├── ...
|                   └── toolbox.tsx     # Component that contains all of the above
|               └── ui/                 # Shadcn components
|           ├── lib/
|               ├── react/flow/         # utilities for interacting with reactflow (going from ts2umlnodes to react flow nodes)
|               ├── graph-manager.ts    # Load, change and save the current graph from varios places
|               ├── hover-manager.ts    # Manage the adding and removing of highlights when you hover on a node
|               └── link-manager.ts     # Create delete and update the share links and the pastebin service
|           ├── app.tsx                 # Main file that renders teh react flow
|           └── ...
│       └── ...
|    └── ...
├── packages/
│   ├── core/                       # Core package
│       ├── src/ 
|           ├── docs/                   # Turn a ts2uml graph into markdown docs.
|           ├── export/                 # Turn a ts2uml graph to json (normal or excalidraw) for exporting
|           ├── file-utils/             # Utility functions for managing the file system
|           ├── main/                   # Turn a list of file paths into a ts2uml graph.
|           ├── tree-node/              # Build a file and folder tree node structure rfom the graph
|           ├── ts-morph-to-graph/      # Transformers from ts-morph things to ts2uml things
|           └── xyflow/                 # Utility functions for interacting with xyflow (react flow)
│   ├── models/                     # Models package
│       ├── src/ 
|           ├── defaults/               # Default values
|           ├── types/                  # Models, you can use ts2uml to understand this one ;)
|           └── utils/                  # Utility functions for the models
├── vscode-ext/                     # VSCode extension repo
│   ├── media/                          # The dist files of the apps/web will be copied here
│   ├── src/                            
│       ├── ts2uml-libs/                # The dist files of all the packages will be copied here
│       └── extension.ts                # The main code for the extension and the interactions with the web
│   └── ...
└── ...
```

## Development Environment Setup

### Prerequisites

- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- [Node](https://nodejs.org/en) - This is just for the web extension

I use Biome and ultracite for linting and formating.
- [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [Ultracite](https://www.ultracite.dev/)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/joanvilarrasa/ts2uml.git
   cd ts2uml
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start development:
   ```bash
   # For web application
   bun run dev:web
   ```

## Available Scripts

The project includes various scripts thatn can be ran from the root of the project to help with development, building, and deployment:

### Build Commands

- `build:all` - Build all packages and applications.
- `build:core` - Build the core package.
- `build:models` - Build the models package.
- `build:vscode` - Build the web with the extension environment and copy all the web and package files to the vscode extension repo.
- `build:web` - Build the web application.
- `build:web:extension` - Build the web application for extension environment.

### Development Commands

- `dev:web` - Start the web application in development mode
- `dev:web:extension` - Start the web application in extension development mode
- `demo` - Generate a demo graph using the core package (generates a graph of te types folder in the model package)

### Cleaning Commands

- `clean:all` - Clean all build outputs
- `clean:core` - Clean core package build output
- `clean:models` - Clean models package build output
- `clean:web` - Clean web application build output

### Docker Commands

- `docker:pastebin:up` - Start the pastebin service in Docker
- `docker:pastebin:down` - Stop the pastebin service in Docker

### Linting Commands

- `lint:all` - Lint all packages and applications
- `lint:core` - Lint the core package
- `lint:models` - Lint the models package
- `lint:web` - Lint the web application

### Version and Deployment Commands

- `bump:major` - Bump the major version
- `bump:minor` - Bump the minor version
- `bump:patch` - Bump the patch version
- `deploy:major` - Bump major version, build all, and publish
- `deploy:minor` - Bump minor version, build all, and publish
- `deploy:patch` - Bump patch version, build all, and publish
- `publish:all` - Commit version changes and publish all packages
- `publish:vscode` - Publish the VSCode extension

## 3rd party libs that we use

- It uses [React Flow](https://reactflow.dev/) to render the diagram.
- It uses [ts-morph](https://ts-morph.com/) to read the code and extract the types.
- It uses [elk.js](https://github.com/kieler/elkjs) to layout the diagram.
- It uses [Docker](https://www.docker.com/) for containerization and deployment
- It uses [Bun](https://bun.sh/) as the JavaScript runtime and package manager
- It uses [shadcn/ui](https://ui.shadcn.com/) for the UI components
- It uses [Tailwind CSS](https://tailwindcss.com/) for styling
- It uses [React](https://react.dev/) as the frontend framework
- It uses [Vite](https://vitejs.dev/) as the build tool and development server