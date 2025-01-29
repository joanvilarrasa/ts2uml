import { z } from 'zod';
import { type Config, ZConfig, createConfig } from '../config/config.ts';
import { type Link, ZLink, createLink } from './link.ts';
import { type Node, ZNode, createNode } from './node.ts';

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

export const ZGraph = z.object({
  config: ZConfig,
  nodes: ZNode.array().default([]),
  links: ZLink.array().default([]),
}) as z.ZodType<Graph>;

export function createGraph(data?: Partial<Graph>): Graph {
  return ZGraph.parse({
    config: createConfig(data?.config),
    nodes: data?.nodes ? data.nodes.map((n) => createNode(n)) : [],
    links: data?.links ? data.links.map((l) => createLink(l)) : [],
  });
}
