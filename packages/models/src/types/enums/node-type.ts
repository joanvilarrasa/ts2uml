import { z } from 'zod';

export const ZNodeType = z.enum(['class', 'enum', 'interface', 'type', 'variable']);

/**
 * Represents the different types of nodes that can be displayed in the diagram.
 * - "class": Represents a class definition
 * - "enum": Represents an enumeration
 * - "interface": Represents an interface definition
 * - "type": Represents a type definition
 * - "variable": Represents a variable declaration
 */
export type NodeType = z.infer<typeof ZNodeType>;

/**
 * Array containing all valid node types that can be used in the diagram.
 * @see {@link NodeType}
 */
export const NodeTypeList: NodeType[] = ZNodeType.options;
