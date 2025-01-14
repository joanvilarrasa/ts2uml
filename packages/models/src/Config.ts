import { isBoolean, isPlainObject, isString } from "../../vscode-ext/src/lib/is-what/dist";
import { type LinkType, LinkTypeList } from "./graph/Link";

/************************************************************
 * Type definitions
 ************************************************************/

// Define possible types for item filters
export type ItemType = "class" | "interface" | "type"  | "enum" | "function" | "variable";
export const ItemTypeList: ItemType[] = ["class", "interface", "type", "enum", "function", "variable"];

// Define the possible themes for the diagram.
export type Theme = "light" | "dark";
export const ThemeList = ["light", "dark"];

export interface Config {
    // Additional options for customizing the diagram.
    diagram: {
        // Whether to display a legend explaining diagram elements (true/false).
        show_legend: boolean;
    }

    // Configuration for displaying items.
    items: ConfigItems;

    // Metadata about the configuration itself.
    metadata: {
        // A version identifier for the configuration format.
        version: string;
    };

    // Configuration for displaying relationships between items.
    relations: ConfigRelations;

    // The theme to be applied to the diagram (e.g., light, dark, or custom).
    theme: Theme;
}

// Configuration for displaying items.
export interface ConfigItems {
    filter: ConfigItemsFilter;
    options: ConfigItemsOptions;
    styles: {[K in ItemType]: ConfigItemsStyles };
};

// Filters for items to be displayed.
export interface ConfigItemsFilter {
    // Filter items by the file they are defined in or the name.
    filter_path: string[];

    // Filter items by their type (e.g., class, interface, enum, etc.).
    filter_type: ItemType[];
};

// Display options for items.
export interface ConfigItemsOptions {
    // Whether to hide the description for items.
    hide_description?: boolean;

    // Whether to hide the type for items (e.g., class, interface, etc.).
    hide_type?: boolean;

    // All
    // Whether to hide the public members of all items.
    hide_all_public?: boolean;
    // Whether to hide the private members of all items.
    hide_all_private?: boolean;
    // Whether to hide the protected members of all items.
    hide_all_protected?: boolean;
    // Whether to hide the static members of all items.
    hide_all_static?: boolean;

    // Attributes.
    // Whether to hide the attributes of all items.
    hide_attributes?: boolean;
    // Whether to hide the public attributes of all items.
    hide_attributes_public?: boolean;
    // Whether to hide the private attributes of all items.
    hide_attributes_private?: boolean;
    // Whether to hide the protected attributes of all items.
    hide_attributes_protected?: boolean;

    // Methods
    // Whether to hide the methods of all items.
    hide_methods?: boolean;
    // Whether to hide the public methods of all items.
    hide_methods_public?: boolean;
    // Whether to hide the private methods of all items.
    hide_methods_private?: boolean;
    // Whether to hide the protected methods of all items.
    hide_methods_protected?: boolean;

};

// Styles for items to be displayed.
export interface ConfigItemsStyles {
    primaryColor: string;
}

// Configuration for displaying relationships between items.
export interface ConfigRelations {
    filter: ConfigRelationsFilter;
    options: ConfigRelationsOptions;
};

// Filters for relationships to be displayed.
export interface ConfigRelationsFilter {
    // Filter relationships by type (e.g., inheritance, association, etc.).
    filter_type: LinkType[];
};

// Display options for relationships.
export interface ConfigRelationsOptions {
    // Whether to hide relationships (true/false).
    hide?: boolean;

    // Whether to hide arrows for relationships (true/false).
    hide_arrows?: boolean;

    // Whether to hide cardinality for relationships (true/false).
    hide_cardinality?: boolean;

    // Whether to hide labels for relationships (true/false).
    hide_labels?: boolean;
};

/************************************************************
 * Validator functions
 ************************************************************/

export function validateConfig(data: any): data is Config {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!isPlainObject(data.diagram)) {
        console.debug("data.diagram must be an object, recieved: ", data.diagram);
        throw new Error("diagram must be an object");
    }
    if (!isPlainObject(data.metadata)) {
        console.debug("data.metadata must be an object, recieved: ", data.metadata);
        throw new Error("metadata must be an object");
    }
    if (!isString(data.metadata.version)) {
        console.debug("data.metadata.version must be a string, recieved: ", data.metadata.version);
        throw new Error("version must be a string");
    }
    if (!isString(data.theme) || !ThemeList.includes(data.theme)) {
        console.debug("data.theme must be a string and one of ", ThemeList, " recieved: ", data.theme);
        throw new Error("theme must be a string and one of " + ThemeList);
    }
    if (!isBoolean(data.diagram.show_legend)) {
        console.debug("data.diagram.show_legend must be a boolean, recieved: ", data.diagram.show_legend);
        throw new Error("show_legend must be a boolean");
    }

    validateConfigItems(data.items);
    validateConfigRelations(data.relations);

    return true;
}

