import {
  DEFAULT_LIGHT_CLASS_STYLE,
  DEFAULT_LIGHT_INTERFACE_STYLE,
  DEFAULT_LIGHT_TYPE_STYLE,
  DEFAULT_LIGHT_UNION_STYLE,
  DEFAULT_LIGHT_VARIABLE_STYLE,
  type Graph,
} from '@ts2uml/models';
import { computeNodeHeight, computeNodeWidth } from '../xyflow/compute-node-size.ts';

/**
 * Converts a TS2UML graph to Excalidraw format
 * @param graph The TS2UML graph to convert
 * @returns An Excalidraw-compatible JSON object
 */
export function ts2umlToExcalidraw(graph: Graph): string {
  // Constants for element styling
  const NODE_TITLE_HEIGHT = 70;
  const ATTRIBUTE_HEIGHT = 30;
  const FONT_SIZE = 16;
  const FONT_FAMILY = 1; // 1 = Virgil (Excalidraw default)
  const ATTRIBUTE_PADDING = 10;

  const elements: unknown[] = [];
  const nodeMap: Map<string, { id: string; x: number; y: number; width: number; height: number }> = new Map();

  // First pass: create all nodes

  for (const node of graph.nodes) {
    const nodeHeight = computeNodeHeight(node) - ATTRIBUTE_PADDING;
    const nodeWidth = computeNodeWidth(node);
    const x = node.position.x;
    const y = node.position.y;

    const relatedLinks = graph.links?.filter((link) => link.sourceId === node.id || link.targetId === node.id);

    // Create node background rectangle
    const nodeElement = {
      id: node.id,
      type: 'rectangle',
      x,
      y,
      width: nodeWidth,
      height: nodeHeight,
      strokeColor: '#000000',
      backgroundColor: '#ffffff',
      fillStyle: 'solid',
      groupIds: [`${node.id}-group`],
      boundElements: relatedLinks.map((link) => ({
        id: `${link.sourceId}-${link.targetId}`,
        type: 'arrow',
      })),
    };

    elements.push(nodeElement);

    // Add title text
    const titleRectangle = {
      id: node.title.id,
      type: 'rectangle',
      x: x,
      y: y,
      width: nodeWidth,
      height: NODE_TITLE_HEIGHT,
      backgroundColor: getNodeBackgroundColor(node.type),
      fillStyle: 'hachure',
      groupIds: [`${node.id}-group`],
      boundElements: [
        {
          id: `${node.title.id}-label`,
          type: 'text',
        },
      ],
    };
    const titleLabel = {
      id: `${node.title.id}-label`,
      x: x,
      y: y,
      backgroundColor: getNodeBackgroundColor(node.type),
      width: nodeWidth,
      height: NODE_TITLE_HEIGHT,
      type: 'text',
      text: node.title.text,
      textAlign: 'center',
      verticalAlign: 'middle',
      groupIds: [`${node.id}-group`],
      fontSize: FONT_SIZE,
      fontFamily: FONT_FAMILY,
      originalText: node.title.text,
    };
    elements.push(titleLabel);
    elements.push(titleRectangle);

    // Add attributes
    if (node.attributes && node.attributes.length > 0) {
      for (const [attrIndex, attr] of node.attributes.entries()) {
        const attrY = y + NODE_TITLE_HEIGHT + attrIndex * ATTRIBUTE_HEIGHT;

        const attrRectangle = {
          id: attr.id,
          type: 'rectangle',
          x: x,
          y: attrY,
          width: nodeWidth,
          height: ATTRIBUTE_HEIGHT,
          groupIds: [`${node.id}-group`],
          boundElements: [
            {
              id: `${attr.id}-label`,
              type: 'text',
            },
          ],
        };
        const attrLabel = {
          id: `${attr.id}-label`,
          x: x + ATTRIBUTE_PADDING,
          y: attrY,
          width: nodeWidth,
          height: ATTRIBUTE_HEIGHT,
          groupIds: [`${node.id}-group`],
          type: 'text',
          text: `${attr.text || attr.name}`,
          textAlign: 'left',
          verticalAlign: 'top',
          fontSize: FONT_SIZE - 2,
          fontFamily: FONT_FAMILY,
          originalText: `${attr.text || attr.name}`,
        };

        elements.push(attrLabel);
        elements.push(attrRectangle);
      }
    }

    // Store node information for links
    nodeMap.set(node.id, {
      id: node.id,
      x,
      y,
      width: nodeWidth,
      height: nodeHeight,
    });
  }

  // Second pass: create links between nodes
  // This does not work yet
  //   if (graph.links) {
  //     for (const link of graph.links) {
  //       const sourceNode = nodeMap.get(link.sourceId);
  //       const targetNode = nodeMap.get(link.targetId);

  //       if (sourceNode && targetNode) {
  //         const targetX = targetNode.x + targetNode.width / 2;
  //         const targetY = targetNode.y + targetNode.height / 2;
  //         const sourceX = sourceNode.x + sourceNode.width / 2;
  //         const sourceY = sourceNode.y + sourceNode.height / 2;
  //         const width = targetX - sourceX;
  //         const height = targetY - sourceY;

  //         const arrow = {
  //           id: `${link.sourceId}-${link.targetId}`,
  //           type: 'arrow',
  //           x: targetX,
  //           y: targetY,
  //           width: width,
  //           height: height,
  //           points: [
  //             [0, 0],
  //             [width, height],
  //           ],
  //           //   groupIds: [`${link.sourceId}-group`, `${link.targetId}-group`],
  //           startBinding: {
  //             elementId: link.sourceId,
  //             focus: 0.5,
  //             gap: 0.5,
  //           },
  //           endBinding: {
  //             elementId: link.targetId,
  //             focus: 0.5,
  //             gap: 0.5,
  //           },
  //         };

  //         elements.push(arrow);
  //       }
  //     }
  //   }

  return JSON.stringify({
    type: 'excalidraw',
    version: 2,
    source: 'ts2uml-export',
    elements,
    appState: {
      viewBackgroundColor: '#ffffff',
      gridSize: null,
    },
  });
}

function getNodeBackgroundColor(nodeType: string): string {
  switch (nodeType) {
    case 'class':
      return DEFAULT_LIGHT_CLASS_STYLE.backgroundColor ?? '#c7eeff';
    case 'interface':
      return DEFAULT_LIGHT_INTERFACE_STYLE.backgroundColor ?? '#7ec0c4';
    case 'union':
      return DEFAULT_LIGHT_UNION_STYLE.backgroundColor ?? '#e7ccff';
    case 'type':
      return DEFAULT_LIGHT_TYPE_STYLE.backgroundColor ?? '#bdd8ff';
    case 'variable':
      return DEFAULT_LIGHT_VARIABLE_STYLE.backgroundColor ?? '#ffd1d1';
    default:
      return 'transparent';
  }
}
