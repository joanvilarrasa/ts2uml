import { z } from "zod";

/**
 * Type defining display options that control what information is shown inside the nodes.
 */
export interface ConfigNodesOptions {
	/**
	 * Whether to hide all private members (attributes and methods)
	 */
	hide_all_private?: boolean;
	/**
	 * Whether to hide all protected members (attributes and methods)
	 */
	hide_all_protected?: boolean;
	/**
	 * Whether to hide all public members (attributes and methods)
	 */
	hide_all_public?: boolean;
	/**
	 * Whether to hide all static members (attributes and methods)
	 */
	hide_all_static?: boolean;

	/**
	 * Whether to hide all attributes regardless of visibility
	 */
	hide_attributes?: boolean;
	/**
	 * Whether to hide private attributes
	 */
	hide_attributes_private?: boolean;
	/**
	 * Whether to hide protected attributes
	 */
	hide_attributes_protected?: boolean;
	/**
	 * Whether to hide public attributes
	 */
	hide_attributes_public?: boolean;

	/**
	 * Whether to hide the description for nodes
	 */
	hide_description?: boolean;

	/**
	 * Whether to hide all methods regardless of visibility
	 */
	hide_methods?: boolean;
	/**
	 * Whether to hide private methods
	 */
	hide_methods_private?: boolean;
	/**
	 * Whether to hide protected methods
	 */
	hide_methods_protected?: boolean;
	/**
	 * Whether to hide public methods
	 */
	hide_methods_public?: boolean;

	/**
	 * Whether to hide the type for nodes (e.g., class, interface, etc.)
	 */
	hide_type?: boolean;
}

const _ZConfigNodesOptions = z.object({
	hide_all_private: z.boolean({ invalid_type_error: "hide_all_private must be a boolean" }).optional().default(false),
	hide_all_protected: z.boolean({ invalid_type_error: "hide_all_protected must be a boolean" }).optional().default(false),
	hide_all_public: z.boolean({ invalid_type_error: "hide_all_public must be a boolean" }).optional().default(false),
	hide_all_static: z.boolean({ invalid_type_error: "hide_all_static must be a boolean" }).optional().default(false),
	hide_attributes: z.boolean({ invalid_type_error: "hide_attributes must be a boolean" }).optional().default(false),
	hide_attributes_private: z.boolean({ invalid_type_error: "hide_attributes_private must be a boolean" }).optional().default(false),
	hide_attributes_protected: z.boolean({ invalid_type_error: "hide_attributes_protected must be a boolean" }).optional().default(false),
	hide_attributes_public: z.boolean({ invalid_type_error: "hide_attributes_public must be a boolean" }).optional().default(false),
	hide_description: z.boolean({ invalid_type_error: "hide_description must be a boolean" }).optional().default(false),
	hide_methods: z.boolean({ invalid_type_error: "hide_methods must be a boolean" }).optional().default(false),
	hide_methods_private: z.boolean({ invalid_type_error: "hide_methods_private must be a boolean" }).optional().default(false),
	hide_methods_protected: z.boolean({ invalid_type_error: "hide_methods_protected must be a boolean" }).optional().default(false),
	hide_methods_public: z.boolean({ invalid_type_error: "hide_methods_public must be a boolean" }).optional().default(false),
	hide_type: z.boolean({ invalid_type_error: "hide_type must be a boolean" }).optional().default(false),
});
export const ZConfigNodesOptions: z.ZodType<ConfigNodesOptions> = _ZConfigNodesOptions;

export function updateConfigNodesOptions(config: ConfigNodesOptions, updates: Partial<ConfigNodesOptions>): ConfigNodesOptions {
	return {
		...config,
		...updates,
	};
}
