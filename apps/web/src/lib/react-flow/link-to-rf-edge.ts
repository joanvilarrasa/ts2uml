import type { Config, Link } from '@ts2uml/models';
import { MarkerType, type Edge as RF_Edge } from '@xyflow/react';

export function linkToRFEdge(link: Link, config: Config): RF_Edge {
  return {
    id: `${link.sourceId}-${link.targetId}`,
    source: link.sourceId,
    target: link.targetId,
    type: `floating-${config.links.linkPathAlgorithm}`,
    markerEnd: {
      width: 25,
      height: 25,
      color: 'hsl(var(--foreground))',
      type: MarkerType.Arrow,
    },
  };
}
