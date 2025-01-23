import { z } from 'zod';
import { type NodeAttributeScope, ZNodeAttributeScope } from '../enums/node-attribute-scope.ts';
import { type NodeAttributeType, ZNodeAttributeType } from '../enums/node-attribute-type.ts';
import { type NodeStyle, ZNodeStyle } from './node-style.ts';

/**
 * Represents an attribute or method within a node in the diagram.
 */
export interface NodeAttribute {
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

export const _ZNodeAttribute = z.object({
  scope: ZNodeAttributeScope.optional(),
  style: ZNodeStyle.optional(),
  text: z.string({ invalid_type_error: 'text must be a string' }),
  type: ZNodeAttributeType,
}) as z.ZodType<NodeAttribute>;
export const ZNodeAttribute: z.ZodType<NodeAttribute> = _ZNodeAttribute;
