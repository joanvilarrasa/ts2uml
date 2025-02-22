import { z } from 'zod';
import { type LinkType, ZLinkType } from './link-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface Link {
  /**
   * The unique identifier of the source node
   * @see {@link Node}
   */
  sourceId: string;

  /**
   * The unique identifier of the source attribute
   * @see {@link NodeAttribute}
   */
  sourceAttributeIds: string[];

  /**
   * The unique identifier of the target node
   * @see {@link Node}
   */
  targetId: string;

  /**
   * Optional text label to display on the relationship
   */
  text?: string;

  /**
   * The type of relationship between the nodes
   * @see {@link LinkType}
   */
  type: LinkType;
}

export const ZLink = z.object({
  sourceId: z.string({ invalid_type_error: 'sourceId must be a string' }),
  sourceAttributeIds: z.string().array(),
  targetId: z.string({ invalid_type_error: 'targetId must be a string' }),
  text: z.string().optional(),
  type: ZLinkType,
}) as z.ZodType<Link>;

export function createLink(data?: Partial<Link>): Link {
  return ZLink.parse({
    sourceId: data?.sourceId ?? 'sourceId',
    sourceAttributeIds: data?.sourceAttributeIds ?? [],
    targetId: data?.targetId ?? 'targetId',
    text: data?.text,
    type: data?.type ?? 'association',
  });
}
