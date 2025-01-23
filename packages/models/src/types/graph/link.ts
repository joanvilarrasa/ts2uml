import { z } from 'zod';
import { type Cardinality, ZCardinality } from '../enums/cardinality.ts';
import { type LinkType, ZLinkType } from '../enums/link-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export type Link = {
  /**
   *  The cardinality (multiplicity) at the source end of the relationship
   * @see {@link Cardinality}
   */
  sourceCardinality: Cardinality;

  /**
   * The unique identifier of the source node
   * @see {@link Node}
   */
  sourceId: string;

  /**
   * Optional identifier for a specific port on the source node
   * @see {@link NodePort}
   */
  sourcePortId?: string;

  /**
   * The cardinality (multiplicity) at the target end of the relationship
   * @see {@link Cardinality}
   */
  targetCardinality: Cardinality;

  /**
   * The unique identifier of the target node
   * @see {@link Node}
   */
  targetId: string;

  /**
   * Optional identifier for a specific port on the target node
   * @see {@link NodePort}
   */
  targetPortId?: string;

  /**
   * Optional text label to display on the relationship
   */
  text?: string;

  /**
   * The type of relationship between the nodes
   * @see {@link LinkType}
   */
  type: LinkType;
};

export const ZLink = z.object({
  sourceCardinality: ZCardinality,
  sourceId: z.string({ invalid_type_error: 'sourceId must be a string' }),
  sourcePortId: z.string().optional(),
  targetCardinality: ZCardinality,
  targetId: z.string({ invalid_type_error: 'targetId must be a string' }),
  targetPortId: z.string().optional(),
  text: z.string().optional(),
  type: ZLinkType,
}) as z.ZodType<Link>;

export function createLink(data?: Partial<Link>): Link {
  return ZLink.parse({
    sourceCardinality: data?.sourceCardinality ?? '*',
    sourceId: data?.sourceId ?? 'sourceId',
    sourcePortId: data?.sourcePortId,
    targetCardinality: data?.targetCardinality ?? '*',
    targetId: data?.targetId ?? 'targetId',
    targetPortId: data?.targetPortId,
    text: data?.text,
    type: data?.type ?? 'association',
  });
}
