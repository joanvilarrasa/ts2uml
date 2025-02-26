import { z } from 'zod';

export const ZTheme = z.enum(['light', 'dark']).default('light');

/**
 * Represents the theme of the diagram.
 * - `light`: Light theme
 * - `dark`: Dark theme
 */
export type Theme = z.infer<typeof ZTheme>;
