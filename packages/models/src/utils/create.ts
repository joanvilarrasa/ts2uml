import type { z } from 'zod';

export function create<T>(data: Partial<T>, zSchema: z.ZodType<T>): T {
  return zSchema.parse(data);
}
