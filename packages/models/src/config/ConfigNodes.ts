import { z } from "zod";
import { DEFAULT_LIGHT_CLASS_STYLE, DEFAULT_LIGHT_ENUM_STYLE, DEFAULT_LIGHT_FUNCTION_STYLE, DEFAULT_LIGHT_INTERFACE_STYLE, DEFAULT_LIGHT_TYPE_STYLE, DEFAULT_LIGHT_VARIABLE_STYLE } from "../defaults/lightNodeStyles";
import { ZNodeStyle, updateNodeStyle } from "../graph/NodeStyle";
import { ZNodeType } from "../graph/NodeType";
import { updateConfigNodesFilter, ZConfigNodesFilter } from "./ConfigNodesFilter";
import { updateConfigNodesOptions, ZConfigNodesOptions } from "./ConfigNodesOptions";

export const ZConfigNodes = z.object({
	/**
	 * Configuration for filtering which nodes should be displayed in the diagram.
	 * @see {@link ConfigNodesFilter}
	 */
	filter: ZConfigNodesFilter,

	/**
	 * Display options that control what information is shown inside the nodes.
	 * @see {@link ConfigNodesOptions}
	 */
	options: ZConfigNodesOptions,

	/**
	 * Style configurations for each type of node (class, interface, etc).
	 * @see {@link NodeStyle}
	 */
	styles: z.object({
		[ZNodeType.enum.class]: ZNodeStyle.default(DEFAULT_LIGHT_CLASS_STYLE),
		[ZNodeType.enum.enum]: ZNodeStyle.default(DEFAULT_LIGHT_ENUM_STYLE),
		[ZNodeType.enum.function]: ZNodeStyle.default(DEFAULT_LIGHT_FUNCTION_STYLE),
		[ZNodeType.enum.interface]: ZNodeStyle.default(DEFAULT_LIGHT_INTERFACE_STYLE),
		[ZNodeType.enum.type]: ZNodeStyle.default(DEFAULT_LIGHT_TYPE_STYLE),
		[ZNodeType.enum.variable]: ZNodeStyle.default(DEFAULT_LIGHT_VARIABLE_STYLE),
	}),
});


/**
 * Interface defining the configuration for displaying nodes in the diagram.
 */
export type ConfigNodes = z.infer<typeof ZConfigNodes>;

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
