import { z } from 'zod';

/**
 * Represents an attribute or method within a node in the diagram.
 */
export interface NodeAttributeExtended {
  /**
   * The id of the Node that this attribute extends from
   */
  ancestorNodeId?: string;

  /**
   * The name of the Node that this attribute extends from
   */
  ancestorNodeName?: string;

  /**
   * The id of the node that this attribute extends from
   */
  fatherNodeId?: string;

  /**
   * The name of the Node that this attribute extends from
   */
  fatherNodeName?: string;
}

export const ZNodeAttributeExtended = z.object({
  ancestorNodeId: z.string().optional(),
  ancestorNodeName: z.string().optional(),
  fatherNodeId: z.string().optional(),
  fatherNodeName: z.string().optional(),
}) as z.ZodType<NodeAttributeExtended>;

export function createNodeAttributeExtended(data?: Partial<NodeAttributeExtended>): NodeAttributeExtended {
  return ZNodeAttributeExtended.parse({
    ancestorNodeId: data?.ancestorNodeId,
    ancestorNodeName: data?.ancestorNodeName,
    fatherNodeId: data?.fatherNodeId,
    fatherNodeName: data?.fatherNodeName,
  });
}
