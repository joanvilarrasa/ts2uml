import type { z } from 'zod';

/**
 * Update an object with a schema.
 * This function will always update the original data.
 * If you provide a schema, a new object will be returned.
 * If you do not provide a schema, the original data will be returned.
 *
 * @param data - The original data to update.
 * @param updates - The updates to apply to the data.
 * @param schema - The schema to validate the updated data against.
 * @returns The updated data.
 */
export function update<T>(data: T, updates: Partial<T>, zSchema: z.ZodType<T>): T {
  return zSchema.parse({
    ...data,
    ...updates,
  });
}

/**
 * Update a nested object with a schema.
 * This function will always update the original data.
 * If you provide a schema, a new object will be returned.
 * If you do not provide a schema, the original data will be returned.
 *
 * @param data - The original data to update.
 * @param updates - The updates to apply to the data.
 * @param schema - The schema to validate the updated data against.
 * @returns The updated data.
 */
export function updateDeep<T extends object>(
  data: T,
  updates: { [P in keyof T]?: T[P] | object },
  schema?: z.ZodType<T>
): T {
  for (const key of Object.keys(updates) as Array<keyof T>) {
    const value = updates[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const currentValue = data[key];
      if (currentValue && typeof currentValue === 'object') {
        data[key] = updateDeep(currentValue as object, value as object) as T[keyof T];
      } else {
        data[key] = value as T[keyof T];
      }
    } else {
      data[key] = value as T[keyof T];
    }
  }

  if (schema) {
    return schema.parse(data);
  }

  return data;
}
