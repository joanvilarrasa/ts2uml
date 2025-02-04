import { z } from 'zod';
import { ZMsgType } from '../enums/msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgUpdateVisibleNodes {
  /**
   * A list of node ids to add to the diagram
   * @see {@link Node}
   */
  nodeIdsToAdd: string[];

  /**
   * A list of node ids to remove from the diagram
   * @see {@link Node}
   */
  nodeIdsToRemove: string[];

  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'update-visible-nodes';
}

export const ZMsgUpdateVisibleNodes = z.object({
  nodeIdsToAdd: z.array(z.string({ invalid_type_error: 'nodeIdsToAdd must be an array of strings' })),
  nodeIdsToRemove: z.array(z.string({ invalid_type_error: 'nodeIdsToRemove must be an array of strings' })),
  type: ZMsgType.extract(['update-visible-nodes']),
}) as z.ZodType<MsgUpdateVisibleNodes>;

export function createMsgUpdateVisibleNodes(data?: Partial<MsgUpdateVisibleNodes>): MsgUpdateVisibleNodes {
  return ZMsgUpdateVisibleNodes.parse({
    nodeIdsToAdd: data?.nodeIdsToAdd ?? [],
    nodeIdsToRemove: data?.nodeIdsToRemove ?? [],
    type: 'update-visible-nodes',
  });
}
