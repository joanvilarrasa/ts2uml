import { isPlainObject, isString } from "is-what";
import { NodeTypeList, validateNodeType, type NodeType } from "../graph/NodeType";


/**
 * Interface defining filters for nodes to be displayed in the diagram.
 */
export interface ConfigNodesFilter {
    /** 
     * Array of strings to filter nodes by their file path or name.
     * This array can contain directories, files and concrete node ids.
     * If a directory is provided, all nodes within that directory will be excluded from the diagram.
     * If a file is provided, all nodes within that file will be excluded from the diagram.
     * If a concrete node id is provided, the node with that id will be excluded from the diagram.
     * Empty array means no path filtering.
     */
    filter_path: string[];

    /**
     * Array of node types to filter nodes by their type (e.g., class, interface, enum, etc.).
     * If a node type is provided, all nodes of that type will be excluded from the diagram.
     * Empty array means no type filtering.
     * @see {@link NodeType}
     */
    filter_type: NodeType[];
};

export function validateConfigNodesFilter(data: any): data is ConfigNodesFilter {
    if (!isPlainObject(data)) {
        console.debug("data must be an object, recieved: ", data);
        throw new Error("data must be an object");
    }
    if (!Array.isArray(data.filter_path) || !data.filter_path.every((node) => isString(node))) {
        console.debug("data.filter_path must be an array of strings, recieved: ", data.filter_path);
        throw new Error("filter_path must be an array of strings");
    }
    if (!Array.isArray(data.filter_type)) {
        console.debug("data.filter_type must be an array of strings and one of ", NodeTypeList, " recieved: ", data.filter_type);
        throw new Error("filter_type must be an array of strings and one of " + NodeTypeList);
    }
    for (const node of data.filter_type) {
        validateNodeType(node);
    }

    return true;
}

export function isConfigNodesFilter(data: any): data is ConfigNodesFilter {
    try { return validateConfigNodesFilter(data); }
    catch (e) { return false; }
}

export function newConfigNodesFilter(data?: Partial<ConfigNodesFilter>): ConfigNodesFilter {
    return {
        filter_path: data?.filter_path || [],
        filter_type: data?.filter_type || []
    };
}

export function updateConfigNodesFilter(config: ConfigNodesFilter, updates: Partial<ConfigNodesFilter>): ConfigNodesFilter {
    return {
        ...config,
        ...updates
    };
} 