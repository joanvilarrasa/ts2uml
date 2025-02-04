import {
  Controls,
  Panel,
  type Node as RF_Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import {
  type Graph,
  type MsgLoadGraph,
  type MsgUpdateVisibleNodes,
  type Node,
  ZMsgUpdateVisibleNodes,
  is,
} from '@ts2uml/models';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import initialGraph from './assets/demo-graph.json';
import { Toolbox } from './components/toolbox/toolbox';
import { computeNodeHeight, computeNodeWidth } from './lib/compute-node-size';
import { ELK_DEFAULT_LAYOUT_OPTIONS, RF_EDGE_TYPES, RF_NODE_TYPES } from './lib/constants';
import { GraphManager } from './lib/graph-manager';
import { linkToRFEdge } from './lib/link-to-rf-edge';
import { nodeToRFNode } from './lib/node-to-rf-node';

const elk = new ELK();

export default function App() {
  const gm: GraphManager = GraphManager.getInstance();
  const reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [alreadyAppliedLayout, setAlreadyAppliedLayout] = useState(false);

  /***********************************************************
   * MESSAGE HANDLERS
   ***********************************************************/

  function messageHandler(event: MessageEvent) {
    const data = event.data;
    if (is<MsgUpdateVisibleNodes>(data, ZMsgUpdateVisibleNodes)) {
      handleUpdateVisibleNodes(data);
    }
  }

  function handleUpdateVisibleNodes({ nodeIdsToAdd, nodeIdsToRemove }: MsgUpdateVisibleNodes) {
    if (nodeIdsToAdd.length > 0) {
      for (const nodeId of nodeIdsToAdd) {
        reactFlow.updateNode(nodeId, { hidden: false });
      }
    }
    if (nodeIdsToRemove.length > 0) {
      for (const nodeId of nodeIdsToRemove) {
        reactFlow.updateNode(nodeId, { hidden: true });
      }
    }
  }

  function handleLoadGraph({ graph }: MsgLoadGraph) {
    setAlreadyAppliedLayout(false);
    gm.setGraph(graph);
    const nodes = graph.nodes.map((node) => nodeToRFNode(node, false));
    const edges = graph.links.map((link) => linkToRFEdge(link, graph.config.links.linkPathAlgorithm));
    setNodes(nodes);
    setEdges(edges);
  }

  /***********************************************************
   * LAYOUT
   ***********************************************************/

  function getLayoutedElements(options: LayoutOptions) {
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

      if (!alreadyAppliedLayout) {
        reactFlow.setNodes(newNodes);
        setAlreadyAppliedLayout(true);
      }
    });
  }

  /***********************************************************
   * INITIALIZE
   ***********************************************************/

  useEffect(() => {
    // [START] TEMP for development
    handleLoadGraph({ graph: initialGraph as Graph, type: 'load-graph' });
    // [END] TEMP for development

    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  useEffect(() => {
    if (!alreadyAppliedLayout) {
      getLayoutedElements({});
    }
  }, [nodes]);

  /***********************************************************
   * RENDER
   ***********************************************************/
  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodeTypes={RF_NODE_TYPES}
        edgeTypes={RF_EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Panel position="bottom-center">
          <Toolbox />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}
