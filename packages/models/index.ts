// Config exports
export type { Config, Theme } from "./src/config/Config";
export { ThemeList, validateConfig, isConfig, newConfig, updateConfig } from "./src/config/Config";

export type { ConfigLinks } from "./src/config/ConfigLinks";
export { validateConfigLinks, isConfigLinks, newConfigLinks, updateConfigLinks } from "./src/config/ConfigLinks";

export type { ConfigLinksFilter } from "./src/config/ConfigLinksFilter";
export {
	validateConfigLinksFilter,
	isConfigLinksFilter,
	newConfigLinksFilter,
	updateConfigLinksFilter,
} from "./src/config/ConfigLinksFilter";

export type { ConfigLinksOptions } from "./src/config/ConfigLinksOptions";
export {
	validateConfigLinksOptions,
	isConfigLinksOptions,
	newConfigLinksOptions,
	updateConfigLinksOptions,
} from "./src/config/ConfigLinksOptions";

export type { ConfigNodes } from "./src/config/ConfigNodes";
export { validateConfigNodes, isConfigNodes, newConfigNodes, updateConfigNodes } from "./src/config/ConfigNodes";

export type { ConfigNodesFilter } from "./src/config/ConfigNodesFilter";
export {
	validateConfigNodesFilter,
	isConfigNodesFilter,
	newConfigNodesFilter,
	updateConfigNodesFilter,
} from "./src/config/ConfigNodesFilter";

export type { ConfigNodesOptions } from "./src/config/ConfigNodesOptions";
export {
	validateConfigNodesOptions,
	isConfigNodesOptions,
	newConfigNodesOptions,
	updateConfigNodesOptions,
} from "./src/config/ConfigNodesOptions";

// Graph exports
export type { Cardinality } from "./src/graph/Cardinality";
export { stringifyCardinality, validateCardinality, isCardinality } from "./src/graph/Cardinality";

export type { Link, LinkType } from "./src/graph/Link";
export {
	LinkTypeList,
	validateLinkType,
	isLinkType,
	validateLink,
	isLink,
	newLink,
	updateLink,
} from "./src/graph/Link";

export type { Node } from "./src/graph/Node";
export { validateNode, isNode, newNode, updateNode } from "./src/graph/Node";

export type { NodeAttribute, NodeAttributeType, NodeAttributeScope } from "./src/graph/NodeAttribute";
export {
	NodeAttributeTypeList,
	NodeAttributeScopeList,
	validateNodeAttributeType,
	isNodeAttributeType,
	validateNodeAttributeScope,
	isNodeAttributeScope,
	validateNodeAttribute,
	isNodeAttribute,
	newNodeAttribute,
	updateNodeAttribute,
} from "./src/graph/NodeAttribute";

export type { NodeStyle } from "./src/graph/NodeStyle";
export { validateNodeStyle, isNodeStyle, newNodeStyle, updateNodeStyle } from "./src/graph/NodeStyle";

export type { NodeTitle } from "./src/graph/NodeTitle";
export { validateNodeTitle, isNodeTitle, newNodeTitle, updateNodeTitle } from "./src/graph/NodeTitle";

export type { NodeType } from "./src/graph/NodeType";
export { NodeTypeList, validateNodeType, isNodeType } from "./src/graph/NodeType";

// Defaults exports
export { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from "./src/defaults/colors";
export {
	DEFAULT_LIGHT_CLASS_STYLE,
	DEFAULT_LIGHT_ENUM_STYLE,
	DEFAULT_LIGHT_FUNCTION_STYLE,
	DEFAULT_LIGHT_INTERFACE_STYLE,
	DEFAULT_LIGHT_TYPE_STYLE,
	DEFAULT_LIGHT_VARIABLE_STYLE,
} from "./src/defaults/lightNodeStyles";
export {
	DEFAULT_DARK_CLASS_STYLE,
	DEFAULT_DARK_ENUM_STYLE,
	DEFAULT_DARK_FUNCTION_STYLE,
	DEFAULT_DARK_INTERFACE_STYLE,
	DEFAULT_DARK_TYPE_STYLE,
	DEFAULT_DARK_VARIABLE_STYLE,
} from "./src/defaults/darkNodeStyles";
