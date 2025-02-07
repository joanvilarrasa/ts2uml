import { z } from 'zod';
import { type ConfigLinks, ZConfigLinks, createConfigLinks } from './config-links.ts';
import { type ConfigNodes, ZConfigNodes, createConfigNodes } from './config-nodes.ts';
import type { LayoutAlgorithm } from './layout-algorithm.ts';
import { ZLayoutAlgorithm } from './layout-algorithm.ts';
import { type Theme, ZTheme } from './theme.ts';

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
   * Metadata about the configuration itself.
   */
  metadata: {
    version: string;
  };

  /**
   * Configuration for displaying nodes in the diagram.
   * @see {@link ConfigNodes}
   */
  nodes: ConfigNodes;

  /**
   * The theme of the diagram.
   */
  theme: Theme;
}

export const ZConfig = z.object({
  layoutAlgorithm: ZLayoutAlgorithm,
  links: ZConfigLinks,
  metadata: z.object({
    version: z.string().default('0.0.1'),
  }),
  nodes: ZConfigNodes,
  theme: ZTheme,
}) as z.ZodType<Config>;

export function createConfig(data?: Partial<Config>): Config {
  return ZConfig.parse({
    layoutAlgorithm: data?.layoutAlgorithm ?? 'layered',
    links: createConfigLinks(data?.links),
    metadata: {
      version: data?.metadata?.version ?? '0.0.1',
    },
    nodes: createConfigNodes(data?.nodes),
    theme: data?.theme ?? 'light',
  });
}
