import {
  type Connection,
  type Edge as RF_Edge,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import demoGraph from './assets/demo-graph.json';
import '@xyflow/react/dist/style.css';
import type { Graph, Node, NodeType } from '@ts2uml/models';
import { InterfaceNodeComponent } from './components/InterfaceNode';

const initialGraph = demoGraph as Graph;
const initialNodes: RF_Node<{ data: Node }>[] = [];

let initialX = 0;
let initialY = 0;
for (const node of initialGraph.nodes) {
  initialNodes.push({ id: node.id, type: 'interface', position: { x: initialX, y: initialY }, data: { data: node } });
  initialX += 200;
  initialY += 200;
}

const initialEdges: RF_Edge[] = [];

console.log(initialGraph.links);
for (const link of initialGraph.links) {
  const sourceId = link.sourcePortId ?? link.sourceId;
  initialEdges.push({
    id: `${sourceId}-${link.targetId}`,
    source: link.sourceId,
    // sourceHandle: link.sourcePortId,
    target: link.targetId,
  });
}
console.log(initialEdges);

// Export a component for each node type
type CustomNodeComponents = { [K in NodeType]: (props: RF_NodeProps<RF_Node<{ data: Node }>>) => JSX.Element };

export default function App() {
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

  const [nodes, _, onNodesChange] = useNodesState<RF_Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
