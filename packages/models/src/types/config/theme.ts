import { z } from 'zod';

export const ZTheme = z.enum(['light', 'dark']).default('light');

/**
 * Represents the theme of the diagram.
 * Can be "light" or "dark"
 */
export type Theme = z.infer<typeof ZTheme>;
