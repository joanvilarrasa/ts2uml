import { z } from 'zod';

export const ZExportFormat = z.enum(['json', 'png', 'png-transparent']);

/**
 * Represents the different formats that can be used to export the graph
 * - `json`: JSON format
 * - `png`: PNG format
 * - `png-transparent`: PNG format with transparent background
 */
export type ExportFormat = z.infer<typeof ZExportFormat>;
