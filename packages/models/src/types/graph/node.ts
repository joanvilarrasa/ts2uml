import { z } from 'zod';
import { type NodeType, ZNodeType } from '../enums/node-type.ts';
import { type NodeAttribute, ZNodeAttribute, createNodeAttribute } from './node-attribute.ts';
import { type NodePosition, ZNodePosition, createNodePosition } from './node-position.ts';
import { type NodeStyle, ZNodeStyle } from './node-style.ts';
import { type NodeTitle, ZNodeTitle, createNodeTitle } from './node-title.ts';

/**
 * Represents a node in the diagram, which can be a class, interface, type, enum, function, or variable.
 */
export interface Node {
  /**
   * Array of attributes, methods, or other items displayed in the node body
   * @see {@link NodeAttribute}
   */
  attributes: NodeAttribute[];

  /**
   * jsdocs documentation for the node
   */
  docs?: string;

  /** Unique identifier for the node */
  id: string;

  /**
   * The position of the node in the graph
   * @see {@link NodePosition}
   */
  position: NodePosition;

  /**
   * Optional styling configuration for the node
   * @see {@link NodeStyle}
   */
  style?: NodeStyle;

  /**
   * The title/header section of the node
   * @see {@link NodeTitle}
   */
  title: NodeTitle;

  /**
   * The type of node (class, interface, etc)
   * @see {@link NodeType}
   */
  type: NodeType;
}

export const ZNode = z.object({
  attributes: ZNodeAttribute.array(),
  docs: z.string().optional(),
  id: z.string({ invalid_type_error: 'id must be a string' }),
  position: ZNodePosition,
  style: ZNodeStyle.optional(),
  title: ZNodeTitle,
  type: ZNodeType,
}) as z.ZodType<Node>;

export function createNode(data?: Partial<Node>): Node {
  return ZNode.parse({
    attributes: data?.attributes ? data.attributes.map((a) => createNodeAttribute(a)) : [],
    docs: data?.docs,
    id: data?.id ?? 'id',
    position: createNodePosition(data?.position),
    style: data?.style,
    title: createNodeTitle(data?.title),
    type: data?.type ?? 'class',
  });
}
