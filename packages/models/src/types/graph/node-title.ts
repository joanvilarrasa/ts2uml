import { z } from 'zod';
import { type NodeStyle, ZNodeStyle, createNodeStyle } from './node-style.ts';
import { type NodeType, ZNodeType } from './node-type.ts';

/**
 * Represents the title/header section of a node in the diagram.
 */
export interface NodeTitle {
  /**
   * Unique identifier for the title
   */
  id: string;
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
  id: z.string({ invalid_type_error: 'id must be a string' }),
  nodeType: ZNodeType,
  style: ZNodeStyle.optional(),
  text: z.string({ invalid_type_error: 'text must be a string' }),
}) as z.ZodType<NodeTitle>;

export function createNodeTitle(data?: Partial<NodeTitle>): NodeTitle {
  return ZNodeTitle.parse({
    id: data?.id ?? 'id',
    nodeType: data?.nodeType ?? 'class',
    style: createNodeStyle(data?.style),
    text: data?.text ?? 'text',
  });
}
