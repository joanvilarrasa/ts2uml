import { z } from 'zod';
import { ZMsgType } from '../enums/msg-type.ts';
import { type Graph, ZGraph, createGraph } from '../graph/graph.ts';

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
export interface MsgLoadGraph {
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
  graph: ZGraph,
  type: ZMsgType,
}) as z.ZodType<MsgLoadGraph>;

export function createMsgLoadGraph(data?: Partial<MsgLoadGraph>): MsgLoadGraph {
  return ZMsgLoadGraph.parse({
    graph: data?.graph ?? createGraph(),
    type: 'load-graph',
  });
}
