import type { z } from 'zod';

export function is<T>(data: unknown, zSchema: z.ZodType<T>): data is T {
  try {
    zSchema.parse(data);
    return true;
  } catch (_) {
    return false;
  }
}
