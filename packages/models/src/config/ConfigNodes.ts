import { isPlainObject } from "is-what";
import { DEFAULT_LIGHT_CLASS_STYLE, DEFAULT_LIGHT_ENUM_STYLE, DEFAULT_LIGHT_FUNCTION_STYLE, DEFAULT_LIGHT_INTERFACE_STYLE, DEFAULT_LIGHT_TYPE_STYLE, DEFAULT_LIGHT_VARIABLE_STYLE } from "../defaults/lightNodeStyles";
import { type NodeStyle, newNodeStyle, updateNodeStyle, validateNodeStyle } from "../graph/NodeStyle";
import type { NodeType } from "../graph/NodeType";
import { type ConfigNodesFilter, newConfigNodesFilter, updateConfigNodesFilter, validateConfigNodesFilter } from "./ConfigNodesFilter";
import { type ConfigNodesOptions, newConfigNodesOptions, updateConfigNodesOptions, validateConfigNodesOptions } from "./ConfigNodesOptions";

/**
 * Interface defining the configuration for displaying nodes in the diagram.
 */
export interface ConfigNodes {
	/**
	 * Configuration for filtering which nodes should be displayed in the diagram.
	 * @see {@link ConfigNodesFilter}
	 */
	filter: ConfigNodesFilter;

	/**
	 * Display options that control what information is shown inside the nodes.
	 * @see {@link ConfigNodesOptions}
	 */
	options: ConfigNodesOptions;

	/**
	 * Style configurations for each type of node (class, interface, etc).
	 * @see {@link NodeStyle}
	 */
	styles: { [K in NodeType]: NodeStyle };
}

export function validateConfigNodes(data: unknown): data is ConfigNodes {
	if (!isPlainObject(data)) {
		console.debug("data must be an object, recieved: ", data);
		throw new Error("data must be an object");
	}
	validateConfigNodesFilter(data.filter);
	validateConfigNodesOptions(data.options);
	if (!isPlainObject(data.styles)) {
		console.debug("data.styles must be an object, received: ", data.styles);
		throw new Error("styles must be an object");
	}
	for (const k of Object.keys(data.styles) as NodeType[]) {
		validateNodeStyle(data.styles[k]);
	}

	return true;
}

export function isConfigNodes(data: unknown): data is ConfigNodes {
	try {
		return validateConfigNodes(data);
	} catch (e) {
		return false;
	}
}

export function newConfigNodes(data?: Partial<ConfigNodes>): ConfigNodes {
	return {
		filter: newConfigNodesFilter(data?.filter),
		options: newConfigNodesOptions(data?.options),
		styles: {
			class: data?.styles?.class ? newNodeStyle(data?.styles?.class) : newNodeStyle(DEFAULT_LIGHT_CLASS_STYLE),
			enum: data?.styles?.enum ? newNodeStyle(data?.styles?.enum) : newNodeStyle(DEFAULT_LIGHT_ENUM_STYLE),
			function: data?.styles?.function ? newNodeStyle(data?.styles?.function) : newNodeStyle(DEFAULT_LIGHT_FUNCTION_STYLE),
			interface: data?.styles?.interface ? newNodeStyle(data?.styles?.interface) : newNodeStyle(DEFAULT_LIGHT_INTERFACE_STYLE),
			type: data?.styles?.type ? newNodeStyle(data?.styles?.type) : newNodeStyle(DEFAULT_LIGHT_TYPE_STYLE),
			variable: data?.styles?.variable ? newNodeStyle(data?.styles?.variable) : newNodeStyle(DEFAULT_LIGHT_VARIABLE_STYLE),
		},
	};
}

export function updateConfigNodes(config: ConfigNodes, updates: Partial<ConfigNodes>): ConfigNodes {
	return {
		filter: updateConfigNodesFilter(config.filter, updates.filter ?? {}),
		options: updateConfigNodesOptions(config.options, updates.options ?? {}),
		styles: {
			class: updateNodeStyle(config.styles.class, updates.styles?.class ?? {}),
			enum: updateNodeStyle(config.styles.enum, updates.styles?.enum ?? {}),
			function: updateNodeStyle(config.styles.function, updates.styles?.function ?? {}),
			interface: updateNodeStyle(config.styles.interface, updates.styles?.interface ?? {}),
			type: updateNodeStyle(config.styles.type, updates.styles?.type ?? {}),
			variable: updateNodeStyle(config.styles.variable, updates.styles?.variable ?? {}),
		},
	};
}
