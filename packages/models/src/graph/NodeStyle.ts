import { z } from "zod";

export const ZNodeStyle = z.object({
	/**
	 * The background color of the node element
	 */
	backgroundColor: z.string({ invalid_type_error: "backgroundColor must be a string" }).default("white"),
	/**
	 * The border color of the node element
	 */
	borderColor: z.string({ invalid_type_error: "borderColor must be a string" }).default("black"),
	/**
	 * The border width of the node element
	 */
	borderWidth: z.string({ invalid_type_error: "borderWidth must be a string" }).default("1px"),
	/**
	 * The text color of the node element
	 */
	color: z.string({ invalid_type_error: "color must be a string" }).default("black"),
	/**
	 * The font size of text within the node element
	 */
	fontSize: z.string({ invalid_type_error: "fontSize must be a string" }).default("16px"),
	/**
	 * The font weight of text within the node element
	 */
	fontWeight: z.string({ invalid_type_error: "fontWeight must be a string" }).default("normal"),
	/**
	 * The height of the node element
	 */
	height: z.string({ invalid_type_error: "height must be a string" }).default("20px"),
	/**
	 * The width of the node element
	 */
	width: z.string({ invalid_type_error: "width must be a string" }).default("100px"),
});

/**
 * Represents the styling configuration for an element inside a node in the diagram.
 */
export type NodeStyle = z.infer<typeof ZNodeStyle>;

export function updateNodeStyle(style: NodeStyle, updates: Partial<NodeStyle>): NodeStyle {
	return {
		...style,
		...updates,
	};
}
