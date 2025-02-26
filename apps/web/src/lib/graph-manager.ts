import { type Graph, ZGraph, createGraph, createMsgLoadGraph, is, updateDeep } from '@ts2uml/models';
import type { Node as RF_Node } from '@xyflow/react';
import { LinkManager } from './link-manager';
export class GraphManager {
  private static instance: GraphManager;
  private graph: Graph;

  private constructor() {
    this.graph = createGraph();
    this.initGraphFromUrlIfExists();
  }

  static getInstance(): GraphManager {
    if (!GraphManager.instance) {
      GraphManager.instance = new GraphManager();
    }
    return GraphManager.instance;
  }

  async initGraphFromUrlIfExists() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    if (id === null) {
      return;
    }
    const linkManager: LinkManager = LinkManager.getInstance();
    const sharedGraph = await linkManager.getLinkData(id);
    if (sharedGraph === null) {
      return;
    }
    const graph = JSON.parse(sharedGraph);
    if (is<Graph>(graph, ZGraph)) {
      this.graph = graph;
      window.postMessage(createMsgLoadGraph({ graph, applyLayoutOnLoad: false }));
    }
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

  updateNodePositions(rfNodes: RF_Node[]): void {
    for (const rfNode of rfNodes) {
      const node = this.graph.nodes.find((node) => node.id === rfNode.id);
      if (node) {
        node.position.x = rfNode.position.x;
        node.position.y = rfNode.position.y;
      }
    }
  }
}
