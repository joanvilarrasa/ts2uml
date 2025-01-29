import {
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
import type { Node, NodeType } from '@ts2uml/models';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import { InterfaceNodeComponent } from './components/interface-node';
import { computeNodeHeight, computeNodeWidth } from './utils/compute-node-size';
import { getInitialEdges, getInitialNodes } from './utils/get-data';

// Export a component for each node type
type CustomNodeComponents = {
  [K in NodeType]: (props: RF_NodeProps<RF_Node<{ data: Node }>>) => React.JSX.Element;
};

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions: LayoutOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.insideSelfLoops.activate': 'false',
    'elk.interactiveLayout': 'true',
    'elk.layered.crossingMinimization.semiInteractive': 'true',
    'elk.layered.cycleBreaking.strategy': 'INTERACTIVE',
    'elk.layered.nodePlacement.strategy': 'LINEAR_SEGMENTS',
    // "elk.layered.layering.strategy": "LONGEST_PATH",
    'elk.layered.spacing.edgeNodeBetweenLayers': '25', // default 10
    'elk.layered.spacing.nodeNodeBetweenLayers': '50', // default 20
    'elk.spacing.nodeNode': '50', // default 20
    'elk.spacing.componentComponent': '100', // default 20
    'elk.separateConnectedComponents': 'true',
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };

    getNodes().map((n) => console.log(n));
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
      const newNodes: RF_Node<{ data: Node }>[] = children.map(
        (n: ElkNode & RF_Node<{ data: Node }>) => ({
          ...n,
          position: { x: n.x, y: n.y },
        })
      );

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

  const [nodes, , onNodesChange] = useNodesState<RF_Node>(getInitialNodes());
  const [edges, , onEdgesChange] = useEdgesState(getInitialEdges());

  useEffect(() => {
    getLayoutedElements({
      'elk.algorithm': 'org.eclipse.elk.layered',
    });
  }, [getLayoutedElements]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    />
  );
};

export default function App() {
  return (
    <div className="h-screen w-screen">
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  );
}
