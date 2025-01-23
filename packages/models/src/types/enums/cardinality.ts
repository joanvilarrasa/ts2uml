import { z } from 'zod';

export const ZCardinality = z
  .union([
    z.string().length(1).startsWith('*'),
    z.number().nonnegative().int(),
    z.array(z.union([z.string().length(1).startsWith('*'), z.number().nonnegative().int()])).length(2),
  ])
  .default('*');

/**
 * Represents the cardinality of a relationship in a graph.
 * Can be
 * - A positive integer or 0
 * - '*'
 * - An array of 2 positions with a combination of the options above
 */
export type Cardinality = z.infer<typeof ZCardinality>;
