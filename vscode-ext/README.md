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

- **Export:**
  Export the diagram to a file or copy it to the clipboard.
  - **PNG:** Export the diagram to a PNG (optionally with transparent background).
  - **JSON:** Export the diagram to a JSON file.

- **Theme:**
  Choose between light and dark theme.


## Requirements

This extension has no extra requirements.

## Extension Settings

This extension has no settings.

## Known Issues

- The exported pngs have a bug where the font is not loaded correctly.
If you find any issues, please let me know at [@joan_vilarrasa](https://x.com/joan_vilarrasa)

## Release Notes

Please refer to the Changelog file for the release notes.

---

## Contributing

I will open the code base soon. I will be very happy to receive contributions!

---

