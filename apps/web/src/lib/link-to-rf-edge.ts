import type { Link, LinkPathAlgorithm } from '@ts2uml/models';
import type { Edge as RF_Edge } from '@xyflow/react';

export function linkToRFEdge(link: Link, linkPathAlgorithm: LinkPathAlgorithm): RF_Edge {
  return {
    id: `${link.sourceId}-${link.targetId}`,
    source: link.sourceId,
    target: link.targetId,
    type: `floating-${linkPathAlgorithm}`,
  };
}
