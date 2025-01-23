import type { z } from 'zod';
import { type ValidationError, fromError } from 'zod-validation-error';

export function validate<T>(data: unknown, zSchema: z.ZodType<T>): data is T {
  try {
    zSchema.parse(data);
    return true;
  } catch (e) {
    const validationError: ValidationError = fromError(e);
    throw validationError;
  }
}
