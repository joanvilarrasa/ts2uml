import { isPlainObject, isBoolean } from "is-what";

/**
 * Interface defining the display options for links (relationships) in the diagram.
 */
export interface ConfigLinksOptions {
	/**
	 * Whether to hide all links in the diagram.
	 * If true, no links will be displayed.
	 */
	hide?: boolean;

	/**
	 * Whether to hide the arrows indicating link direction.
	 * If true, link lines will be shown without directional arrows.
	 */
	hide_arrows?: boolean;

	/**
	 * Whether to hide the cardinality indicators on links.
	 * If true, relationship multiplicities will not be displayed.
	 */
	hide_cardinality?: boolean;

	/**
	 * Whether to hide the text labels on links.
	 * If true, relationship type labels will not be displayed.
	 */
	hide_labels?: boolean;
}

export function validateConfigLinksOptions(data: unknown): data is ConfigLinksOptions {
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

export function isConfigLinksOptions(data: unknown): data is ConfigLinksOptions {
	try {
		return validateConfigLinksOptions(data);
	} catch (e) {
		return false;
	}
}

export function newConfigLinksOptions(data?: Partial<ConfigLinksOptions>): ConfigLinksOptions {
	return {
		hide: data?.hide === true,
		hide_arrows: data?.hide === true,
		hide_cardinality: data?.hide === true,
		hide_labels: data?.hide === true,
	};
}

export function updateConfigLinksOptions(config: ConfigLinksOptions, updates: Partial<ConfigLinksOptions>): ConfigLinksOptions {
	return {
		...config,
		...updates,
	};
}
