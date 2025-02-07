import { z } from 'zod';
import { type LinkPathAlgorithm, ZLinkPathAlgorithm } from '../config/link-path-algorithm.ts';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgUpdateLinkPathAlgorithm {
  /**
   * The link path algorithm to use
   * @see {@link LinkPathAlgorithm}
   */
  linkPathAlgorithm: LinkPathAlgorithm;

  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'update-link-path-algorithm';
}

export const ZMsgUpdateLinkPathAlgorithm = z.object({
  linkPathAlgorithm: ZLinkPathAlgorithm,
  type: ZMsgType.extract(['update-link-path-algorithm']),
}) as z.ZodType<MsgUpdateLinkPathAlgorithm>;

export function createMsgUpdateLinkPathAlgorithm(
  data?: Partial<MsgUpdateLinkPathAlgorithm>
): MsgUpdateLinkPathAlgorithm {
  return ZMsgUpdateLinkPathAlgorithm.parse({
    linkPathAlgorithm: data?.linkPathAlgorithm ?? 'straight',
    type: 'update-link-path-algorithm',
  });
}
