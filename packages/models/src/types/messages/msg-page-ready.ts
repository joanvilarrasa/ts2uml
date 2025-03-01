import { z } from 'zod';
import {} from '../graph/node.ts';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgPageReady {
  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'page-ready';
}

export const ZMsgPageReady = z.object({
  type: ZMsgType.extract(['page-ready']),
}) as z.ZodType<MsgPageReady>;

export function createMsgPageReady(): MsgPageReady {
  return ZMsgPageReady.parse({
    type: 'page-ready',
  });
}
