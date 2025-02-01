import { z } from 'zod';

export const ZNodeAttributeScope = z.enum(['private', 'protected', 'public']);

/**
 * Represents the visibility/access level of a node attribute.
 * - "private": Attribute is only accessible within the class
 * - "protected": Attribute is only accessible to the class and its subclasses
 * - "public": Attribute is publicly accessible
 */
export type NodeAttributeScope = z.infer<typeof ZNodeAttributeScope>;
