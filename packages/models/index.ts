// Export all types and interfaces
export type { Config } from './src/types/config/config.ts';
export type { ConfigLinks } from './src/types/config/config-links.ts';
export type { ConfigLinksFilter } from './src/types/config/config-links-filter.ts';
export type { ConfigLinksOptions } from './src/types/config/config-links-options.ts';
export type { ConfigNodes } from './src/types/config/config-nodes.ts';
export type { ConfigNodesFilter } from './src/types/config/config-nodes-filter.ts';
export type { ConfigNodesOptions } from './src/types/config/config-nodes-options.ts';
export type { LayoutAlgorithm } from './src/types/config/layout-algorithm.ts';
export type { LinkPathAlgorithm } from './src/types/config/link-path-algorithm.ts';
export type { Theme } from './src/types/config/theme.ts';

export type { Graph } from './src/types/graph/graph.ts';
export type { Link } from './src/types/graph/link.ts';
export type { LinkType } from './src/types/graph/link-type.ts';
export type { Node } from './src/types/graph/node.ts';
export type { NodeType } from './src/types/graph/node-type.ts';
export type { NodeAttribute } from './src/types/graph/node-attribute.ts';
export type { NodeAttributeScope } from './src/types/graph/node-attribute-scope.ts';
export type { NodeAttributeType } from './src/types/graph/node-attribute-type.ts';
export type { NodePosition } from './src/types/graph/node-position.ts';
export type { NodeStyle } from './src/types/graph/node-style.ts';
export type { NodeTitle } from './src/types/graph/node-title.ts';

export type { MsgLoadGraph } from './src/types/messages/msg-load-graph.ts';
export type { MsgType } from './src/types/messages/msg-type.ts';
export type { MsgUpdateLayoutAlgorithm } from './src/types/messages/msg-update-layout-algorithm.ts';
export type { MsgUpdateLinkPathAlgorithm } from './src/types/messages/msg-update-link-path-algorithm.ts';
export type { MsgUpdateVisibleNodes } from './src/types/messages/msg-update-visible-nodes.ts';

// Export create methods for the types and interfaces
export { createConfig } from './src/types/config/config.ts';
export { createConfigLinks } from './src/types/config/config-links.ts';
export { createConfigLinksFilter } from './src/types/config/config-links-filter.ts';
export { createConfigLinksOptions } from './src/types/config/config-links-options.ts';
export { createConfigNodes } from './src/types/config/config-nodes.ts';
export { createConfigNodesFilter } from './src/types/config/config-nodes-filter.ts';
export { createConfigNodesOptions } from './src/types/config/config-nodes-options.ts';

export { createGraph } from './src/types/graph/graph.ts';
export { createLink } from './src/types/graph/link.ts';
export { createNode } from './src/types/graph/node.ts';
export { createNodeAttribute } from './src/types/graph/node-attribute.ts';
export { createNodePosition } from './src/types/graph/node-position.ts';
export { createNodeStyle } from './src/types/graph/node-style.ts';
export { createNodeTitle } from './src/types/graph/node-title.ts';

export { createMsgLoadGraph } from './src/types/messages/msg-load-graph.ts';
export { createMsgUpdateLayoutAlgorithm } from './src/types/messages/msg-update-layout-algorithm.ts';
export { createMsgUpdateLinkPathAlgorithm } from './src/types/messages/msg-update-link-path-algorithm.ts';
export { createMsgUpdateVisibleNodes } from './src/types/messages/msg-update-visible-nodes.ts';

// Export Zod schemas
export { ZConfig } from './src/types/config/config.ts';
export { ZConfigLinks } from './src/types/config/config-links.ts';
export { ZConfigLinksFilter } from './src/types/config/config-links-filter.ts';
export { ZConfigLinksOptions } from './src/types/config/config-links-options.ts';
export { ZConfigNodes } from './src/types/config/config-nodes.ts';
export { ZConfigNodesFilter } from './src/types/config/config-nodes-filter.ts';
export { ZConfigNodesOptions } from './src/types/config/config-nodes-options.ts';
export { ZLayoutAlgorithm } from './src/types/config/layout-algorithm.ts';
export { ZLinkPathAlgorithm } from './src/types/config/link-path-algorithm.ts';
export { ZTheme } from './src/types/config/theme.ts';

export { ZGraph } from './src/types/graph/graph.ts';
export { ZLink } from './src/types/graph/link.ts';
export { ZLinkType } from './src/types/graph/link-type.ts';
export { ZNode } from './src/types/graph/node.ts';
export { ZNodeType } from './src/types/graph/node-type.ts';
export { ZNodeAttribute } from './src/types/graph/node-attribute.ts';
export { ZNodeAttributeScope } from './src/types/graph/node-attribute-scope.ts';
export { ZNodeAttributeType } from './src/types/graph/node-attribute-type.ts';
export { ZNodeStyle } from './src/types/graph/node-style.ts';
export { ZNodeTitle } from './src/types/graph/node-title.ts';

export { ZMsgLoadGraph } from './src/types/messages/msg-load-graph.ts';
export { ZMsgType } from './src/types/messages/msg-type.ts';
export { ZMsgUpdateLayoutAlgorithm } from './src/types/messages/msg-update-layout-algorithm.ts';
export { ZMsgUpdateLinkPathAlgorithm } from './src/types/messages/msg-update-link-path-algorithm.ts';
export { ZMsgUpdateVisibleNodes } from './src/types/messages/msg-update-visible-nodes.ts';

// Export default styles and colors
export {
  DEFAULT_THEME,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
} from './src/defaults/colors.ts';

export {
  DEFAULT_DARK_CLASS_STYLE,
  DEFAULT_DARK_INTERFACE_STYLE,
  DEFAULT_DARK_TYPE_STYLE,
  DEFAULT_DARK_UNION_STYLE,
  DEFAULT_DARK_VARIABLE_STYLE,
} from './src/defaults/dark-node-styles.ts';

export {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_UNION_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
} from './src/defaults/light-node-styles.ts';

// Export utility functions (assuming they exist in the mentioned files)
export { validate } from './src/utils/validate.ts';
export { is } from './src/utils/is.ts';
export { update, updateDeep } from './src/utils/update.ts';

// Other models
export type { TreeNode } from './src/types/utils/tree-node.ts';
export type { CheckboxPartialCheckedStatus } from './src/types/utils/checkbox-partial-checked-status.ts';
