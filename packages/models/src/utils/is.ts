import type { z } from 'zod';

/**
 * Type guard that checks if data matches a Zod schema
 *
 * @param data - The data to validate
 * @param zSchema - The Zod schema to validate against
 * @returns True if data matches the schema, false otherwise
 *
 * @example
 * ```ts
 * interface User {name: string; age: number;}
 * const userSchema = z.object({name: z.string(); age: z.number();}) as z.ZodType<User>;
 *
 * const data = { name: "John", age: 30 };
 * if (is<User>(data, userSchema)) {
 *   // data is typed as User
 * }
 * else {
 *   // data is not typed as User
 * }
 * ```
 */
export function is<T>(data: unknown, zSchema: z.ZodType<T>): data is T {
  try {
    zSchema.parse(data);
    return true;
  } catch (_) {
    return false;
  }
}
