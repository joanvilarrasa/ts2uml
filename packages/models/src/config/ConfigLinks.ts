import { isPlainObject } from "is-what";
import { type ConfigLinksFilter, validateConfigLinksFilter, newConfigLinksFilter, updateConfigLinksFilter } from "./ConfigLinksFilter";
import { type ConfigLinksOptions, validateConfigLinksOptions, newConfigLinksOptions, updateConfigLinksOptions } from "./ConfigLinksOptions";

/**
 * Interface defining the configuration for displaying links (relationships) in the diagram.
 */
export interface ConfigLinks {
    /** 
     * Configuration for filtering which links should be displayed in the diagram. 
     * @see {@link ConfigLinksFilter}
     */
    filter: ConfigLinksFilter;
    /** 
     * Display options that control how links are rendered. 
     * @see {@link ConfigLinksOptions}
     */
    options: ConfigLinksOptions;
};

export function validateConfigLinks(data: any): data is ConfigLinks {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    validateConfigLinksFilter(data.filter);
    validateConfigLinksOptions(data.options);

    return true;
}

export function isConfigLinks(data: any): data is ConfigLinks {
    try { return validateConfigLinks(data); }
    catch (e) { return false; }
}

export function newConfigLinks(data?: Partial<ConfigLinks>): ConfigLinks {
    return {
        filter: newConfigLinksFilter(data?.filter),
        options: newConfigLinksOptions(data?.options)
    };
}

export function updateConfigLinks(config: ConfigLinks, updates: Partial<ConfigLinks>): ConfigLinks {
    return {
        filter: updateConfigLinksFilter(config.filter, updates.filter ?? {}),
        options: updateConfigLinksOptions(config.options, updates.options ?? {})
    };
} 