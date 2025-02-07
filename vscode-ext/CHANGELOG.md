# Change Log

All notable changes to the "ts2uml" extension will be documented in this file.

### [v0.0.5] - Hello world

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