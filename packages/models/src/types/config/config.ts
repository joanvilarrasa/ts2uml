import { z } from 'zod';
import { type Theme, ZTheme } from '../enums/theme.ts';
import { type ConfigLinks, ZConfigLinks } from './config-links.ts';
import { type ConfigNodes, ZConfigNodes } from './config-nodes.ts';

/**
 * Main configuration object that controls the overall diagram appearance and behavior.
 * Contains settings for theme, display options, and filtering of nodes and relationships.
 */
export interface Config {
  /**
   * Additional options for customizing the diagram.
   */
  diagram: {
    show_legend: boolean;
    theme: Theme;
  };

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
}

export const ZConfig = z.object({
  diagram: z.object({
    show_legend: z.boolean().optional().default(true),
    theme: ZTheme,
  }),
  links: ZConfigLinks,
  metadata: z.object({
    version: z.string().default('0.0.1'),
  }),
  nodes: ZConfigNodes,
}) as z.ZodType<Config>;
