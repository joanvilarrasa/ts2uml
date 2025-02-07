import { z } from 'zod';

export const ZLayoutAlgorithm = z.enum(['layered', 'mrtree', 'force', 'radial', 'box', 'random']);

/**
 * Represents the different types of layout algorithms for the diagram.
 */
export type LayoutAlgorithm = z.infer<typeof ZLayoutAlgorithm>;
