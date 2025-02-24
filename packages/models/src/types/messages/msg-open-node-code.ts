import { z } from 'zod';
import { type Node, ZNode, createNode } from '../graph/node.ts';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgOpenNodeCode {
  /**
   * The node id to open the code for
   */
  node: Node;

  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'open-node-code';
}

export const ZMsgOpenNodeCode = z.object({
  node: ZNode,
  type: ZMsgType.extract(['open-node-code']),
}) as z.ZodType<MsgOpenNodeCode>;

export function createMsgOpenNodeCode(data?: Partial<MsgOpenNodeCode>): MsgOpenNodeCode {
  return ZMsgOpenNodeCode.parse({
    node: data?.node ?? createNode(),
    type: 'open-node-code',
  });
}
