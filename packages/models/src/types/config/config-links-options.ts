import { z } from 'zod';

/**
 * Interface defining the display options for links (relationships) in the diagram.
 */
export interface ConfigLinksOptions {
  /**
   * Whether to hide all links in the diagram.
   * If true, no links will be displayed.
   */
  hide?: boolean;

  /**
   * Whether to hide the arrows indicating link direction.
   * If true, link lines will be shown without directional arrows.
   */
  hide_arrows?: boolean;

  /**
   * Whether to hide the cardinality indicators on links.
   * If true, relationship multiplicities will not be displayed.
   */
  hide_cardinality?: boolean;

  /**
   * Whether to hide the text labels on links.
   * If true, relationship type labels will not be displayed.
   */
  hide_labels?: boolean;
}

export const ZConfigLinksOptions = z.object({
  hide: z.boolean({ invalid_type_error: 'hide must be a boolean' }).optional().default(false),
  hide_arrows: z.boolean({ invalid_type_error: 'hide_arrows must be a boolean' }).optional().default(false),
  hide_cardinality: z.boolean({ invalid_type_error: 'hide_cardinality must be a boolean' }).optional().default(false),
  hide_labels: z.boolean({ invalid_type_error: 'hide_labels must be a boolean' }).optional().default(false),
}) as z.ZodType<ConfigLinksOptions>;
