import {
  Controls,
  Panel,
  type Edge as RF_Edge,
  type Node as RF_Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import type { Node } from '@ts2uml/models';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import { Toolbox } from './components/toolbox/toolbox';
import { computeNodeHeight, computeNodeWidth } from './lib/compute-node-size';
import { ELK_DEFAULT_LAYOUT_OPTIONS, RF_EDGE_TYPES, RF_NODE_TYPES } from './lib/constants';
import { getInitialEdges, getInitialNodes } from './lib/get-data';
import { GraphManager } from './lib/graph-manager';

const elk = new ELK();

export default function App() {
  const gm: GraphManager = GraphManager.getInstance();
  const initialGraph = gm.getGraph();

  const [nodes, , onNodesChange] = useNodesState<RF_Node>(getInitialNodes(initialGraph));
  const [edges, , onEdgesChange] = useEdgesState(getInitialEdges(initialGraph));

  const reactFlow = useReactFlow();

  const getLayoutedElements = useCallback(
    (options: LayoutOptions, nodes: RF_Node<{ data: Node }>[], edges: RF_Edge[]) => {
      const layoutOptions = { ...ELK_DEFAULT_LAYOUT_OPTIONS, ...options };

      const graph = {
        id: 'root',
        layoutOptions: layoutOptions,
        children: nodes.map((node: RF_Node<{ data: Node }>) => ({
          ...node,
          width: computeNodeWidth(node.data.data),
          height: computeNodeHeight(node.data.data),
        })),
        edges: edges.map((edge) => ({
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

        reactFlow.setNodes(newNodes);
      });
    },
    [reactFlow]
  );

  useEffect(() => {
    const filteredNodes = reactFlow.getNodes().filter((node: RF_Node<{ data: Node }>) => !node.hidden);
    const filteredEdges = reactFlow.getEdges().filter((edge) => !edge.hidden);
    getLayoutedElements(
      {
        'elk.algorithm': 'org.eclipse.elk.layered',
      },
      filteredNodes as RF_Node<{ data: Node }>[],
      filteredEdges
    );
  }, [reactFlow.getNodes, reactFlow.getEdges, getLayoutedElements]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={RF_NODE_TYPES}
        edgeTypes={RF_EDGE_TYPES}
        fitView
      >
        <Panel position="bottom-center">
          <Toolbox />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}
