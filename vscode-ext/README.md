# ts2uml

**ts2uml** is a Visual Studio Code extension that generates UML diagrams from your TypeScript projects. With a simple right-click on any folder in the VS Code Explorer, you can instantly visualize your TypeScript models as an interactive React Flow diagram.

## Overview

When you right-click on a folder and select **Generate UML diagram**, ts2uml:
- Parses your TypeScript code.
- Constructs a UML diagram representing your classes, interfaces, enums, and types.
- Presents the diagram in a dynamic web panel powered by React Flow.

## Features

- **Automatic Diagram Generation:**  
  Quickly generate UML diagrams from your TypeScript code with a single click.

- **Filtering Options:**  
  Easily filter and focus on what matters most:
  - **By Node Type:** (class, interface, enum, type)
  - **By Folder:** Narrow down nodes from specific directories.
  - **By File:** Isolate nodes defined in particular files.

- **Customizable Layouts:**  
  Choose from multiple layout algorithms to best arrange your diagram:
  - `layered`, `mrtree`, `force`, `radial`, `box`, `random`

- **Custom Link Paths:**  
  Adjust how links between nodes are drawn:
  - `straight`, `bezier`, `step`

## Requirements

This extension has no extra requirements.

## Extension Settings

This extension has no settings.

## Known Issues

We will put the known issues here.
If you find any issues, please let me know at [@joan_vilarrasa](https://x.com/joan_vilarrasa)

## Release Notes

Here are the release notes for the extension. Please remember that this is an alpha version and nothing is stable yet.

### [0.0.1] - Hello world

This is the first release of the extension.
Here are the features implemented in this first release:
- **Automatic Diagram Generation:**  
  Quickly generate UML diagrams from your TypeScript code with a single click.
  - Supports interfaces, enums and union types. The rest of th types will come in the following days.

- **Filtering Options:**  
  Easily filter and focus on what matters most:
  - **By Node Type:** (class, interface, enum, type)
  - **By Folder:** Narrow down nodes from specific directories.
  - **By File:** Isolate nodes defined in particular files.
  - **By Node:** Isolate nodes by name.

- **Customizable Layouts:**  
  Choose from multiple layout algorithms to best arrange your diagram:
  - `layered`, `mrtree`, `force`, `radial`, `box`, `random`

- **Custom Link Paths:**  
  Adjust how links between nodes are drawn:
  - `straight`, `bezier`, `step`

- **Zoom and Pan and move nodes around (React Flow features --> no work has been done for this):**  
    - Use the mouse wheel to zoom in and out, and drag to pan around the diagram.
    - You can also move the nodes around by dragging them with the mouse.
---

## Contributing

I will open the code base soon. I will be very happy to receive contributions!

---

