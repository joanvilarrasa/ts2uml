import { z } from 'zod';
import { type LinkType, ZLinkType } from '../graph/link-type.ts';

/**
 * Interface defining the configuration for filtering links (relationships) in the diagram.
 */
export interface ConfigLinksFilter {
  /**
   * Array of link types to filter links by their type (e.g., inheritance, implementation, etc.).
   * If a link type is provided, all links of that type will be excluded from the diagram.
   * Empty array means no type filtering.
   * @see {@link LinkType}
   */
  filter_type: LinkType[];
}

export const ZConfigLinksFilter = z.object({
  filter_type: ZLinkType.array().optional(),
}) as z.ZodType<ConfigLinksFilter>;

export function createConfigLinksFilter(data?: Partial<ConfigLinksFilter>): ConfigLinksFilter {
  return ZConfigLinksFilter.parse({
    filter_type: data?.filter_type ?? [],
  });
}
