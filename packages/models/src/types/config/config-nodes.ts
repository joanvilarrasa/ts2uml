import { z } from 'zod';
import {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_ENUM_STYLE,
  DEFAULT_LIGHT_FUNCTION_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
} from '../../defaults/light-node-styles.ts';
import { type NodeType, ZNodeType } from '../enums/node-type.ts';
import { type NodeStyle, ZNodeStyle } from '../graph/node-style.ts';
import { type ConfigNodesFilter, ZConfigNodesFilter } from './config-nodes-filter.ts';
import { type ConfigNodesOptions, ZConfigNodesOptions } from './config-nodes-options.ts';

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
  styles: { [k in NodeType]?: NodeStyle };
}

export const ZConfigNodes = z.object({
  filter: ZConfigNodesFilter,
  options: ZConfigNodesOptions,
  styles: z.object({
    [ZNodeType.enum.class]: ZNodeStyle.default(DEFAULT_LIGHT_CLASS_STYLE),
    [ZNodeType.enum.enum]: ZNodeStyle.default(DEFAULT_LIGHT_ENUM_STYLE),
    [ZNodeType.enum.function]: ZNodeStyle.default(DEFAULT_LIGHT_FUNCTION_STYLE),
    [ZNodeType.enum.interface]: ZNodeStyle.default(DEFAULT_LIGHT_INTERFACE_STYLE),
    [ZNodeType.enum.type]: ZNodeStyle.default(DEFAULT_LIGHT_TYPE_STYLE),
    [ZNodeType.enum.variable]: ZNodeStyle.default(DEFAULT_LIGHT_VARIABLE_STYLE),
  }),
}) as z.ZodType<ConfigNodes>;
