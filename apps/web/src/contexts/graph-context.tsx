import { type Graph, ZGraph, updateDeep } from '@ts2uml/models';
import { type ReactNode, createContext, useContext, useState } from 'react';
import initialGraph from '../assets/demo-graph.json';

interface GraphContextType {
  graph: Graph;
  setGraph: (graph: Graph) => void;
  updateGraph: (updates: { [P in keyof Graph]?: Graph[P] | object }) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [graph, setGraph] = useState<Graph>(initialGraph as Graph);

  const updateGraph = (updates: { [P in keyof Graph]?: Graph[P] | object }) => {
    setGraph(updateDeep<Graph>(graph, updates, ZGraph));
  };

  return <GraphContext.Provider value={{ graph, setGraph, updateGraph }}>{children}</GraphContext.Provider>;
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
}
