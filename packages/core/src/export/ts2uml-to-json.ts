import type { Graph } from '@ts2uml/models';

export function ts2umlToJson(graph: Graph): string {
  return JSON.stringify(graph);
}
