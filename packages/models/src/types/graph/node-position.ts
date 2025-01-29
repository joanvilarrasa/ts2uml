import { z } from 'zod';

/**
 * Represents a node position in the graph
 */
export interface NodePosition {
  /**
   * Whether the node is locked in place
   */
  locked: boolean;

  /**
   * The x position of the node
   */
  x: number;

  /**
   * The y position of the node
   */
  y: number;
}

export const ZNodePosition = z.object({
  locked: z.boolean().optional(),
  x: z.number(),
  y: z.number(),
}) as z.ZodType<NodePosition>;

export function createNodePosition(data?: Partial<NodePosition>): NodePosition {
  return ZNodePosition.parse({
    locked: data?.locked ?? false,
    x: data?.x ?? 0,
    y: data?.y ?? 0,
  });
}
