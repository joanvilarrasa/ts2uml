# @ts2uml/models

This package contains the core data models used throughout the ts2uml project. Each model is defined as a TypeScript interface in its own file, with the filename matching the model name.


## Table of Contents

1. [Installation](#installation) : How to add this package to your project
2. [Usage](#usage) : Examples of how to use the models and their helper functions
3. [Structure](#structure) : The consistent pattern followed by all model files, including the auxiliary functions provided for each model
4. [Available Models](#available-models) : Auto-generated documentation of all models, their purposes, and categorization To update the README with the latest models, run:
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
- `config-links-filter` - 
- `config-links-options` - 
- `config-links` - 
- `config-nodes-filter` - 
- `config-nodes-options` - 
- `config-nodes` - 
- `config` - 

### Graph Models
- `graph` - 
- `link` - 
- `node-attribute` - 
- `node-style` - 
- `node-title` - 
- `node` - 

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

