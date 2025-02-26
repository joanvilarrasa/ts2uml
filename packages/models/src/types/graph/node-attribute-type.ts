import { z } from 'zod';

export const ZNodeAttributeType = z.enum(['attribute', 'unionOption', 'method']);

/**
 * Represents the different types of attributes that can be displayed in a node.
 * - `attribute`: Represents a class/interface property or field
 * - `unionOption`: Represents an enum value or type union option
 * - `method`: Represents a class/interface method or function
 */
export type NodeAttributeType = z.infer<typeof ZNodeAttributeType>;
