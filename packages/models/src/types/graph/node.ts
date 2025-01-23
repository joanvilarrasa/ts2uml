import { z } from 'zod';
import { type NodeType, ZNodeType } from '../enums/node-type.ts';
import { type NodeAttribute, ZNodeAttribute } from './node-attribute.ts';
import { type NodeStyle, ZNodeStyle } from './node-style.ts';
import { type NodeTitle, ZNodeTitle } from './node-title.ts';

/**
 * Represents a node in the diagram, which can be a class, interface, type, enum, function, or variable.
 */
export interface Node {
  /**
   * Array of attributes, methods, or other items displayed in the node body
   * @see {@link NodeAttribute}
   */
  attributes: NodeAttribute[];

  /** Unique identifier for the node */
  id: string;

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

export const _ZNode = z.object({
  attributes: ZNodeAttribute.array().default([]),
  id: z.string({ invalid_type_error: 'id must be a string' }),
  style: ZNodeStyle.optional(),
  title: ZNodeTitle,
  type: ZNodeType,
}) as z.ZodType<Node>;
export const ZNode: z.ZodType<Node> = _ZNode;
