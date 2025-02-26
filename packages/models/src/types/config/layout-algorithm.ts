import { z } from 'zod';

export const ZLayoutAlgorithm = z.enum(['layered', 'mrtree', 'force', 'radial', 'box', 'random']);

/**
 * Represents the different types of layout algorithms for the diagram.
 * - `layered`: Layered layout
 * - `mrtree`: Multi-root tree layout
 * - `force`: Force-directed layout
 * - `radial`: Radial layout
 * - `box`: Box layout
 * - `random`: Random layout
 */
export type LayoutAlgorithm = z.infer<typeof ZLayoutAlgorithm>;
