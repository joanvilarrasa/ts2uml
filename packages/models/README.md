# @ts2uml/models

This package contains the core data models used throughout the ts2uml project. Each model is defined as a TypeScript interface in its own file, with the filename matching the model name.


## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Structure](#structure)
   - [Auxiliary Functions](#auxiliary-functions)
4. [Available Models](#available-models)

This README covers:

- **Installation**: How to add this package to your project
- **Usage**: Examples of how to use the models and their helper functions
- **Structure**: The consistent pattern followed by all model files, including the auxiliary functions provided for each model
- **Available Models**: Auto-generated documentation of all models, their purposes, and categorization To update the README with the latest models, run:
```bash
bun run build
```

## Structure

Each model file follows a consistent pattern, providing an interface definition along with four auxiliary functions:

### Auxiliary Functions

For each model `<Model>`, the following functions are provided:

- `validate<Model>(data: any): data is <Model>`
  - Validates if the provided data is a valid <Model>
  - Throws detailed error messages if validation fails
  - Returns true if validation succeeds
  - Can be used as a type guard

- `is<Model>(data: any): data is <Model>`
  - Type guard that checks if data is a valid <Model>
  - Returns true if data is valid, false otherwise
  - Does not throw errors
  - Can be used as a type guard

- `new<Model>(data?: Partial<Model>): <Model>`
  - Creates a new object that is a valid <Model>
  - Accepts partial data and fills in defaults for missing fields
  - Returns a complete, valid <Model> instance

- `update<Model>(model: <Model>, updates: Partial<Model>): <Model>`
  - Creates a copy of the <Model> with updated fields
  - Preserves existing data for fields not included in updates
  - Returns a new, complete <Model> instance

## Installation

```bash
bun install @ts2uml/models
```

## Usage

```typescript
import { Config, newConfig, updateConfig, validateConfig, isConfig } from '@ts2uml/models';

// Create a new config with defaults
const config = newConfig();

// Create a config with some custom values
const customConfig = newConfig({
    theme: 'dark',
    diagram: {
        show_legend: true
    }
});

// Update specific fields in a config
const updatedConfig = updateConfig(config, {
    theme: 'dark',
    diagram: {
        show_legend: true
    }
});

// Validate a config object (throws if invalid)
try {
    validateConfig(someData);
    console.log('Config is valid');
} catch (error) {
    console.error('Invalid config:', error.message);
}

// Type guard usage (returns boolean)
if (isConfig(someData)) {
    console.log('Data is a valid config');
}
```

## Available Models

### Config Models
- `Config` - Main configuration object that controls the overall diagram appearance and behavior. Contains settings for theme, display options, and filtering of nodes and relationships.
- `ConfigLinks` - Interface defining the configuration for displaying links (relationships) in the diagram.
- `ConfigLinksFilter` - Interface defining the configuration for filtering links (relationships) in the diagram.
- `ConfigLinksOptions` - Interface defining the display options for links (relationships) in the diagram.
- `ConfigNodes` - Interface defining the configuration for displaying nodes in the diagram.
- `ConfigNodesFilter` - Interface defining filters for nodes to be displayed in the diagram.
- `ConfigNodesOptions` - Interface defining display options that control what information is shown inside the nodes.

### Graph Models
- `Cardinality` - Represents the cardinality of a relationship in a graph.
- `Link` - Represents the different types of relationships between nodes in the diagram. - "aggregation": Indicates a has-a relationship where parts can exist independently - "association": Indicates a basic association between nodes - "composition": Indicates a contains relationship where parts cannot exist independently - "dependency": Indicates a uses/depends-on relationship - "inheritance": Indicates an inheritance/extends relationship - "realization": Indicates an implements/realizes relationship
- `Node` - Represents a node in the diagram, which can be a class, interface, type, enum, function, or variable.
- `NodeAttribute` - Represents the different types of attributes that can be displayed in a node. - "attribute": Represents a class/interface property or field - "enumOrTypeOption": Represents an enum value or type union option - "method": Represents a class/interface method or function - "separator": Represents a visual separator line
- `NodeStyle` - Represents the styling configuration for an element inside a node in the diagram.
- `NodeTitle` - Represents the title/header section of a node in the diagram.
- `NodeType` - Represents the different types of nodes that can be displayed in the diagram. - "class": Represents a class definition - "enum": Represents an enumeration - "function": Represents a function declaration - "interface": Represents an interface definition - "type": Represents a type definition - "variable": Represents a variable declaration

### Defaults
- `DEFAULT_THEME` - Default styling configuration
- `LIGHT_THEME_COLORS` - Default styling configuration
- `DARK_THEME_COLORS` - Default styling configuration
- `DEFAULT_DARK_CLASS_STYLE` - Default styling configuration
- `DEFAULT_DARK_ENUM_STYLE` - Default styling configuration
- `DEFAULT_DARK_FUNCTION_STYLE` - Default styling configuration
- `DEFAULT_DARK_INTERFACE_STYLE` - Default styling configuration
- `DEFAULT_DARK_TYPE_STYLE` - Default styling configuration
- `DEFAULT_DARK_VARIABLE_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_CLASS_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_ENUM_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_FUNCTION_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_INTERFACE_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_TYPE_STYLE` - Default styling configuration
- `DEFAULT_LIGHT_VARIABLE_STYLE` - Default styling configuration

