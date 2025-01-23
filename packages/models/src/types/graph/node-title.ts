import { z } from 'zod';
import { type NodeType, ZNodeType } from '../enums/node-type.ts';
import { type NodeStyle, ZNodeStyle } from './node-style.ts';

/**
 * Represents the title/header section of a node in the diagram.
 */
export interface NodeTitle {
  /**
   * The type of node (class, interface, etc)
   * @see {@link NodeType}
   */
  nodeType: NodeType;
  /**
   * The styling configuration for the title section
   * @see {@link NodeStyle}
   */
  style?: NodeStyle;
  /**
   * The text content/label displayed in the title
   */
  text: string;
}

export const ZNodeTitle = z.object({
  nodeType: ZNodeType,
  style: ZNodeStyle.optional(),
  text: z.string({ invalid_type_error: 'text must be a string' }).default('text'),
}) as z.ZodType<NodeTitle>;
