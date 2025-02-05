import { FloatingEdgeBezier } from '@/components/graph/edges/floating-edge-bezier';
import { FloatingEdgeStep } from '@/components/graph/edges/floating-edge-step';
import { FloatingEdgeStraight } from '@/components/graph/edges/floating-edge-straight';
import { InterfaceNodeComponent } from '@/components/graph/nodes/interface-node';
import { TypeNodeComponent } from '@/components/graph/nodes/type-node';
import type { LayoutOptions } from 'elkjs';

/**
 * Default values for the node title and attribute height, this helps me compute the size of the node
 */
export const NODE_TITLE_HEIGHT = 70;
export const NODE_ATTRIBUTE_HEIGHT = 30;

/**
 * Node type components for React Flow
 */
export const RF_NODE_TYPES = {
  interface: InterfaceNodeComponent,
  class: InterfaceNodeComponent,
  enum: InterfaceNodeComponent,
  function: InterfaceNodeComponent,
  type: TypeNodeComponent,
  variable: InterfaceNodeComponent,
};

/**
 * Edge type components for React Flow
 */
export const RF_EDGE_TYPES = {
  'floating-bezier': FloatingEdgeBezier,
  'floating-step': FloatingEdgeStep,
  'floating-straight': FloatingEdgeStraight,
};

/**
 * Default layout options for Elkjs
 */
export const ELK_DEFAULT_LAYOUT_OPTIONS: LayoutOptions = {
  'elk.algorithm': 'org.eclipse.elk.layered',
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
