import { z } from "zod";
import { ZNodeStyle } from "./NodeStyle";
import { ZNodeType } from "./NodeType";

export const ZNodeTitle = z.object({
	/**
	 * The type of node (class, interface, etc)
	 * @see {@link NodeType}
	 */
	nodeType: ZNodeType,
	/**
	 * The styling configuration for the title section
	 * @see {@link NodeStyle}
	 */
	style: ZNodeStyle.optional(),
	/**
	 * The text content/label displayed in the title
	 */
	text: z.string({ invalid_type_error: "text must be a string" }),
});

/**
 * Represents the title/header section of a node in the diagram.
 */
export type NodeTitle = z.infer<typeof ZNodeTitle>;

export function updateNodeTitle(nodeTitle: NodeTitle, updates: Partial<NodeTitle>): NodeTitle {
	return {
		...nodeTitle,
		...updates,
	};
}
