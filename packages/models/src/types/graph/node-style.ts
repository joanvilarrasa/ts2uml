import { z } from 'zod';

export interface NodeStyle {
  /**
   * The background color of the node element
   */
  backgroundColor?: string;
  /**
   * The border color of the node element
   */
  borderColor?: string;
  /**
   * The border width of the node element
   */
  borderWidth?: string;
  /**
   * The text color of the node element
   */
  color?: string;
  /**
   * The font size of text within the node element
   */
  fontSize?: string;
  /**
   * The font weight of text within the node element
   */
  fontWeight?: string;
  /**
   * The height of the node element
   */
  height?: string;
  /**
   * The width of the node element
   */
  width?: string;
}

export const ZNodeStyle = z.object({
  backgroundColor: z.string({ invalid_type_error: 'backgroundColor must be a string' }).optional(),
  borderColor: z.string({ invalid_type_error: 'borderColor must be a string' }).optional(),
  borderWidth: z.string({ invalid_type_error: 'borderWidth must be a string' }).optional(),
  color: z.string({ invalid_type_error: 'color must be a string' }).optional(),
  fontSize: z.string({ invalid_type_error: 'fontSize must be a string' }).optional(),
  fontWeight: z.string({ invalid_type_error: 'fontWeight must be a string' }).optional(),
  height: z.string({ invalid_type_error: 'height must be a string' }).optional(),
  width: z.string({ invalid_type_error: 'width must be a string' }).optional(),
}) as z.ZodType<NodeStyle>;

export function createNodeStyle(data?: Partial<NodeStyle>) {
  return ZNodeStyle.parse({
    backgroundColor: data?.backgroundColor,
    borderColor: data?.borderColor,
    borderWidth: data?.borderWidth,
    color: data?.color,
    fontSize: data?.fontSize,
    fontWeight: data?.fontWeight,
    height: data?.height,
    width: data?.width,
  });
}
