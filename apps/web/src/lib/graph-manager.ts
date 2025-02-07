import { type Graph, ZGraph, createGraph, updateDeep } from '@ts2uml/models';

export class GraphManager {
  private static instance: GraphManager;
  private graph: Graph;

  private constructor() {
    this.graph = createGraph();
  }

  static getInstance(): GraphManager {
    if (!GraphManager.instance) {
      GraphManager.instance = new GraphManager();
    }
    return GraphManager.instance;
  }

  getGraph(): Graph {
    return this.graph;
  }

  setGraph(graph: Graph): void {
    this.graph = graph;
  }

  updateGraph(updates: { [P in keyof Graph]?: Graph[P] | object }): void {
    this.graph = updateDeep<Graph>(this.graph, updates, ZGraph);
  }
}
