import { useCallback, useEffect } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, type Connection,} from '@xyflow/react';
import demoGraph from './assets/demo-graph.json';
import '@xyflow/react/dist/style.css';


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  async function createDefaultGraph() {
    const initialGraph = demoGraph;
    console.log(initialGraph);
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
      />
    </div>
  );
}