import type { z } from "zod";
import { fromError, type ValidationError } from 'zod-validation-error';

export function is<T>(data: unknown, zSchema: z.ZodType<T>): data is T {
	try {
		zSchema.parse(data);
		return true;
	} catch (e) {
		const validationError:ValidationError = fromError(e);
		console.log(validationError);
		return false;
	}
}