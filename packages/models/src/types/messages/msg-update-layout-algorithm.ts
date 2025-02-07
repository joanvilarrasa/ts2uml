import { z } from 'zod';
import { type LayoutAlgorithm, ZLayoutAlgorithm } from '../config/layout-algorithm.ts';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgUpdateLayoutAlgorithm {
  /**
   * The layout algorithm to use
   * @see {@link LayoutAlgorithm}
   */
  layoutAlgorithm: LayoutAlgorithm;

  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'update-layout-algorithm';
}

export const ZMsgUpdateLayoutAlgorithm = z.object({
  layoutAlgorithm: ZLayoutAlgorithm,
  type: ZMsgType.extract(['update-layout-algorithm']),
}) as z.ZodType<MsgUpdateLayoutAlgorithm>;

export function createMsgUpdateLayoutAlgorithm(data?: Partial<MsgUpdateLayoutAlgorithm>): MsgUpdateLayoutAlgorithm {
  return ZMsgUpdateLayoutAlgorithm.parse({
    layoutAlgorithm: data?.layoutAlgorithm ?? 'layered',
    type: 'update-layout-algorithm',
  });
}
