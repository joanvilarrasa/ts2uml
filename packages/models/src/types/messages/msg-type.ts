import { z } from 'zod';

export const ZMsgType = z.enum([
  'load-graph',
  'update-visible-nodes',
  'update-layout-algorithm',
  'update-link-path-algorithm',
]);

/**
 * Represents the different types of messages that are sent between components of the web
 */
export type MsgType = z.infer<typeof ZMsgType>;
