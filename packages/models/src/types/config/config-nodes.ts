import { z } from 'zod';
import {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_ENUM_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
} from '../../defaults/light-node-styles.ts';
import { type NodeStyle, ZNodeStyle, createNodeStyle } from '../graph/node-style.ts';
import { type NodeType, ZNodeType } from '../graph/node-type.ts';
import { type ConfigNodesFilter, ZConfigNodesFilter, createConfigNodesFilter } from './config-nodes-filter.ts';
import { type ConfigNodesOptions, ZConfigNodesOptions, createConfigNodesOptions } from './config-nodes-options.ts';

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
    [ZNodeType.enum.interface]: ZNodeStyle.default(DEFAULT_LIGHT_INTERFACE_STYLE),
    [ZNodeType.enum.type]: ZNodeStyle.default(DEFAULT_LIGHT_TYPE_STYLE),
    [ZNodeType.enum.variable]: ZNodeStyle.default(DEFAULT_LIGHT_VARIABLE_STYLE),
  }),
}) as z.ZodType<ConfigNodes>;

export function createConfigNodes(data?: Partial<ConfigNodes>): ConfigNodes {
  return ZConfigNodes.parse({
    filter: createConfigNodesFilter(data?.filter),
    options: createConfigNodesOptions(data?.options),
    styles: {
      [ZNodeType.enum.class]: createNodeStyle({
        ...DEFAULT_LIGHT_CLASS_STYLE,
        ...data?.styles?.[ZNodeType.enum.class],
      }),
      [ZNodeType.enum.enum]: createNodeStyle({
        ...DEFAULT_LIGHT_ENUM_STYLE,
        ...data?.styles?.[ZNodeType.enum.enum],
      }),
      [ZNodeType.enum.interface]: createNodeStyle({
        ...DEFAULT_LIGHT_INTERFACE_STYLE,
        ...data?.styles?.[ZNodeType.enum.interface],
      }),
      [ZNodeType.enum.type]: createNodeStyle({
        ...DEFAULT_LIGHT_TYPE_STYLE,
        ...data?.styles?.[ZNodeType.enum.type],
      }),
      [ZNodeType.enum.variable]: createNodeStyle({
        ...DEFAULT_LIGHT_VARIABLE_STYLE,
        ...data?.styles?.[ZNodeType.enum.variable],
      }),
    },
  });
}
