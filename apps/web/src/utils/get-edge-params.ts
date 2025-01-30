import type { Node } from '@ts2uml/models';
import type { InternalNode, Node as RF_Node } from '@xyflow/react';
import { Position } from '@xyflow/react';

// returns the position (top,right,bottom or right) passed node compared to
function getParams(
  nodeA: InternalNode & RF_Node<{ data: Node }>,
  nodeB: InternalNode & RF_Node<{ data: Node }>,
  type: 'source' | 'target',
  sourceHandleId: string
) {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);
  const positionX = centerA.x > centerB.x ? Position.Left : Position.Right;
  const positionY = centerA.y > centerB.y ? Position.Top : Position.Bottom;

  if (type === 'source' && sourceHandleId) {
    const sourceHandleIdToFind =
      positionX === Position.Left ? `${sourceHandleId}` : `${sourceHandleId}-${Position.Right}`;

    const sourceHandle = nodeA.internals.handleBounds.source.find(
      (h) => h.id === sourceHandleIdToFind
    );
    if (sourceHandle) {
      const sourcePosition = nodeA.internals.positionAbsolute;
      const sourceX = sourcePosition.x + sourceHandle.x;
      const sourceY = sourcePosition.y + sourceHandle.y;

      let position: Position = Position.Left;
      if (sourcePosition.x > nodeB.internals.positionAbsolute.x) {
        position = Position.Left;
      } else {
        position = Position.Right;
      }

      return [sourceX, sourceY, position];
    }
    throw new Error('Source handle not found');
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, positionY, type);
  return [x, y, positionY];
}

function getHandleCoordsByPosition(node, handlePosition, type) {
  // all handles are from type source, that's why we use handleBounds.source here
  const handle =
    type === 'source'
      ? node.internals.handleBounds.source.find((h) => h.position === handlePosition)
      : node.internals.handleBounds.target.find((h) => h.position === handlePosition);

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
    default:
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

function getNodeCenter(node: InternalNode & RF_Node<{ data: Node }>) {
  return {
    x: node.internals.positionAbsolute.x + node.measured.width / 2,
    y: node.internals.positionAbsolute.y + node.measured.height / 2,
  };
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target, sourceHandleId: string) {
  const [sx, sy, sourcePos] = getParams(source, target, 'source', sourceHandleId);
  const [tx, ty, targetPos] = getParams(target, source, 'target', sourceHandleId);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}
