import { z } from 'zod';

export const ZNodeType = z.enum(['class', 'union', 'interface', 'type', 'variable']);

/**
 * Represents the different types of nodes that can be displayed in the diagram.
 * - `class`: Represents a class definition
 * - `union`: Represents a union type, it can be an enum or a type that unions multiple types
 * - `interface`: Represents an interface definition
 * - `type`: Represents a type definition
 * - `variable`: Represents a variable declaration
 */
export type NodeType = z.infer<typeof ZNodeType>;
