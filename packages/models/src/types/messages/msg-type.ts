import { z } from 'zod';

export const ZMsgType = z.enum([
  'load-graph',
  'update-layout-algorithm',
  'update-link-path-algorithm',
  'update-visible-nodes',
  'open-node-code',
  'page-ready',
]);

/**
 * Represents the different types of messages that are sent between components of the web app
 * - `load-graph`: Load a graph
 * - `update-layout-algorithm`: Update the layout algorithm
 * - `update-link-path-algorithm`: Update the link path algorithm
 * - `update-visible-nodes`: Update the visible nodes
 * - `open-node-code`: Open the code of a node (only available in the extension)
 * - `page-ready`: The page is ready to be used (this is sent from the extension webview to the extension to tell it to send the graph. It is used to solve a race condition between the webview and the extension)
 */
export type MsgType = z.infer<typeof ZMsgType>;
