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

export const _ZNodeStyle = z.object({
  backgroundColor: z.string({ invalid_type_error: 'backgroundColor must be a string' }).optional().default('white'),
  borderColor: z.string({ invalid_type_error: 'borderColor must be a string' }).optional().default('black'),
  borderWidth: z.string({ invalid_type_error: 'borderWidth must be a string' }).optional().default('1px'),
  color: z.string({ invalid_type_error: 'color must be a string' }).optional().default('black'),
  fontSize: z.string({ invalid_type_error: 'fontSize must be a string' }).optional().default('16px'),
  fontWeight: z.string({ invalid_type_error: 'fontWeight must be a string' }).optional().default('normal'),
  height: z.string({ invalid_type_error: 'height must be a string' }).optional().default('20px'),
  width: z.string({ invalid_type_error: 'width must be a string' }).optional().default('100px'),
});
export const ZNodeStyle: z.ZodType<NodeStyle> = _ZNodeStyle;
