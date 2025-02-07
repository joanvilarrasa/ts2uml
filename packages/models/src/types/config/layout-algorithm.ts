import { z } from 'zod';

export const ZLayoutAlgorithm = z.enum(['layered', 'box', 'random', 'mrtree', 'radial', 'force']);

/**
 * Represents the different types of layout algorithms for the diagram.
 */
export type LayoutAlgorithm = z.infer<typeof ZLayoutAlgorithm>;
