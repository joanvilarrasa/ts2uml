import { z } from 'zod';
import { type ConfigLinksFilter, ZConfigLinksFilter } from './config-links-filter.ts';
import { type ConfigLinksOptions, ZConfigLinksOptions } from './config-links-options.ts';

/**
 * Interface defining the configuration for displaying links (relationships) in the diagram.
 */
export interface ConfigLinks {
  /**
   * Configuration for filtering which links should be displayed in the diagram.
   * @see {@link ConfigLinksFilter}
   */
  filter: ConfigLinksFilter;
  /**
   * Display options that control how links are rendered.
   * @see {@link ConfigLinksOptions}
   */
  options: ConfigLinksOptions;
}

export const _ZConfigLinks = z.object({
  filter: ZConfigLinksFilter,
  options: ZConfigLinksOptions,
}) as z.ZodType<ConfigLinks>;
export const ZConfigLinks: z.ZodType<ConfigLinks> = _ZConfigLinks;
