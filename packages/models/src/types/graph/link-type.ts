import { z } from 'zod';

export const ZLinkType = z.enum(['association', 'inheritance']);

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "association": Indicates a basic association between nodes
 * - "inheritance": Indicates an inheritance/extends relationship
 */
export type LinkType = z.infer<typeof ZLinkType>;