export function validateConfigItems(data: any): data is ConfigItems {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    validateConfigItemsFilter(data.filter);
    validateConfigItemsOptions(data.options);
    validateConfigItemsStyles(data.styles);

    return true;
}

export function validateConfigItemsFilter(data: any): data is ConfigItemsFilter {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!Array.isArray(data.filter_path) || !data.filter_path.every((item) => isString(item))) {
        console.debug("data.filter_path must be an array of strings, recieved: ", data.filter_path);
        throw new Error("filter_path must be an array of strings");
    }
    if (!Array.isArray(data.filter_type) || !data.filter_type.every((item) => ItemTypeList.includes(item))) {
        console.debug("data.filter_type must be an array of strings and one of ", ItemTypeList, " recieved: ", data.filter_type);
        throw new Error("filter_type must be an array of strings and one of " + ItemTypeList);
    }

    return true;
}

export function validateConfigItemsOptions(data: any): data is ConfigItemsOptions {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (data.hide_description !== undefined && !isBoolean(data.hide_description)) {
        console.debug("data.hide_description must be a boolean, recieved: ", data.hide_description);
        throw new Error("hide_description must be a boolean");
    }
    if (data.hide_type !== undefined && !isBoolean(data.hide_type)) {
        console.debug("data.hide_type must be a boolean, recieved: ", data.hide_type);
        throw new Error("hide_type must be a boolean");
    }
    if (data.hide_all_public !== undefined && !isBoolean(data.hide_all_public)) {
        console.debug("data.hide_all_public must be a boolean, recieved: ", data.hide_all_public);
        throw new Error("hide_all_public must be a boolean");
    }
    if (data.hide_all_private !== undefined && !isBoolean(data.hide_all_private)) {
        console.debug("data.hide_all_private must be a boolean, recieved: ", data.hide_all_private);
        throw new Error("hide_all_private must be a boolean");
    }
    if (data.hide_all_protected !== undefined && !isBoolean(data.hide_all_protected)) {
        console.debug("data.hide_all_protected must be a boolean, recieved: ", data.hide_all_protected);
        throw new Error("hide_all_protected must be a boolean");
    }
    if (data.hide_all_static !== undefined && !isBoolean(data.hide_all_static)) {
        console.debug("data.hide_all_static must be a boolean, recieved: ", data.hide_all_static);
        throw new Error("hide_all_static must be a boolean");
    }
    if (data.hide_attributes !== undefined && !isBoolean(data.hide_attributes)) {
        console.debug("data.hide_attributes must be a boolean, recieved: ", data.hide_attributes);
        throw new Error("hide_attributes must be a boolean");
    }
    if (data.hide_attributes_public !== undefined && !isBoolean(data.hide_attributes_public)) {
        console.debug("data.hide_attributes_public must be a boolean, recieved: ", data.hide_attributes_public);
        throw new Error("hide_attributes_public must be a boolean");
    }
    if (data.hide_attributes_private !== undefined && !isBoolean(data.hide_attributes_private)) {
        console.debug("data.hide_attributes_private must be a boolean, recieved: ", data.hide_attributes_private);
        throw new Error("hide_attributes_private must be a boolean");
    }
    if (data.hide_attributes_protected !== undefined && !isBoolean(data.hide_attributes_protected)) {
        console.debug("data.hide_attributes_protected must be a boolean, recieved: ", data.hide_attributes_protected);
        throw new Error("hide_attributes_protected must be a boolean");
    }
    if (data.hide_methods !== undefined && !isBoolean(data.hide_methods)) {
        console.debug("data.hide_methods must be a boolean, recieved: ", data.hide_methods);
        throw new Error("hide_methods must be a boolean");
    }
    if (data.hide_methods_public !== undefined && !isBoolean(data.hide_methods_public)) {
        console.debug("data.hide_methods_public must be a boolean, recieved: ", data.hide_methods_public);
        throw new Error("hide_methods_public must be a boolean");
    }
    if (data.hide_methods_private !== undefined && !isBoolean(data.hide_methods_private)) {
        console.debug("data.hide_methods_private must be a boolean, recieved: ", data.hide_methods_private);
        throw new Error("hide_methods_private must be a boolean");
    }
    if (data.hide_methods_protected !== undefined && !isBoolean(data.hide_methods_protected)) {
        console.debug("data.hide_methods_protected must be a boolean, recieved: ", data.hide_methods_protected);
        throw new Error("hide_methods_protected must be a boolean");
    }

    return true;
}

export function validateConfigItemsStyles(data: any): data is ConfigItemsStyles {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!isString(data.primaryColor)) {
        console.debug("data.primaryColor must be a string, recieved: ", data.primaryColor);
        throw new Error("primaryColor must be a string");
    }
    return true;
}

