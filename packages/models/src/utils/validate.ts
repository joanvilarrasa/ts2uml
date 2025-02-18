import type { z } from 'zod';
import { type ValidationError, fromError } from 'zod-validation-error';

/**
 * Type guard that validates data against a Zod schema and throws a ValidationError if invalid
 *
 * @param data - The data to validate
 * @param zSchema - The Zod schema to validate against
 * @returns True if data matches the schema
 * @throws {ValidationError} Throws a ValidationError if data does not match the schema
 *
 * @example
 * ```ts
 * interface User {name: string; age: number;}
 * const userSchema = z.object({name: z.string(); age: z.number();}) as z.ZodType<User>;
 *
 * const data = { name: "John", age: 30 };
 * try {
 *   validate<User>(data, userSchema)) {
 *   // data is typed as User
 * } catch (e) {
 *   // Handle validation error
 * }
 * ```
 */
export function validate<T>(data: unknown, zSchema: z.ZodType<T>): data is T {
  try {
    zSchema.parse(data);
    return true;
  } catch (e) {
    const validationError: ValidationError = fromError(e);
    throw validationError;
  }
}
