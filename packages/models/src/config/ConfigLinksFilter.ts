import { isPlainObject } from "is-what";
import { type LinkType, LinkTypeList, validateLinkType } from "../graph/Link";

/**
 * Interface defining the configuration for filtering links (relationships) in the diagram.
 */
export interface ConfigLinksFilter {
	/**
	 * Array of link types to filter links by their type (e.g., inheritance, implementation, etc.).
	 * If a link type is provided, all links of that type will be excluded from the diagram.
	 * Empty array means no type filtering.
	 * @see {@link LinkType}
	 */
	filter_type: LinkType[];
}

export function validateConfigLinksFilter(data: unknown): data is ConfigLinksFilter {
	if (!isPlainObject(data)) {
		console.debug("data must be an object, recieved: ", data);
		throw new Error("data must be an object");
	}
	if (!Array.isArray(data.filter_type)) {
		console.debug("data.filter_type must be an array of strings and one of ", LinkTypeList, " recieved: ", data.filter_type);
		throw new Error(`filter_type must be an array of strings and one of ${LinkTypeList.join(", ")}`);
	}
	for (const linkType of data.filter_type) {
		validateLinkType(linkType);
	}

	return true;
}

export function isConfigLinksFilter(data: unknown): data is ConfigLinksFilter {
	try {
		return validateConfigLinksFilter(data);
	} catch (e) {
		return false;
	}
}

export function newConfigLinksFilter(data?: Partial<ConfigLinksFilter>): ConfigLinksFilter {
	return {
		filter_type: data?.filter_type || [],
	};
}

export function updateConfigLinksFilter(config: ConfigLinksFilter, updates: Partial<ConfigLinksFilter>): ConfigLinksFilter {
	return {
		...config,
		...updates,
	};
}
