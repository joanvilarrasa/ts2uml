import { isBoolean, isPlainObject, isString } from "is-what";
import { newConfigNodes, updateConfigNodes, validateConfigNodes, type ConfigNodes } from "./ConfigNodes";
import { newConfigLinks, updateConfigLinks, validateConfigLinks, type ConfigLinks } from "./ConfigLinks";

/**
 * Represents the available themes for the diagram appearance.
 * - "light": Light theme with bright background and dark elements
 * - "dark": Dark theme with dark background and light elements
 */
export type Theme = "light" | "dark";
export const ThemeList = ["light", "dark"];

/**
 * Main configuration object that controls the overall diagram appearance and behavior.
 * Contains settings for theme, display options, and filtering of nodes and relationships.
 */
export interface Config {
    /** 
     * Additional options for customizing the diagram.
     */
    diagram: {
        /**
         * Whether to display a legend explaining diagram elements.
         */
        show_legend: boolean;
    }

    /**
     * Configuration for displaying relationships between nodes.
     * @see {@link ConfigLinks}
     */
    links: ConfigLinks;

    /**
     * Metadata about the configuration itself.
     */
    metadata: {
        /**
         * A version identifier for the configuration format.
         */
        version: string;
    };

    /**
     * Configuration for displaying nodes in the diagram.
     * @see {@link ConfigNodes}
     */
    nodes: ConfigNodes;

    /**
     * The theme to be applied to the diagram.
     * @see {@link Theme}
     */
    theme: Theme;
}


export function validateConfig(data: any): data is Config {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!isPlainObject(data.diagram)) {
        console.debug("data.diagram must be an object, recieved: ", data.diagram);
        throw new Error("diagram must be an object");
    }
    if (!isBoolean(data.diagram.show_legend)) {
        console.debug("data.diagram.show_legend must be a boolean, recieved: ", data.diagram.show_legend);
        throw new Error("show_legend must be a boolean");
    }
    validateConfigLinks(data.links);
    if (!isPlainObject(data.metadata)) {
        console.debug("data.metadata must be an object, recieved: ", data.metadata);
        throw new Error("metadata must be an object");
    }
    if (!isString(data.metadata.version)) {
        console.debug("data.metadata.version must be a string, recieved: ", data.metadata.version);
        throw new Error("version must be a string");
    }
    validateConfigNodes(data.nodes);
    if (!isString(data.theme) || !ThemeList.includes(data.theme)) {
        console.debug("data.theme must be a string and one of ", ThemeList, " recieved: ", data.theme);
        throw new Error("theme must be a string and one of " + ThemeList);
    }

    return true;
}


export function isConfig(data: any): data is Config {
    try { return validateConfig(data); }
    catch (e) { return false; }
}

export function newConfig(data?: Partial<Config>): Config {
    return {
        diagram: {
            show_legend: data?.diagram?.show_legend === true,
        },
        links: newConfigLinks(data?.links),
        metadata: {
            version: data?.metadata?.version || "1.0.0",
        },
        nodes: newConfigNodes(data?.nodes),
        theme: data?.theme || "light"
    };
}

export function updateConfig(config: Config, updates: Partial<Config>): Config {
    return {
        diagram: {
            ...config.diagram,
            ...updates.diagram ?? {}
        },
        links: updateConfigLinks(config.links, updates.links ?? {}),
        metadata: {
            ...config.metadata,
            ...updates.metadata ?? {}
        },
        nodes: updateConfigNodes(config.nodes, updates.nodes ?? {}),
        theme: updates.theme ?? config.theme
    };
}
