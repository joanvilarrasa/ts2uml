import { z } from 'zod';
import { type Graph, ZGraph, createGraph } from '../graph/graph.ts';
import { ZMsgType } from './msg-type.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgLoadGraph {
  /**
   * Whether to apply a layout on load
   */
  applyLayoutOnLoad: boolean;

  /**
   * A list of node ids to add to the diagram
   * @see {@link Graph}
   */
  graph: Graph;

  /**
   * The type of message
   * @see {@link MsgType}
   */
  type: 'load-graph';
}

export const ZMsgLoadGraph = z.object({
  applyLayoutOnLoad: z.boolean().optional(),
  graph: ZGraph,
  type: ZMsgType,
}) as z.ZodType<MsgLoadGraph>;

export function createMsgLoadGraph(data?: Partial<MsgLoadGraph>): MsgLoadGraph {
  return ZMsgLoadGraph.parse({
    applyLayoutOnLoad: data?.applyLayoutOnLoad ?? true,
    graph: data?.graph ?? createGraph(),
    type: 'load-graph',
  });
}
