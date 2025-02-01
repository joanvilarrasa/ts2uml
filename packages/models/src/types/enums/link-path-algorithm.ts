import { z } from 'zod';

export const ZLinkPathAlgorithm = z.enum(['bezier', 'step', 'straight']);

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "association": Indicates a basic association between nodes
 * - "inheritance": Indicates an inheritance/extends relationship
 */
export type LinkPathAlgorithm = z.infer<typeof ZLinkPathAlgorithm>;
