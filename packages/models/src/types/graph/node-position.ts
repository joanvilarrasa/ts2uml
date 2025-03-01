import { z } from 'zod';

/**
 * Represents a node position in the graph
 */
export interface NodePosition {
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
  x: z.number(),
  y: z.number(),
}) as z.ZodType<NodePosition>;

export function createNodePosition(data?: Partial<NodePosition>): NodePosition {
  return ZNodePosition.parse({
    x: data?.x ?? 0,
    y: data?.y ?? 0,
  });
}
