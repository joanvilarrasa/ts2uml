import { useCallback, useEffect, useMemo } from 'react';
import { type NodeProps as RF_NodeProps, type Node as RF_Node, ReactFlow, useNodesState, useEdgesState, addEdge, type Connection,} from '@xyflow/react';
import demoGraph from './assets/demo-graph.json';
import '@xyflow/react/dist/style.css';
import { InterfaceNodeComponent } from './components/InterfaceNode';
import type { NodeType, Node, Graph } from '@ts2uml/models';


// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];

const initialGraph = demoGraph as Graph;
console.log(initialGraph);
const initialNodes: RF_Node<{data: Node}>[] = [];

let initialX = 0;
let initialY = 0; 
for (const node of initialGraph.nodes) {
  initialNodes.push({ id: node.id, type: "interface", position: { x: initialX, y: initialY }, data: { data: node } });
  initialX += 100;
  initialY += 100;
}


const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Export a component for each node type
type CustomNodeComponents = {[K in NodeType]: (props: RF_NodeProps<RF_Node<{data: Node}>>) => JSX.Element }

export default function App() {
  const nodeTypes = useMemo<CustomNodeComponents>(() => ({
    interface: InterfaceNodeComponent,
    class: InterfaceNodeComponent,
    enum: InterfaceNodeComponent, 
    function: InterfaceNodeComponent,
    type: InterfaceNodeComponent,
    variable: InterfaceNodeComponent
  }), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState<RF_Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  async function createDefaultGraph() {
    // const initialGraph = demoGraph as Graph;
    // console.log(initialGraph);
    // const newRFNodes: RF_Node<{data: Node}>[] = [];

    // let initialX = 0;
    // let initialY = 0; 
    // for (const node of initialGraph.nodes) {
    //   newRFNodes.push({ id: node.id, position: { x: initialX, y: initialY }, data: { data: node } });
    //   initialX += 100;
    //   initialY += 100;
    // }

    // setNodes(newRFNodes);
  }

  useEffect(() => {
    createDefaultGraph();
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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