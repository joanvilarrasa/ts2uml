import { z } from 'zod';
import { type NodeAttributeExtended, ZNodeAttributeExtended } from './node-attribute-extended.ts';
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
   * If the attribute is extended, this will contain the extended information
   */
  extended?: NodeAttributeExtended;

  /**
   * The name of the attribute
   */
  name: string;

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
   * The target nodeIds that this attribute points to.
   */
  targets?: string[];

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
  extended: ZNodeAttributeExtended.optional(),
  name: z.string({ invalid_type_error: 'name must be a string' }),
  scope: ZNodeAttributeScope.optional(),
  style: ZNodeStyle.optional(),
  targets: z.array(z.string()).optional(),
  text: z.string({ invalid_type_error: 'text must be a string' }),
  type: ZNodeAttributeType,
}) as z.ZodType<NodeAttribute>;

export function createNodeAttribute(data?: Partial<NodeAttribute>): NodeAttribute {
  return ZNodeAttribute.parse({
    docs: data?.docs,
    id: data?.id ?? 'id',
    isStatic: data?.isStatic,
    extended: data?.extended,
    name: data?.name ?? 'name',
    scope: data?.scope,
    style: createNodeStyle(data?.style),
    targets: data?.targets,
    text: data?.text ?? 'text',
    type: data?.type ?? 'attribute',
  });
}
