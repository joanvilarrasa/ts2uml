import { z } from 'zod';

export const ZCheckboxPartialCheckedStatus = z.enum(['checked', 'unchecked', 'partial']);

/**
 * Represents the different types of messages that are sent between components of the web
 * - `checked`: The checkbox is checked
 * - `unchecked`: The checkbox is unchecked
 * - `partial`: The checkbox is partially checked
 */
export type CheckboxPartialCheckedStatus = z.infer<typeof ZCheckboxPartialCheckedStatus>;
