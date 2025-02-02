import {
  Controls,
  Panel,
  type Edge as RF_Edge,
  type EdgeProps as RF_EdgeProps,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import type { Graph, Link, Node, NodeType } from '@ts2uml/models';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import demoGraph from './assets/demo-graph.json';
import { FloatingEdgeBezier } from './components/graph/edges/floating-edge-bezier';
import { FloatingEdgeStep } from './components/graph/edges/floating-edge-step';
import { FloatingEdgeStraight } from './components/graph/edges/floating-edge-straight';
import { InterfaceNodeComponent } from './components/graph/nodes/interface-node';
import { Toolbox } from './components/toolbox/toolbox';
import { GraphProvider, useGraph } from './contexts/graph-context';
import { computeNodeHeight, computeNodeWidth } from './utils/compute-node-size';
import { getInitialEdges, getInitialNodes } from './utils/get-data';
const initialGraph = demoGraph as Graph;

// Export a component for each node type
type CustomNodeComponents = {
  [K in NodeType]: (props: RF_NodeProps<RF_Node<{ data: Node }>>) => React.JSX.Element;
};

type CustomEdgeComponents = {
  [key: string]: (props: RF_EdgeProps<RF_Edge<{ data: Link }>>) => React.JSX.Element;
};

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions: LayoutOptions = {
    'elk.algorithm': 'mrtree',
    'elk.direction': 'DOWN',
    'elk.insideSelfLoops.activate': 'false',
    'elk.interactiveLayout': 'true',
    'elk.layered.crossingMinimization.semiInteractive': 'true',
    'elk.layered.cycleBreaking.strategy': 'INTERACTIVE',
    'elk.layered.nodePlacement.strategy': 'LINEAR_SEGMENTS',
    'elk.layered.spacing.edgeNodeBetweenLayers': '25', // default 10
    'elk.layered.spacing.nodeNodeBetweenLayers': '50', // default 20
    'elk.spacing.nodeNode': '50', // default 20
    'elk.spacing.componentComponent': '100', // default 20
    'elk.separateConnectedComponents': 'true',
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };

    const graph = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes().map((node: RF_Node<{ data: Node }>) => ({
        ...node,
        width: computeNodeWidth(node.data.data),
        height: computeNodeHeight(node.data.data),
      })),
      edges: getEdges().map((edge) => ({
        ...edge,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    elk.layout(graph).then(({ children }) => {
      const newNodes: RF_Node<{ data: Node }>[] = children.map((n: ElkNode & RF_Node<{ data: Node }>) => ({
        ...n,
        position: { x: n.x, y: n.y },
      }));

      setNodes(newNodes);
      window.requestAnimationFrame(() => {
        fitView({ nodes: newNodes });
      });
    });
  }, []);

  return { getLayoutedElements };
};

const LayoutFlow = () => {
  const { getLayoutedElements } = useLayoutedElements();
  const { graph } = useGraph();
  const nodeTypes = useMemo<CustomNodeComponents>(
    () => ({
      interface: InterfaceNodeComponent,
      class: InterfaceNodeComponent,
      enum: InterfaceNodeComponent,
      function: InterfaceNodeComponent,
      type: InterfaceNodeComponent,
      variable: InterfaceNodeComponent,
    }),
    []
  );

  const edgeTypes = useMemo<CustomEdgeComponents>(
    () => ({
      'floating-bezier': FloatingEdgeBezier,
      'floating-step': FloatingEdgeStep,
      'floating-straight': FloatingEdgeStraight,
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<RF_Node>(getInitialNodes(graph));
  const [edges, setEdges, onEdgesChange] = useEdgesState(getInitialEdges(graph));

  useEffect(() => {
    setNodes(getInitialNodes(graph));
    setEdges(getInitialEdges(graph));
    getLayoutedElements({
      'elk.algorithm': 'org.eclipse.elk.layered',
    });
  }, [graph, setEdges, setNodes, getLayoutedElements]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Panel position="bottom-center">
        <Toolbox />
      </Panel>
      <Controls />
    </ReactFlow>
  );
};

export default function App() {
  return (
    <div className="h-screen w-screen">
      <GraphProvider>
        <ReactFlowProvider>
          <LayoutFlow />
        </ReactFlowProvider>
      </GraphProvider>
    </div>
  );
}
