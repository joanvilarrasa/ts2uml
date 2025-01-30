import type { z } from 'zod';

export function update<T>(data: T, updates: Partial<T>, zSchema: z.ZodType<T>): T {
  return zSchema.parse({
    ...data,
    ...updates,
  });
}

export function updateDeep<T extends Record<string, unknown>>(data: T, update: Partial<T>, zSchema?: z.ZodType<T>): T {
  for (const key of Object.keys(update)) {
    const value = update[key as keyof T];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      data[key as keyof T] = updateDeep(
        data[key as keyof T] as Record<string, unknown>,
        value as Record<string, unknown>
      ) as T[keyof T];
    } else {
      data[key as keyof T] = value as T[keyof T];
    }
  }

  if (!zSchema) {
    return data;
  }

  return zSchema.parse(data);
}
