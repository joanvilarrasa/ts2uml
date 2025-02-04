import { getEdgeParams } from '@/lib/get-edge-params';
import { type InternalNode, getStraightPath, useInternalNode } from '@xyflow/react';

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

  return <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />;
}
