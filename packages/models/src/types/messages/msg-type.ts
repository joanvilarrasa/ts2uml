import { z } from 'zod';

export const ZMsgType = z.enum([
  'load-graph',
  'update-layout-algorithm',
  'update-link-path-algorithm',
  'update-visible-nodes',
  'open-node-code',
]);

/**
 * Represents the different types of messages that are sent between components of the web app
 * - `load-graph`: Load a graph
 * - `update-layout-algorithm`: Update the layout algorithm
 * - `update-link-path-algorithm`: Update the link path algorithm
 * - `update-visible-nodes`: Update the visible nodes
 * - `open-node-code`: Open the code of a node (only available in the extension)
 */
export type MsgType = z.infer<typeof ZMsgType>;
