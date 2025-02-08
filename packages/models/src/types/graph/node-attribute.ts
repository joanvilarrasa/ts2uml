import { z } from 'zod';
import { type NodeAttributeScope, ZNodeAttributeScope } from './node-attribute-scope.ts';
import { type NodeAttributeType, ZNodeAttributeType } from './node-attribute-type.ts';
import { type NodeStyle, ZNodeStyle, createNodeStyle } from './node-style.ts';

/**
 * Represents an attribute or method within a node in the diagram.
 */
export interface NodeAttribute {
  /**
   * Unique identifier for the attribute
   */
  id: string;

  /**
   * jsdocs documentation for the attribute
   */
  docs?: string;

  /**
   * Whether the attribute is static
   */
  isStatic?: boolean;

  /**
   * The visibility/access level of the attribute (public, protected, private)
   * @see {@link NodeAttributeScope}
   */
  scope?: NodeAttributeScope;

  /**
   * The styling configuration for this attribute
   * @see {@link NodeStyle}
   */
  style?: NodeStyle;

  /**
   * The text content/label of the attribute
   */
  text: string;

  /**
   * The type of attribute (attribute, method, separator, etc)
   * @see {@link NodeAttributeType}
   */
  type: NodeAttributeType;
}

export const ZNodeAttribute = z.object({
  docs: z.string().optional(),
  id: z.string({ invalid_type_error: 'id must be a string' }),
  isStatic: z.boolean().optional(),
  scope: ZNodeAttributeScope.optional(),
  style: ZNodeStyle.optional(),
  text: z.string({ invalid_type_error: 'text must be a string' }),
  type: ZNodeAttributeType,
}) as z.ZodType<NodeAttribute>;

export function createNodeAttribute(data?: Partial<NodeAttribute>): NodeAttribute {
  return ZNodeAttribute.parse({
    docs: data?.docs,
    id: data?.id ?? 'id',
    isStatic: data?.isStatic,
    scope: data?.scope,
    style: createNodeStyle(data?.style),
    text: data?.text ?? 'text',
    type: data?.type ?? 'attribute',
  });
}
