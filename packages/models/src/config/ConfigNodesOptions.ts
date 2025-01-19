import { isBoolean, isPlainObject } from "is-what";

/**
 * Interface defining display options that control what information is shown inside the nodes.
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

export function validateConfigNodesOptions(data: unknown): data is ConfigNodesOptions {
	if (!isPlainObject(data)) {
		console.debug("data must be an object, recieved: ", data);
		throw new Error("data must be an object");
	}
	if (data.hide_all_private !== undefined && !isBoolean(data.hide_all_private)) {
		console.debug("data.hide_all_private must be a boolean, recieved: ", data.hide_all_private);
		throw new Error("hide_all_private must be a boolean");
	}
	if (data.hide_all_protected !== undefined && !isBoolean(data.hide_all_protected)) {
		console.debug("data.hide_all_protected must be a boolean, recieved: ", data.hide_all_protected);
		throw new Error("hide_all_protected must be a boolean");
	}
	if (data.hide_all_public !== undefined && !isBoolean(data.hide_all_public)) {
		console.debug("data.hide_all_public must be a boolean, recieved: ", data.hide_all_public);
		throw new Error("hide_all_public must be a boolean");
	}
	if (data.hide_all_static !== undefined && !isBoolean(data.hide_all_static)) {
		console.debug("data.hide_all_static must be a boolean, recieved: ", data.hide_all_static);
		throw new Error("hide_all_static must be a boolean");
	}
	if (data.hide_attributes !== undefined && !isBoolean(data.hide_attributes)) {
		console.debug("data.hide_attributes must be a boolean, recieved: ", data.hide_attributes);
		throw new Error("hide_attributes must be a boolean");
	}
	if (data.hide_attributes_private !== undefined && !isBoolean(data.hide_attributes_private)) {
		console.debug("data.hide_attributes_private must be a boolean, recieved: ", data.hide_attributes_private);
		throw new Error("hide_attributes_private must be a boolean");
	}
	if (data.hide_attributes_protected !== undefined && !isBoolean(data.hide_attributes_protected)) {
		console.debug("data.hide_attributes_protected must be a boolean, recieved: ", data.hide_attributes_protected);
		throw new Error("hide_attributes_protected must be a boolean");
	}
	if (data.hide_attributes_public !== undefined && !isBoolean(data.hide_attributes_public)) {
		console.debug("data.hide_attributes_public must be a boolean, recieved: ", data.hide_attributes_public);
		throw new Error("hide_attributes_public must be a boolean");
	}
	if (data.hide_description !== undefined && !isBoolean(data.hide_description)) {
		console.debug("data.hide_description must be a boolean, recieved: ", data.hide_description);
		throw new Error("hide_description must be a boolean");
	}
	if (data.hide_methods !== undefined && !isBoolean(data.hide_methods)) {
		console.debug("data.hide_methods must be a boolean, recieved: ", data.hide_methods);
		throw new Error("hide_methods must be a boolean");
	}
	if (data.hide_methods_private !== undefined && !isBoolean(data.hide_methods_private)) {
		console.debug("data.hide_methods_private must be a boolean, recieved: ", data.hide_methods_private);
		throw new Error("hide_methods_private must be a boolean");
	}
	if (data.hide_methods_protected !== undefined && !isBoolean(data.hide_methods_protected)) {
		console.debug("data.hide_methods_protected must be a boolean, recieved: ", data.hide_methods_protected);
		throw new Error("hide_methods_protected must be a boolean");
	}
	if (data.hide_methods_public !== undefined && !isBoolean(data.hide_methods_public)) {
		console.debug("data.hide_methods_public must be a boolean, recieved: ", data.hide_methods_public);
		throw new Error("hide_methods_public must be a boolean");
	}
	if (data.hide_type !== undefined && !isBoolean(data.hide_type)) {
		console.debug("data.hide_type must be a boolean, recieved: ", data.hide_type);
		throw new Error("hide_type must be a boolean");
	}

	return true;
}

export function isConfigNodesOptions(data: unknown): data is ConfigNodesOptions {
	try {
		return validateConfigNodesOptions(data);
	} catch (e) {
		return false;
	}
}

export function newConfigNodesOptions(data?: Partial<ConfigNodesOptions>): ConfigNodesOptions {
	return {
		hide_all_private: data?.hide_all_private === true,
		hide_all_protected: data?.hide_all_protected === true,
		hide_all_public: data?.hide_all_public === true,
		hide_all_static: data?.hide_all_static === true,
		hide_attributes: data?.hide_all_static === true,
		hide_attributes_private: data?.hide_all_static === true,
		hide_attributes_protected: data?.hide_all_static === true,
		hide_attributes_public: data?.hide_all_static === true,
		hide_description: data?.hide_description ?? true,
		hide_methods: data?.hide_all_static === true,
		hide_methods_private: data?.hide_all_static === true,
		hide_methods_protected: data?.hide_all_static === true,
		hide_methods_public: data?.hide_all_static === true,
		hide_type: data?.hide_type === true,
	};
}

export function updateConfigNodesOptions(config: ConfigNodesOptions, updates: Partial<ConfigNodesOptions>): ConfigNodesOptions {
	return {
		...config,
		...updates,
	};
}
