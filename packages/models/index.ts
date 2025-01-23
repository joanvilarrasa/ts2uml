// Export all types and interfaces
export type { Config } from './src/types/config/config.ts';
export type { ConfigLinks } from './src/types/config/config-links.ts';
export type { ConfigLinksFilter } from './src/types/config/config-links-filter.ts';
export type { ConfigLinksOptions } from './src/types/config/config-links-options.ts';
export type { ConfigNodes } from './src/types/config/config-nodes.ts';
export type { ConfigNodesFilter } from './src/types/config/config-nodes-filter.ts';
export type { ConfigNodesOptions } from './src/types/config/config-nodes-options.ts';

export type { Graph } from './src/types/graph/graph.ts';
export type { Link } from './src/types/graph/link.ts';
export type { Node } from './src/types/graph/node.ts';
export type { NodeAttribute } from './src/types/graph/node-attribute.ts';
export type { NodeStyle } from './src/types/graph/node-style.ts';
export type { NodeTitle } from './src/types/graph/node-title.ts';

// Export enums and their types
export type { Cardinality } from './src/types/enums/cardinality.ts';
export type { LinkType } from './src/types/enums/link-type.ts';
export type { NodeAttributeScope } from './src/types/enums/node-attribute-scope.ts';
export type { NodeAttributeType } from './src/types/enums/node-attribute-type.ts';
export type { NodeType } from './src/types/enums/node-type.ts';
export type { Theme } from './src/types/enums/theme.ts';

// Export enum constants
export { LinkTypeList } from './src/types/enums/link-type.ts';
export { NodeAttributeScopeList } from './src/types/enums/node-attribute-scope.ts';
export { NodeAttributeTypeList } from './src/types/enums/node-attribute-type.ts';
export { NodeTypeList } from './src/types/enums/node-type.ts';

// Export Zod schemas
export { ZCardinality } from './src/types/enums/cardinality.ts';
export { ZLinkType } from './src/types/enums/link-type.ts';
export { ZNodeAttributeScope } from './src/types/enums/node-attribute-scope.ts';
export { ZNodeAttributeType } from './src/types/enums/node-attribute-type.ts';
export { ZNodeType } from './src/types/enums/node-type.ts';
export { ZTheme } from './src/types/enums/theme.ts';

export { ZConfig } from './src/types/config/config.ts';
export { ZConfigLinks } from './src/types/config/config-links.ts';
export { ZConfigLinksFilter } from './src/types/config/config-links-filter.ts';
export { ZConfigLinksOptions } from './src/types/config/config-links-options.ts';
export { ZConfigNodes } from './src/types/config/config-nodes.ts';
export { ZConfigNodesFilter } from './src/types/config/config-nodes-filter.ts';
export { ZConfigNodesOptions } from './src/types/config/config-nodes-options.ts';

export { ZGraph } from './src/types/graph/graph.ts';
export { ZLink } from './src/types/graph/link.ts';
export { ZNode } from './src/types/graph/node.ts';
export { ZNodeAttribute } from './src/types/graph/node-attribute.ts';
export { ZNodeStyle } from './src/types/graph/node-style.ts';
export { ZNodeTitle } from './src/types/graph/node-title.ts';

// Export default styles and colors
export {
  DEFAULT_THEME,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
} from './src/defaults/colors.ts';

export {
  DEFAULT_DARK_CLASS_STYLE,
  DEFAULT_DARK_ENUM_STYLE,
  DEFAULT_DARK_FUNCTION_STYLE,
  DEFAULT_DARK_INTERFACE_STYLE,
  DEFAULT_DARK_TYPE_STYLE,
  DEFAULT_DARK_VARIABLE_STYLE,
} from './src/defaults/dark-node-styles.ts';

export {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_ENUM_STYLE,
  DEFAULT_LIGHT_FUNCTION_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
} from './src/defaults/light-node-styles.ts';

// Export utility functions (assuming they exist in the mentioned files)
export { create } from './src/utils/create.ts';
export { validate } from './src/utils/validate.ts';
export { is } from './src/utils/is.ts';
export { update, updateDeep } from './src/utils/update.ts';
