import type { Config, Link } from '@ts2uml/models';
import { MarkerType, type Edge as RF_Edge } from '@xyflow/react';

export function linkToRFEdge(link: Link, config: Config): RF_Edge {
  return {
    id: `${link.sourceId}-${link.targetId}`,
    source: link.sourceId,
    target: link.targetId,
    type: `floating-${config.links.linkPathAlgorithm}`,
    markerEnd: {
      width: 10,
      height: 10,
      color: 'hsl(var(--foreground))',
      type: MarkerType.ArrowClosed,
    },
  };
}
