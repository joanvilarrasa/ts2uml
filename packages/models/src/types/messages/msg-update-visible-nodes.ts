import { z } from 'zod';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgUpdateVisibleNodes {
  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'update-visible-nodes';
}

export const ZMsgUpdateVisibleNodes = z.object({
  type: ZMsgType.extract(['update-visible-nodes']),
}) as z.ZodType<MsgUpdateVisibleNodes>;

export function createMsgUpdateVisibleNodes(): MsgUpdateVisibleNodes {
  return ZMsgUpdateVisibleNodes.parse({
    type: 'update-visible-nodes',
  });
}
