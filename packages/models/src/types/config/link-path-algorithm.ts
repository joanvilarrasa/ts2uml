import { z } from 'zod';

export const ZLinkPathAlgorithm = z.enum(['straight', 'bezier', 'step']);

/**
 * What type of links should be used to connect the nodes.
 * - `straight`: Straight lines
 * - `bezier`: Bezier curves
 * - `step`: Step lines
 */
export type LinkPathAlgorithm = z.infer<typeof ZLinkPathAlgorithm>;
