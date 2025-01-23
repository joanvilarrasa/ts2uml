import { z } from 'zod';
import { type Config, ZConfig } from '../config/config.ts';
import { type Link, ZLink } from './link.ts';
import { type Node, ZNode } from './node.ts';

/**
 * Represents a graph/diagram containing nodes and their links.
 */
export interface Graph {
  /**
   * Configuration for the graph
   * @see {@link Config}
   */
  config: Config;

  /**
   * Array of nodes in the graph (classes, interfaces, etc)
   * @see {@link Node}
   */
  nodes: Node[];

  /**
   * Array of links/relationships between nodes
   * @see {@link Link}
   */
  links: Link[];
}

export const _ZGraph = z.object({
  config: ZConfig,
  nodes: ZNode.array().default([]),
  links: ZLink.array().default([]),
}) as z.ZodType<Graph>;
export const ZGraph: z.ZodType<Graph> = _ZGraph;
