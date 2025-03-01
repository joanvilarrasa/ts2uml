import { z } from 'zod';
import {} from '../graph/node-type.ts';

/**
 * Interface defining filters for nodes to be displayed in the diagram.
 */
export interface ConfigNodesFilterName {
  /**
   * Filter nodes by their name starting with the given string.
   */
  starts_with: string;

  /**
   * Filter nodes by their name ending with the given string.
   */
  ends_with: string;

  /**
   * Filter nodes by their name containing the given string.
   */
  includes: string;
}

export const ZConfigNodesFilterName = z.object({
  starts_with: z.string(),
  ends_with: z.string(),
  includes: z.string(),
}) as z.ZodType<ConfigNodesFilterName>;

export function createConfigNodesFilterName(data?: Partial<ConfigNodesFilterName>): ConfigNodesFilterName {
  return ZConfigNodesFilterName.parse({
    starts_with: data?.starts_with ?? '',
    ends_with: data?.ends_with ?? '',
    includes: data?.includes ?? '',
  });
}
