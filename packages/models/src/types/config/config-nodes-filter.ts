import { z } from 'zod';
import { type NodeType, ZNodeType } from '../enums/node-type.ts';

/**
/**
 * Interface defining filters for nodes to be displayed in the diagram.
 */
export interface ConfigNodesFilter {
  /**
   * Array of strings to filter nodes by their file path or name.
   * This array can contain directories, files and concrete node ids.
   * If a directory is provided, all nodes within that directory will be excluded from the diagram.
   * If a file is provided, all nodes within that file will be excluded from the diagram.
   * If a concrete node id is provided, the node with that id will be excluded from the diagram.
   * Empty array means no path filtering.
   */
  filter_node: string[];

  /**
   * Array of node types to filter nodes by their type (e.g., class, interface, enum, etc.).
   * If a node type is provided, all nodes of that type will be excluded from the diagram.
   * Empty array means no type filtering.
   * @see {@link NodeType}
   */
  filter_type: NodeType[];
}

export const ZConfigNodesFilter = z.object({
  filter_node: z.array(z.string()).optional(),
  filter_type: ZNodeType.array().optional(),
}) as z.ZodType<ConfigNodesFilter>;

export function createConfigNodesFilter(data?: Partial<ConfigNodesFilter>): ConfigNodesFilter {
  return ZConfigNodesFilter.parse({
    filter_node: data?.filter_node ?? [],
    filter_type: data?.filter_type ?? [],
  });
}
