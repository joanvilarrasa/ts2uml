import { z } from 'zod';
import { type ConfigLinks, ZConfigLinks, createConfigLinks } from './config-links.ts';
import { type ConfigNodes, ZConfigNodes, createConfigNodes } from './config-nodes.ts';
import type { LayoutAlgorithm } from './layout-algorithm.ts';
import { ZLayoutAlgorithm } from './layout-algorithm.ts';

/**
 * Main configuration object that controls the overall diagram appearance and behavior.
 * Contains settings for theme, display options, and filtering of nodes and relationships.
 */
export interface Config {
  /**
   * Additional options for customizing the diagram.
   */
  layoutAlgorithm: LayoutAlgorithm;

  /**
   * Configuration for displaying relationships between nodes.
   * @see {@link ConfigLinks}
   */
  links: ConfigLinks;

  /**
   * Configuration for displaying nodes in the diagram.
   * @see {@link ConfigNodes}
   */
  nodes: ConfigNodes;
}

export const ZConfig = z.object({
  layoutAlgorithm: ZLayoutAlgorithm,
  links: ZConfigLinks,
  nodes: ZConfigNodes,
}) as z.ZodType<Config>;

export function createConfig(data?: Partial<Config>): Config {
  return ZConfig.parse({
    layoutAlgorithm: data?.layoutAlgorithm ?? 'layered',
    links: createConfigLinks(data?.links),
    nodes: createConfigNodes(data?.nodes),
  });
}
