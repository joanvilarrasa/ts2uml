import { getEdgeParams } from '@/lib/react-flow/get-edge-params';
import { BaseEdge, type InternalNode, getStraightPath, useInternalNode } from '@xyflow/react';

export interface FloatingEdgeStraightProps {
  id: string;
  source: string;
  target: string;
  markerEnd?: string;
}

export function FloatingEdgeStraight({ id, source, target, markerEnd }: FloatingEdgeStraightProps) {
  const sourceNode: InternalNode = useInternalNode(source);
  const targetNode: InternalNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} stroke="var(--xy-edge-stroke)" />;
}
