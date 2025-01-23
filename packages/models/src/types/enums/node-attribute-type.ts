import { z } from 'zod';

export const ZNodeAttributeType = z.enum(['attribute', 'enumOrTypeOption', 'method', 'separator']);

/**
 * Represents the different types of attributes that can be displayed in a node.
 * - "attribute": Represents a class/interface property or field
 * - "enumOrTypeOption": Represents an enum value or type union option
 * - "method": Represents a class/interface method or function
 * - "separator": Represents a visual separator line
 */
export type NodeAttributeType = z.infer<typeof ZNodeAttributeType>;

/**
 * Array containing all valid node attribute types that can be used.
 * @see {@link NodeAttributeType}
 */
export const NodeAttributeTypeList: NodeAttributeType[] = ZNodeAttributeType.options;