export function validateConfigRelations(data: any): data is ConfigRelationsFilter {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    validateConfigRelationsFilter(data.filter);
    validateConfigRelationsOptions(data.options);

    return true;
}

export function validateConfigRelationsFilter(data: any): data is ConfigRelationsFilter {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!Array.isArray(data.filter_type) || !data.filter_type.every((item) => LinkTypeList.includes(item))) {
        console.debug("data.filter_type must be an array of strings and one of ", LinkTypeList, " recieved: ", data.filter_type);
        throw new Error("filter_type must be an array of strings and one of " + LinkTypeList);
    }

    return true;
}

export function validateConfigRelationsOptions(data: any): data is ConfigRelationsOptions {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (data.hide !== undefined && !isBoolean(data.hide)) {
        console.debug("data.hide must be a boolean, recieved: ", data.hide);
        throw new Error("hide must be a boolean");
    }
    if (data.hide_arrows !== undefined && !isBoolean(data.hide_arrows)) {
        console.debug("data.hide_arrows must be a boolean, recieved: ", data.hide_arrows);
        throw new Error("hide_arrows must be a boolean");
    }
    if (data.hide_cardinality !== undefined && !isBoolean(data.hide_cardinality)) {
        console.debug("data.hide_cardinality must be a boolean, recieved: ", data.hide_cardinality);
        throw new Error("hide_cardinality must be a boolean");
    }
    if (data.hide_labels !== undefined && !isBoolean(data.hide_labels)) {
        console.debug("data.hide_labels must be a boolean, recieved: ", data.hide_labels);
        throw new Error("hide_labels must be a boolean");
    }

    return true;
}


/************************************************************
 * is functions
 ************************************************************/

export function isConfig(data: any): data is Config {
    try { return validateConfig(data); }
    catch (e) { return false; }
}

export function isConfigItems(data: any): data is ConfigItems {
    try { return validateConfigItems(data); }
    catch (e) { return false; }
}

export function isConfigItemsFilter(data: any): data is ConfigItemsFilter {
    try { return validateConfigItemsFilter(data); }
    catch (e) { return false; }
}

export function isConfigItemsOptions(data: any): data is ConfigItemsOptions {
    try { return validateConfigItemsOptions(data); }
    catch (e) { return false; }
}

export function isConfigItemsStyles(data: any): data is ConfigItemsStyles {
    try { return validateConfigItemsStyles(data); }
    catch (e) { return false; }
}

export function isConfigRelations(data: any): data is ConfigRelations {
    try { return validateConfigRelations(data); }
    catch (e) { return false; }
}

export function isConfigRelationsFilter(data: any): data is ConfigRelationsFilter {
    try { return validateConfigRelationsFilter(data); }
    catch (e) { return false; }
}

export function isConfigRelationsOptions(data: any): data is ConfigRelationsOptions {
    try { return validateConfigRelationsOptions(data); }
    catch (e) { return false; }
}

/************************************************************
 * defaults
 ************************************************************/

export function getDefaultConfig(data?: Partial<Config>): Config {
    return {
        diagram: {
            show_legend: data?.diagram?.show_legend === true,
        },
        items: getDefaultConfigItems(data?.items),
        metadata: {
            version: data?.metadata?.version || "1.0.0",
        },
        relations: getDefaultConfigRelations(data?.relations),
        theme: data?.theme || "light"
    };
}

export function getDefaultConfigItems(data?: Partial<ConfigItems>): ConfigItems {
    return {
        filter: getDefaultConfigItemsFilter(data?.filter),
        options: getDefaultConfigItemsOptions(data?.options),
        styles: {
            class: data?.styles?.class ? getDefaultConfigItemsStyles(data?.styles?.class) : getDefaultConfigItemsStyles({ primaryColor: "#4980af" }),
            interface: data?.styles?.interface ? getDefaultConfigItemsStyles(data?.styles?.interface) : getDefaultConfigItemsStyles({ primaryColor: "#4B999A" }),
            type: data?.styles?.type ? getDefaultConfigItemsStyles(data?.styles?.type) : getDefaultConfigItemsStyles({ primaryColor: "#8d578c" }),
            enum: data?.styles?.enum ? getDefaultConfigItemsStyles(data?.styles?.enum) : getDefaultConfigItemsStyles({ primaryColor: "#8d578c" }),
            function: data?.styles?.function ? getDefaultConfigItemsStyles(data?.styles?.function) : getDefaultConfigItemsStyles({ primaryColor: "#e9d382" }),
            variable: data?.styles?.variable ? getDefaultConfigItemsStyles(data?.styles?.variable) : getDefaultConfigItemsStyles({ primaryColor: "#e9d382" })
        }
    };
}

