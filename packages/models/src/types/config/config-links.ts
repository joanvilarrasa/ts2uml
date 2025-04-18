import { z } from 'zod';
import { type ConfigLinksFilter, ZConfigLinksFilter, createConfigLinksFilter } from './config-links-filter.ts';
import { type ConfigLinksOptions, ZConfigLinksOptions, createConfigLinksOptions } from './config-links-options.ts';
import { type LinkPathAlgorithm, ZLinkPathAlgorithm } from './link-path-algorithm.ts';

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

  /**
   * The algorithm to use for pathing the links.
   * @see {@link LinkPathAlgorithm}
   */
  linkPathAlgorithm: LinkPathAlgorithm;
}

export const ZConfigLinks = z.object({
  filter: ZConfigLinksFilter,
  options: ZConfigLinksOptions,
  linkPathAlgorithm: ZLinkPathAlgorithm.default('straight'),
}) as z.ZodType<ConfigLinks>;

export function createConfigLinks(data?: Partial<ConfigLinks>): ConfigLinks {
  return ZConfigLinks.parse({
    filter: createConfigLinksFilter(data?.filter),
    options: createConfigLinksOptions(data?.options),
    linkPathAlgorithm: data?.linkPathAlgorithm ?? 'straight',
  });
}
