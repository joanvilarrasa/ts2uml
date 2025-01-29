import { z } from 'zod';

export const ZLinkType = z.enum([
  'aggregation',
  'association',
  'composition',
  'dependency',
  'inheritance',
  'realization',
]);

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "aggregation": Indicates a has-a relationship where parts can exist independently
 * - "association": Indicates a basic association between nodes
 * - "composition": Indicates a contains relationship where parts cannot exist independently
 * - "dependency": Indicates a uses/depends-on relationship
 * - "inheritance": Indicates an inheritance/extends relationship
 * - "realization": Indicates an implements/realizes relationship
 */
export type LinkType = z.infer<typeof ZLinkType>;

/**
 * Array containing all valid node types that can be used in the diagram.
 * @see {@link LinkType}
 */
export const LinkTypeList: LinkType[] = ZLinkType.options;