export function getDefaultConfigItemsFilter(data?: Partial<ConfigItemsFilter>): ConfigItemsFilter {
    return {
        filter_path: data?.filter_path || [],
        filter_type: data?.filter_type || []
    };
}

export function getDefaultConfigItemsOptions(data?: Partial<ConfigItemsOptions>): ConfigItemsOptions {
    return {
        hide_description: data?.hide_description === false ? false : true,
        hide_type: data?.hide_type === true,
        hide_all_public: data?.hide_all_public === true,
        hide_all_private: data?.hide_all_private === true,
        hide_all_protected: data?.hide_all_protected === true,
        hide_all_static: data?.hide_all_static === true,
        hide_attributes: data?.hide_all_static === true,
        hide_attributes_public: data?.hide_all_static === true,
        hide_attributes_private: data?.hide_all_static === true,
        hide_attributes_protected: data?.hide_all_static === true,
        hide_methods: data?.hide_all_static === true,
        hide_methods_public: data?.hide_all_static === true,
        hide_methods_private: data?.hide_all_static === true,
        hide_methods_protected: data?.hide_all_static === true,
    };
}

export function getDefaultConfigItemsStyles(data?: Partial<ConfigItemsStyles>): ConfigItemsStyles {
    return {
        primaryColor: data?.primaryColor || "black"
    };
}

export function getDefaultConfigRelations(data?: Partial<ConfigRelations>): ConfigRelations {
    return {
        filter: getDefaultConfigRelationsFilter(data?.filter),
        options: getDefaultConfigRelationsOptions(data?.options)
    };
}

export function getDefaultConfigRelationsFilter(data?: Partial<ConfigRelationsFilter>): ConfigRelationsFilter {
    return {
        filter_type: data?.filter_type || []
    };
}

export function getDefaultConfigRelationsOptions(data?: Partial<ConfigRelationsOptions>): ConfigRelationsOptions {
    return {
        hide: data?.hide === true,
        hide_arrows: data?.hide === true,
        hide_cardinality: data?.hide === true,
        hide_labels: data?.hide === true
    };
}

/************************************************************
 * updates
 ************************************************************/
export function updateConfig(config: Config, updates: Partial<Config>): Config {
    return {
        diagram: {
            ...config.diagram,
            ...updates.diagram ?? {}
        },
        items: updateConfigItems(config.items, updates.items ?? {}),
        metadata: {
            ...config.metadata,
            ...updates.metadata ?? {}
        },
        relations: updateConfigRelations(config.relations, updates.relations ?? {}),
        theme: updates.theme ?? config.theme
    };
}

export function updateConfigItems(config: ConfigItems, updates: Partial<ConfigItems>): ConfigItems {
    return {
        filter: updateConfigItemsFilter(config.filter, updates.filter ?? {}),
        options: updateConfigItemsOptions(config.options, updates.options ?? {}),
        styles: {
            class: updateConfigItemsStyles(config.styles.class, updates.styles?.class ?? {}),
            interface: updateConfigItemsStyles(config.styles.interface, updates.styles?.interface ?? {}),
            type: updateConfigItemsStyles(config.styles.type, updates.styles?.type ?? {}),
            enum: updateConfigItemsStyles(config.styles.enum, updates.styles?.enum ?? {}),
            function: updateConfigItemsStyles(config.styles.function, updates.styles?.function ?? {}),
            variable: updateConfigItemsStyles(config.styles.variable, updates.styles?.variable ?? {})
        }
    };
}

export function updateConfigItemsFilter(config: ConfigItemsFilter, updates: Partial<ConfigItemsFilter>): ConfigItemsFilter {
    return {
        ...config,
        ...updates
    };
}

export function updateConfigItemsOptions(config: ConfigItemsOptions, updates: Partial<ConfigItemsOptions>): ConfigItemsOptions {
    return {
        ...config,
        ...updates
    };
}

export function updateConfigItemsStyles(config: ConfigItemsStyles, updates: Partial<ConfigItemsStyles>): ConfigItemsStyles {
    return {
        ...config,
        ...updates
    };
}

export function updateConfigRelations(config: ConfigRelations, updates: Partial<ConfigRelations>): ConfigRelations {
    return {
        filter: updateConfigRelationsFilter(config.filter, updates.filter ?? {}),
        options: updateConfigRelationsOptions(config.options, updates.options ?? {})
    };
}

export function updateConfigRelationsFilter(config: ConfigRelationsFilter, updates: Partial<ConfigRelationsFilter>): ConfigRelationsFilter {
    return {
        ...config,
        ...updates
    };
}

export function updateConfigRelationsOptions(config: ConfigRelationsOptions, updates: Partial<ConfigRelationsOptions>): ConfigRelationsOptions {
    return {
        ...config,
        ...updates
    };
}