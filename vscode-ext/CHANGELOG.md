# Change Log

All notable changes to the "ts2uml" extension will be documented in this file.

### [v0.0.72] - Highlights

- Fixed a few bugs.

### [v0.0.68] - Highlights

- Fixed bug where using <T> did not compute the links properly.
- Added test so that development going forward is more secure.

### [v0.0.67] - Highlights

- Fixed bug where the lines were not rendering in the png export

### [v0.0.65] - Highlights

- Fixed visual bug for th filters by name (put the ... at the beggining of ends with clause)
- Added technical documentation

### [v0.0.60] - Highlights

- Added highlights when hovering the nodes

### [v0.0.59] - Better filtering

- Added filtering by name (starts with, ends with or includes)
- Fixed small bugs with filtering (if a node was filtered by path and you filtered it in the types and then unfiltered the type it would appear again)
- Small redesign of the filter and layout tools (put the sections horizontally instead of vertical)
- Small redesign of the import tool (hide the button until a file is loaded)

### [v0.0.57] - Better docs

- Improved docs

### [v0.0.56] - Extenedd properties 

- Fixed bug where the docs were not being generated properly

### [v0.0.50] - Extenedd properties 

- Added docs generation. You cna now generate a markdown document of the types of the graph wiht the jsdocs descriptions.
- Optionally have a table per interfaec or class wiht their attributes.

### [v0.0.47] - Extenedd properties 

- Improved extended propertis so that they show the original place where they extend from if it is inside the scope.
- Mostly this has been a refactor and a quality of life update.

### [v0.0.46] - Updated docs 

- Added a new button at the top right corner of the nodes to open the code file in a new tab. This is only available in the extension.

### [v0.0.36] - Updated docs 

- Updated README.md to reflect the current state of the project.

### [v0.0.35] - Logo

- Redesigned the toolbox.
- Changed some of the colors, small design modifications on the cards.

### [v0.0.32] - Logo

- Now if a type extends another within the folder being analyzed, the attributes will be shown in all the types with the extended type in parenthesis.

### [v0.0.29] - Logo

- Added a new logo to the extension.

### [v0.0.27] - Minor visual improvements

- Added tooltip to buttons that only had an icon.

### [v0.0.26] - Minor visual improvements

- Added a few visual improvements to the import and save tools such as a couple of sonners and a smoall redesign of the save tool.

### [v0.0.25] - Improved link generation

- Improved ui of the share tool.

### [v0.0.22] - Fix bug with path sanitization

- Added possibility to share the diagram with a link. The link will open the website that is the same as the extension and will load the diagram.

### [v0.0.15] - Fix bug with path sanitization

- Fixed a bug where the path was not sanitized correctly.

### [v0.0.15] - Bugfix maybe

- Fixed a bug where the graph was not generated correctly in some machines.

### [v0.0.14] - Small visual improvement

- Maed the color of the links foreground so that they are more visible in dark and light mode

### [v0.0.13] - Name your export files

- Added a new input to name your export files.

### [v0.0.12] - Import graphs

- Added a new button to import graphs (the file must be the same JSON format as the exported ones).
- Added a new checkbox to the import tool to apply the layout of the imported graph.

### [v0.0.11] - Small bug fix

- Small bug fix

### [v0.0.10] - Welcoming the dark side

- Added a new button to change the theme of the diagram.

### [v0.0.9] - Fix export bug

- Fix font bug when exporting from the extension.

### [v0.0.8] - Fix export bug

- Fix bug where exporting png was not allowed
- A known bug remains in the exported pngs the font is not loaded correctly.

### [v0.0.7] - Export your Diagram

- Added a new button to export the diagram to the clipboard or download it as a File.
- When exporting you can choose between 3 options (more to come in the following days):
  - `json`: Export the diagram as a JSON object.
  - `png`: Export the diagram as a PNG image.
  - `png-transparent`: Export the diagram as a PNG image with a transparent background.

### [v0.0.6] - Support for classes, types and unions

- Added support for classes, types and unions (unions include enums or types like `string | number`).

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