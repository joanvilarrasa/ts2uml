import { getEdgeParams } from '@/lib/react-flow/get-edge-params';
import { BaseEdge, type InternalNode, getSimpleBezierPath, useInternalNode, } from '@xyflow/react';

export interface FloatingEdgeBezierProps {
  id: string;
  source: string;
  target: string;
  markerEnd?: string;
}

export function FloatingEdgeBezier({ id, source, target, markerEnd }: FloatingEdgeBezierProps) {
  const sourceNode: InternalNode = useInternalNode(source);
  const targetNode: InternalNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getSimpleBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} color="var(--xy-edge-stroke)" />;
}
