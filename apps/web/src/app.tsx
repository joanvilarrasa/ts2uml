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
import { computeNodeHeight, computeNodeWidth } from '@ts2uml/core';
import {
  type MsgLoadGraph,
  type MsgUpdateLinkPathAlgorithm,
  type MsgUpdateVisibleNodes,
  type Node,
  ZMsgLoadGraph,
  ZMsgUpdateLinkPathAlgorithm,
  ZMsgUpdateVisibleNodes,
  createMsgPageReady,
  is,
} from '@ts2uml/models';
import {
  type MsgUpdateLayoutAlgorithm,
  ZMsgUpdateLayoutAlgorithm,
} from '@ts2uml/models/src/types/messages/msg-update-layout-algorithm';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import { toast } from 'sonner';
import { Toolbox } from './components/toolbox/toolbox';
import { ELK_DEFAULT_LAYOUT_OPTIONS, RF_EDGE_TYPES, RF_NODE_TYPES } from './lib/constants';
import { GraphManager } from './lib/graph-manager';
import { isNodeHidden } from './lib/react-flow/is-node-hidden';
import { linkToRFEdge } from './lib/react-flow/link-to-rf-edge';
import { nodeToRFNode } from './lib/react-flow/node-to-rf-node';
import { useTheme } from './theme-provider';

const elk = new ELK();

export default function App() {
  const gm: GraphManager = GraphManager.getInstance();
  const { theme } = useTheme();
  const reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layoutOptions, setLayoutOptions] = useState<LayoutOptions>(ELK_DEFAULT_LAYOUT_OPTIONS);

  /***********************************************************
   * MESSAGE HANDLERS
   ***********************************************************/

  function messageHandler(event: MessageEvent) {
    const data = event.data;
    if (is<MsgLoadGraph>(data, ZMsgLoadGraph)) {
      handleLoadGraph(data);
    } else if (is<MsgUpdateVisibleNodes>(data, ZMsgUpdateVisibleNodes)) {
      handleUpdateVisibleNodes();
    } else if (is<MsgUpdateLayoutAlgorithm>(data, ZMsgUpdateLayoutAlgorithm)) {
      handleUpdateLayoutAlgorithm(data);
    } else if (is<MsgUpdateLinkPathAlgorithm>(data, ZMsgUpdateLinkPathAlgorithm)) {
      handleUpdateLinkPathAlgorithm(data);
    }
  }

  function handleUpdateVisibleNodes() {
    reactFlow.getNodes().map((node: RF_Node<{ data: Node }>) => {
      const isCurrentlyHidden = node.hidden;
      const isHidden = isNodeHidden(node.data.data, gm.getGraph().config);
      if (isCurrentlyHidden !== isHidden) {
        reactFlow.updateNode(node.id, { hidden: isHidden });
      }
    });
  }

  function handleLoadGraph({ graph, applyLayoutOnLoad }: MsgLoadGraph) {
    const loaderToastId = toast.loading('Loading diagram...');
    gm.setGraph(graph);
    const nodes = graph.nodes.map((node) => nodeToRFNode(node, graph.config));
    const edges = graph.links.map((link) => linkToRFEdge(link, graph.config));
    setNodes(nodes);
    setEdges(edges);
    if (applyLayoutOnLoad) {
      setLayoutOptions({
        ...layoutOptions,
        'elk.algorithm': `org.eclipse.elk.${graph.config.layoutAlgorithm}`,
      });
    }
    setTimeout(() => {
      toast.dismiss(loaderToastId);
      toast.success('Diagram loaded!', { style: { border: '1px solid hsl(var(--primary))' } });
    }, 1);
  }

  function handleUpdateLayoutAlgorithm({ layoutAlgorithm }: MsgUpdateLayoutAlgorithm) {
    setLayoutOptions({
      ...layoutOptions,
      'elk.algorithm': `org.eclipse.elk.${layoutAlgorithm}`,
    });
  }

  function handleUpdateLinkPathAlgorithm({ linkPathAlgorithm }: MsgUpdateLinkPathAlgorithm) {
    const edges = reactFlow.getEdges();
    for (const edge of edges) {
      reactFlow.updateEdge(edge.id, {
        type: `floating-${linkPathAlgorithm}`,
      });
    }
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

      gm.updateNodePositions(newNodes);
      reactFlow.setNodes(newNodes);
    });
  }

  /***********************************************************
   * INITIALIZE
   ***********************************************************/

  useEffect(() => {
    window.addEventListener('message', messageHandler);
    // If we are in the extension environment, we need to send a message to the extension to tell it that the page is ready so that it starts generating the graph
    if (import.meta.env.VITE_ENV === 'extension') {
      setTimeout(() => {
        window.postMessage(createMsgPageReady());
      }, 10);
    }
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  useEffect(() => {
    getLayoutedElements(layoutOptions);
  }, [layoutOptions]);

  /***********************************************************
   * RENDER
   ***********************************************************/
  return (
    <div className="h-full w-full overflow-hidden">
      <ReactFlow
        colorMode={theme}
        nodeTypes={RF_NODE_TYPES}
        edgeTypes={RF_EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={10}
        minZoom={0.1}
      >
        <Panel position="bottom-center">
          <Toolbox />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}
