// Export all types and interfaces
export type { Config } from './src/types/config/config';
export type { ConfigLinks } from './src/types/config/config-links';
export type { ConfigLinksFilter } from './src/types/config/config-links-filter';
export type { ConfigLinksOptions } from './src/types/config/config-links-options';
export type { ConfigNodes } from './src/types/config/config-nodes';
export type { ConfigNodesFilter } from './src/types/config/config-nodes-filter';
export type { ConfigNodesOptions } from './src/types/config/config-nodes-options';

export type { Graph } from './src/types/graph/graph';
export type { Link } from './src/types/graph/link';
export type { Node } from './src/types/graph/node';
export type { NodeAttribute } from './src/types/graph/node-attribute';
export type { NodeStyle } from './src/types/graph/node-style';
export type { NodeTitle } from './src/types/graph/node-title';

// Export enums and their types
export type { Cardinality } from './src/types/enums/cardinality';
export type { LinkType } from './src/types/enums/link-type';
export type { NodeAttributeScope } from './src/types/enums/node-attribute-scope';
export type { NodeAttributeType } from './src/types/enums/node-attribute-type';
export type { NodeType } from './src/types/enums/node-type';
export type { Theme } from './src/types/enums/theme';

// Export enum constants
export { LinkTypeList } from './src/types/enums/link-type';
export { NodeAttributeScopeList } from './src/types/enums/node-attribute-scope';
export { NodeAttributeTypeList } from './src/types/enums/node-attribute-type';
export { NodeTypeList } from './src/types/enums/node-type';

// Export Zod schemas
export { ZCardinality } from './src/types/enums/cardinality';
export { ZLinkType } from './src/types/enums/link-type';
export { ZNodeAttributeScope } from './src/types/enums/node-attribute-scope';
export { ZNodeAttributeType } from './src/types/enums/node-attribute-type';
export { ZNodeType } from './src/types/enums/node-type';
export { ZTheme } from './src/types/enums/theme';

export { ZConfig } from './src/types/config/config';
export { ZConfigLinks } from './src/types/config/config-links';
export { ZConfigLinksFilter } from './src/types/config/config-links-filter';
export { ZConfigLinksOptions } from './src/types/config/config-links-options';
export { ZConfigNodes } from './src/types/config/config-nodes';
export { ZConfigNodesFilter } from './src/types/config/config-nodes-filter';
export { ZConfigNodesOptions } from './src/types/config/config-nodes-options';

export { ZGraph } from './src/types/graph/graph';
export { ZLink } from './src/types/graph/link';
export { ZNode } from './src/types/graph/node';
export { ZNodeAttribute } from './src/types/graph/node-attribute';
export { ZNodeStyle } from './src/types/graph/node-style';
export { ZNodeTitle } from './src/types/graph/node-title';

// Export default styles and colors
export {
  DEFAULT_THEME,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
} from './src/defaults/colors';

export {
  DEFAULT_DARK_CLASS_STYLE,
  DEFAULT_DARK_ENUM_STYLE,
  DEFAULT_DARK_FUNCTION_STYLE,
  DEFAULT_DARK_INTERFACE_STYLE,
  DEFAULT_DARK_TYPE_STYLE,
  DEFAULT_DARK_VARIABLE_STYLE,
} from './src/defaults/dark-node-styles';

export {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_ENUM_STYLE,
  DEFAULT_LIGHT_FUNCTION_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
} from './src/defaults/light-node-styles';

// Export utility functions (assuming they exist in the mentioned files)
export { create } from './src/utils/create';
export { validate } from './src/utils/validate';
export { is } from './src/utils/is';
export { update, updateDeep } from './src/utils/update';
