import { z } from 'zod';

export const ZLinkType = z.enum(['association', 'inheritance', 'implements']);

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - `association`: Indicates a basic association between nodes
 * - `inheritance`: Indicates an inheritance/extends relationship
 * - `implements`: Indicates that a class implements an interface
 */
export type LinkType = z.infer<typeof ZLinkType>;
