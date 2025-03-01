import type { Node } from '@ts2uml/models';
import { GraphManager } from './graph-manager';

export class HoverManager {
  private static instance: HoverManager;
  private hoveredNode: Node | null;

  private constructor() {
    this.hoveredNode = null;
  }

  static getInstance(): HoverManager {
    if (!HoverManager.instance) {
      HoverManager.instance = new HoverManager();
    }
    return HoverManager.instance;
  }

  setHoveredNode(node: Node | null) {
    if (node === this.hoveredNode) {
      return;
    }

    if (this.hoveredNode !== null) {
      this.manageHighlightClasses(this.hoveredNode, 'remove');
    }

    if (node === null) {
      this.hoveredNode = null;
    } else {
      this.hoveredNode = node;
      this.manageHighlightClasses(node, 'add');
    }
  }

  manageHighlightClasses(node: Node, action: 'add' | 'remove') {
    const gm = GraphManager.getInstance();
    const graph = gm.getGraph();

    const linksToNode = graph.links.filter((link) => link.targetId === node.id);

    for (const link of linksToNode) {
      for (const attributeId of link.sourceAttributeIds) {
        const attributeElement = document.getElementById(attributeId);
        if (attributeElement) {
          if (action === 'add') {
            attributeElement.classList.add('!shadow-[2px_2px_12px_-1px_hsl(var(--shadow))]', `bg-${node.type}/40`);
          } else {
            attributeElement.classList.remove('!shadow-[2px_2px_12px_-1px_hsl(var(--shadow))]', `bg-${node.type}/40`);
          }
        }
      }
      const linkElement = document.getElementById(`${link.sourceId}-${link.targetId}`);
      if (linkElement) {
        if (action === 'add') {
          linkElement.classList.add('!stroke-[5px]');
        } else {
          linkElement.classList.remove('!stroke-[5px]');
        }
      }
    }
  }
}
