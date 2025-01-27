import {
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useEffect, useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import type { Node, NodeType } from '@ts2uml/models';
import ELK from 'elkjs/lib/elk.bundled.js';
import { InterfaceNodeComponent } from './components/InterfaceNode';
import { getInitialEdges, getInitialNodes } from './utils/get-data';

// Export a component for each node type
type CustomNodeComponents = { [K in NodeType]: (props: RF_NodeProps<RF_Node<{ data: Node }>>) => JSX.Element };

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    'elk.algorithm': 'org.eclipse.elk.radial',
    'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    'elk.spacing.nodeNode': 80,
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes().map((node) => ({
        ...node,
        width: 500,
        height: 500,
      })),
      edges: getEdges().map((edge) => ({
        ...edge,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      for (const node of children) {
        node.position = { x: node.x, y: node.y };
      }

      setNodes(children as unknown as RF_Node<{ data: Node }>[]);
      window.requestAnimationFrame(() => {
        fitView();
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

  // const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    getLayoutedElements({
      'elk.algorithm': 'org.eclipse.elk.mrtree',
    });
  }, [getLayoutedElements]);

  return <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView />;
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
