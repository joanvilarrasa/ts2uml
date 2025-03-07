import { getEdgeParams } from '@/lib/react-flow/get-edge-params';
import { BaseEdge, type InternalNode, getSmoothStepPath, useInternalNode } from '@xyflow/react';

export interface FloatingEdgeStepProps {
  id: string;
  source: string;
  target: string;
  markerEnd?: string;
}

export function FloatingEdgeStep({ id, source, target, markerEnd }: FloatingEdgeStepProps) {
  const sourceNode: InternalNode = useInternalNode(source);
  const targetNode: InternalNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} color="var(--xy-edge-stroke)" />;
}
