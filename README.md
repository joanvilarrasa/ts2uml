# ts2uml

ts2uml is a versatile tool for generating UML diagrams from your TypeScript codebase. Whether you prefer a command-line approach or a seamless integration within Visual Studio Code, ts2uml provides an easy way to visualize and understand the structure and relationships in your code.

## Overview

ts2uml analyzes your TypeScript projects to extract classes, interfaces, enums, and types, and then constructs detailed UML diagrams. With ts2uml, you can:
- Quickly generate conceptual diagrams with a single command or right-click in VS Code.
- Filter nodes by type, folder, or file to focus on the most relevant parts of your project.
- Customize the layout and appearance of diagrams using a variety of output options.

## Features

- **Automatic Diagram Generation:**  
  Parse your TypeScript code and automatically generate UML diagrams representing your project's structure.
  
- **Flexible Filtering:**  
  Focus on specific elements by filtering diagram nodes based on type (class, interface, enum, type), directory, or file.

- **Customizable Layouts:**  
  Choose from various layout algorithms (e.g., layered, tree, radial) and link styles (e.g., straight, bezier, step) to enhance diagram readability.
  
- **Multiple Output Formats:**  
  Export diagrams in popular formats like PNG, SVG, and JSON, or interactively view them through web panels.

- **VS Code Integration:**  
  For an enhanced development experience, use the Visual Studio Code extension, which allows you to generate interactive diagrams with a simple right-click in the Explorer.

## Installation

### Prerequisites

Ensure you have [Bun](https://bun.sh) installed on your system before proceeding.

Clone the repository:
```bash
git clone <repository-url>
```

Install dependencies:
```bash
bun install
```

## Usage


Run the web:
```bash
bun dev:web
```

This command analyzes your TypeScript codebase and produces a UML diagram in the specified output format (e.g., PNG, SVG).

### Using the VS Code Extension

If you are using Visual Studio Code, install the ts2uml extension to generate interactive diagrams directly from the Explorer. With a simple right-click on any folder, the extension will parse your TypeScript project and display a dynamic React Flow diagram.

## Configuration

Customize ts2uml behavior by modifying the configuration file or passing command-line options. Refer to the project documentation for details on available settings.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your improvements or bug fixes.

## License

This project is licensed under the MIT License.
