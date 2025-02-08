import { z } from 'zod';

export const ZNodeAttributeType = z.enum(['attribute', 'unionOption', 'method', 'separator']);

/**
 * Represents the different types of attributes that can be displayed in a node.
 * - "attribute": Represents a class/interface property or field
 * - "staticAttribute": Represents a class/interface static property or field
 * - "unionOption": Represents an enum value or type union option
 * - "method": Represents a class/interface method or function
 * - "staticMethod": Represents a class/interface static method or function
 * - "separator": Represents a visual separator line
 */
export type NodeAttributeType = z.infer<typeof ZNodeAttributeType>;
