import { z } from 'zod';

declare const ZLinkType: z.ZodEnum<["association", "inheritance"]>;
/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "association": Indicates a basic association between nodes
 * - "inheritance": Indicates an inheritance/extends relationship
 */
type LinkType = z.infer<typeof ZLinkType>;

/**
 * Interface defining the configuration for filtering links (relationships) in the diagram.
 */
interface ConfigLinksFilter {
    /**
     * Array of link types to filter links by their type (e.g., inheritance, implementation, etc.).
     * If a link type is provided, all links of that type will be excluded from the diagram.
     * Empty array means no type filtering.
     * @see {@link LinkType}
     */
    filter_type: LinkType[];
}
declare const ZConfigLinksFilter: z.ZodType<ConfigLinksFilter>;
declare function createConfigLinksFilter(data?: Partial<ConfigLinksFilter>): ConfigLinksFilter;

/**
 * Interface defining the display options for links (relationships) in the diagram.
 */
interface ConfigLinksOptions {
    /**
     * Whether to hide all links in the diagram.
     * If true, no links will be displayed.
     */
    hide?: boolean;
    /**
     * Whether to hide the arrows indicating link direction.
     * If true, link lines will be shown without directional arrows.
     */
    hide_arrows?: boolean;
    /**
     * Whether to hide the text labels on links.
     * If true, relationship type labels will not be displayed.
     */
    hide_labels?: boolean;
}
declare const ZConfigLinksOptions: z.ZodType<ConfigLinksOptions>;
declare function createConfigLinksOptions(data?: Partial<ConfigLinksOptions>): ConfigLinksOptions;

declare const ZLinkPathAlgorithm: z.ZodEnum<["straight", "bezier", "step"]>;
/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "association": Indicates a basic association between nodes
 * - "inheritance": Indicates an inheritance/extends relationship
 */
type LinkPathAlgorithm = z.infer<typeof ZLinkPathAlgorithm>;

/**
 * Interface defining the configuration for displaying links (relationships) in the diagram.
 */
interface ConfigLinks {
    /**
     * Configuration for filtering which links should be displayed in the diagram.
     * @see {@link ConfigLinksFilter}
     */
    filter: ConfigLinksFilter;
    /**
     * Display options that control how links are rendered.
     * @see {@link ConfigLinksOptions}
     */
    options: ConfigLinksOptions;
    /**
     * The algorithm to use for pathing the links.
     * @see {@link LinkPathAlgorithm}
     */
    linkPathAlgorithm: LinkPathAlgorithm;
}
declare const ZConfigLinks: z.ZodType<ConfigLinks>;
declare function createConfigLinks(data?: Partial<ConfigLinks>): ConfigLinks;

interface NodeStyle {
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
declare const ZNodeStyle: z.ZodType<NodeStyle>;
declare function createNodeStyle(data?: Partial<NodeStyle>): NodeStyle;

declare const ZNodeType: z.ZodEnum<["class", "union", "interface", "type", "variable"]>;
/**
 * Represents the different types of nodes that can be displayed in the diagram.
 * - "class": Represents a class definition
 * - "union": Represents a union type, it can be an enum or a type that unions multiple types
 * - "interface": Represents an interface definition
 * - "type": Represents a type definition
 * - "variable": Represents a variable declaration
 */
type NodeType = z.infer<typeof ZNodeType>;

/**
/**
 * Interface defining filters for nodes to be displayed in the diagram.
 */
interface ConfigNodesFilter {
    /**
     * Array of strings to filter nodes by their file path or name.
     * This array can contain directories, files and concrete node ids.
     * If a directory is provided, all nodes within that directory will be excluded from the diagram.
     * If a file is provided, all nodes within that file will be excluded from the diagram.
     * If a concrete node id is provided, the node with that id will be excluded from the diagram.
     * Empty array means no path filtering.
     */
    filter_node: string[];
    /**
     * Array of node types to filter nodes by their type (e.g., class, interface, enum, etc.).
     * If a node type is provided, all nodes of that type will be excluded from the diagram.
     * Empty array means no type filtering.
     * @see {@link NodeType}
     */
    filter_type: NodeType[];
}
declare const ZConfigNodesFilter: z.ZodType<ConfigNodesFilter>;
declare function createConfigNodesFilter(data?: Partial<ConfigNodesFilter>): ConfigNodesFilter;

/**
 * Type defining display options that control what information is shown inside the nodes.
 */
interface ConfigNodesOptions {
    /**
     * Whether to hide all private members (attributes and methods)
     */
    hide_all_private?: boolean;
    /**
     * Whether to hide all protected members (attributes and methods)
     */
    hide_all_protected?: boolean;
    /**
     * Whether to hide all public members (attributes and methods)
     */
    hide_all_public?: boolean;
    /**
     * Whether to hide all static members (attributes and methods)
     */
    hide_all_static?: boolean;
    /**
     * Whether to hide all attributes regardless of visibility
     */
    hide_attributes?: boolean;
    /**
     * Whether to hide private attributes
     */
    hide_attributes_private?: boolean;
    /**
     * Whether to hide protected attributes
     */
    hide_attributes_protected?: boolean;
    /**
     * Whether to hide public attributes
     */
    hide_attributes_public?: boolean;
    /**
     * Whether to hide the description for nodes
     */
    hide_description?: boolean;
    /**
     * Whether to hide all methods regardless of visibility
     */
    hide_methods?: boolean;
    /**
     * Whether to hide private methods
     */
    hide_methods_private?: boolean;
    /**
     * Whether to hide protected methods
     */
    hide_methods_protected?: boolean;
    /**
     * Whether to hide public methods
     */
    hide_methods_public?: boolean;
    /**
     * Whether to hide the type for nodes (e.g., class, interface, etc.)
     */
    hide_type?: boolean;
}
declare const ZConfigNodesOptions: z.ZodType<ConfigNodesOptions>;
declare function createConfigNodesOptions(data?: Partial<ConfigNodesOptions>): ConfigNodesOptions;

/**
 * Interface defining the configuration for displaying nodes in the diagram.
 */
interface ConfigNodes {
    /**
     * Configuration for filtering which nodes should be displayed in the diagram.
     * @see {@link ConfigNodesFilter}
     */
    filter: ConfigNodesFilter;
    /**
     * Display options that control what information is shown inside the nodes.
     * @see {@link ConfigNodesOptions}
     */
    options: ConfigNodesOptions;
    /**
     * Style configurations for each type of node (class, interface, etc).
     * @see {@link NodeStyle}
     */
    styles: {
        [k in NodeType]?: NodeStyle;
    };
}
declare const ZConfigNodes: z.ZodType<ConfigNodes>;
declare function createConfigNodes(data?: Partial<ConfigNodes>): ConfigNodes;

declare const ZLayoutAlgorithm: z.ZodEnum<["layered", "mrtree", "force", "radial", "box", "random"]>;
/**
 * Represents the different types of layout algorithms for the diagram.
 */
type LayoutAlgorithm = z.infer<typeof ZLayoutAlgorithm>;

declare const ZTheme: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
/**
 * Represents the theme of the diagram.
 * Can be "light" or "dark"
 */
type Theme = z.infer<typeof ZTheme>;

/**
 * Main configuration object that controls the overall diagram appearance and behavior.
 * Contains settings for theme, display options, and filtering of nodes and relationships.
 */
interface Config {
    /**
     * Additional options for customizing the diagram.
     */
    layoutAlgorithm: LayoutAlgorithm;
    /**
     * Configuration for displaying relationships between nodes.
     * @see {@link ConfigLinks}
     */
    links: ConfigLinks;
    /**
     * Metadata about the configuration itself.
     */
    metadata: {
        version: string;
    };
    /**
     * Configuration for displaying nodes in the diagram.
     * @see {@link ConfigNodes}
     */
    nodes: ConfigNodes;
    /**
     * The theme of the diagram.
     */
    theme: Theme;
}
declare const ZConfig: z.ZodType<Config>;
declare function createConfig(data?: Partial<Config>): Config;

declare const ZExportFormat: z.ZodEnum<["json", "png", "png-transparent"]>;
/**
 * Represents the different formats that can be used to export the graph
 */
type ExportFormat = z.infer<typeof ZExportFormat>;

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
interface Link {
    /**
     * The unique identifier of the source node
     * @see {@link Node}
     */
    sourceId: string;
    /**
     * The unique identifier of the target node
     * @see {@link Node}
     */
    targetId: string;
    /**
     * Optional text label to display on the relationship
     */
    text?: string;
    /**
     * The type of relationship between the nodes
     * @see {@link LinkType}
     */
    type: LinkType;
}
declare const ZLink: z.ZodType<Link>;
declare function createLink(data?: Partial<Link>): Link;

declare const ZNodeAttributeScope: z.ZodEnum<["private", "protected", "public"]>;
/**
 * Represents the visibility/access level of a node attribute.
 * - "private": Attribute is only accessible within the class
 * - "protected": Attribute is only accessible to the class and its subclasses
 * - "public": Attribute is publicly accessible
 */
type NodeAttributeScope = z.infer<typeof ZNodeAttributeScope>;

declare const ZNodeAttributeType: z.ZodEnum<["attribute", "unionOption", "method", "separator"]>;
/**
 * Represents the different types of attributes that can be displayed in a node.
 * - "attribute": Represents a class/interface property or field
 * - "staticAttribute": Represents a class/interface static property or field
 * - "unionOption": Represents an enum value or type union option
 * - "method": Represents a class/interface method or function
 * - "staticMethod": Represents a class/interface static method or function
 * - "separator": Represents a visual separator line
 */
type NodeAttributeType = z.infer<typeof ZNodeAttributeType>;

/**
 * Represents an attribute or method within a node in the diagram.
 */
interface NodeAttribute {
    /**
     * Unique identifier for the attribute
     */
    id: string;
    /**
     * jsdocs documentation for the attribute
     */
    docs?: string;
    /**
     * Whether the attribute is static
     */
    isStatic?: boolean;
    /**
     * The visibility/access level of the attribute (public, protected, private)
     * @see {@link NodeAttributeScope}
     */
    scope?: NodeAttributeScope;
    /**
     * The styling configuration for this attribute
     * @see {@link NodeStyle}
     */
    style?: NodeStyle;
    /**
     * The text content/label of the attribute
     */
    text: string;
    /**
     * The type of attribute (attribute, method, separator, etc)
     * @see {@link NodeAttributeType}
     */
    type: NodeAttributeType;
}
declare const ZNodeAttribute: z.ZodType<NodeAttribute>;
declare function createNodeAttribute(data?: Partial<NodeAttribute>): NodeAttribute;

/**
 * Represents a node position in the graph
 */
interface NodePosition {
    /**
     * Whether the node is locked in place
     */
    locked: boolean;
    /**
     * The x position of the node
     */
    x: number;
    /**
     * The y position of the node
     */
    y: number;
}
declare function createNodePosition(data?: Partial<NodePosition>): NodePosition;

/**
 * Represents the title/header section of a node in the diagram.
 */
interface NodeTitle {
    /**
     * Unique identifier for the title
     */
    id: string;
    /**
     * The type of node (class, interface, etc)
     * @see {@link NodeType}
     */
    nodeType: NodeType;
    /**
     * The styling configuration for the title section
     * @see {@link NodeStyle}
     */
    style?: NodeStyle;
    /**
     * The text content/label displayed in the title
     */
    text: string;
}
declare const ZNodeTitle: z.ZodType<NodeTitle>;
declare function createNodeTitle(data?: Partial<NodeTitle>): NodeTitle;

/**
 * Represents a node in the diagram, which can be a class, interface, type, enum, function, or variable.
 */
interface Node {
    /**
     * Array of attributes, methods, or other items displayed in the node body
     * @see {@link NodeAttribute}
     */
    attributes: NodeAttribute[];
    /**
     * jsdocs documentation for the node
     */
    docs?: string;
    /** Unique identifier for the node */
    id: string;
    /**
     * The position of the node in the graph
     * @see {@link NodePosition}
     */
    position: NodePosition;
    /**
     * Optional styling configuration for the node
     * @see {@link NodeStyle}
     */
    style?: NodeStyle;
    /**
     * The title/header section of the node
     * @see {@link NodeTitle}
     */
    title: NodeTitle;
    /**
     * The type of node (class, interface, etc)
     * @see {@link NodeType}
     */
    type: NodeType;
}
declare const ZNode: z.ZodType<Node>;
declare function createNode(data?: Partial<Node>): Node;

/**
 * Represents a graph/diagram containing nodes and their links.
 */
interface Graph {
    /**
     * Configuration for the graph
     * @see {@link Config}
     */
    config: Config;
    /**
     * Array of nodes in the graph (classes, interfaces, etc)
     * @see {@link Node}
     */
    nodes: Node[];
    /**
     * Array of links/relationships between nodes
     * @see {@link Link}
     */
    links: Link[];
}
declare const ZGraph: z.ZodType<Graph>;
declare function createGraph(data?: Partial<Graph>): Graph;

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
interface MsgLoadGraph {
    /**
     * Whether to apply a layout on load
     */
    applyLayoutOnLoad: boolean;
    /**
     * A list of node ids to add to the diagram
     * @see {@link Graph}
     */
    graph: Graph;
    /**
     * The type of message
     * @see {@link MsgType}
     */
    type: 'load-graph';
}
declare const ZMsgLoadGraph: z.ZodType<MsgLoadGraph>;
declare function createMsgLoadGraph(data?: Partial<MsgLoadGraph>): MsgLoadGraph;

declare const ZMsgType: z.ZodEnum<["load-graph", "update-layout-algorithm", "update-link-path-algorithm", "update-visible-nodes"]>;
/**
 * Represents the different types of messages that are sent between components of the web
 */
type MsgType = z.infer<typeof ZMsgType>;

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
interface MsgUpdateLayoutAlgorithm {
    /**
     * The layout algorithm to use
     * @see {@link LayoutAlgorithm}
     */
    layoutAlgorithm: LayoutAlgorithm;
    /**
     * The type of message
     * @see {@link MsgType}
     */
    type: 'update-layout-algorithm';
}
declare const ZMsgUpdateLayoutAlgorithm: z.ZodType<MsgUpdateLayoutAlgorithm>;
declare function createMsgUpdateLayoutAlgorithm(data?: Partial<MsgUpdateLayoutAlgorithm>): MsgUpdateLayoutAlgorithm;

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
interface MsgUpdateLinkPathAlgorithm {
    /**
     * The link path algorithm to use
     * @see {@link LinkPathAlgorithm}
     */
    linkPathAlgorithm: LinkPathAlgorithm;
    /**
     * The type of message
     * @see {@link MsgType}
     */
    type: 'update-link-path-algorithm';
}
declare const ZMsgUpdateLinkPathAlgorithm: z.ZodType<MsgUpdateLinkPathAlgorithm>;
declare function createMsgUpdateLinkPathAlgorithm(data?: Partial<MsgUpdateLinkPathAlgorithm>): MsgUpdateLinkPathAlgorithm;

/**
 * Represents a relationship/link between two nodes in the diagram.
 */
interface MsgUpdateVisibleNodes {
    /**
     * A list of node ids to add to the diagram
     * @see {@link Node}
     */
    nodeIdsToAdd: string[];
    /**
     * A list of node ids to remove from the diagram
     * @see {@link Node}
     */
    nodeIdsToRemove: string[];
    /**
     * The type of message
     * @see {@link MsgType}
     */
    type: 'update-visible-nodes';
}
declare const ZMsgUpdateVisibleNodes: z.ZodType<MsgUpdateVisibleNodes>;
declare function createMsgUpdateVisibleNodes(data?: Partial<MsgUpdateVisibleNodes>): MsgUpdateVisibleNodes;

declare const DEFAULT_THEME: Theme;
declare const LIGHT_THEME_COLORS: {
    background: string;
    foreground: string;
    text: string;
    border: string;
};
declare const DARK_THEME_COLORS: {
    background: string;
    foreground: string;
    text: string;
    border: string;
};

declare const DEFAULT_DARK_CLASS_STYLE: NodeStyle;
declare const DEFAULT_DARK_UNION_STYLE: NodeStyle;
declare const DEFAULT_DARK_INTERFACE_STYLE: NodeStyle;
declare const DEFAULT_DARK_TYPE_STYLE: NodeStyle;
declare const DEFAULT_DARK_VARIABLE_STYLE: NodeStyle;

declare const DEFAULT_LIGHT_CLASS_STYLE: NodeStyle;
declare const DEFAULT_LIGHT_UNION_STYLE: NodeStyle;
declare const DEFAULT_LIGHT_INTERFACE_STYLE: NodeStyle;
declare const DEFAULT_LIGHT_TYPE_STYLE: NodeStyle;
declare const DEFAULT_LIGHT_VARIABLE_STYLE: NodeStyle;

declare function validate<T>(data: unknown, zSchema: z.ZodType<T>): data is T;

declare function is<T>(data: unknown, zSchema: z.ZodType<T>): data is T;

declare function update<T>(data: T, updates: Partial<T>, zSchema: z.ZodType<T>): T;
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
declare function updateDeep<T extends object>(data: T, updates: {
    [P in keyof T]?: T[P] | object;
}, schema?: z.ZodType<T>): T;

declare const ZCheckboxPartialCheckedStatus: z.ZodEnum<["checked", "unchecked", "partial"]>;
/**
 * Represents the different types of messages that are sent between components of the web
 */
type CheckboxPartialCheckedStatus = z.infer<typeof ZCheckboxPartialCheckedStatus>;

interface TreeNode {
    id: string;
    isFolder: boolean;
    isFile: boolean;
    isElement: boolean;
    checked: CheckboxPartialCheckedStatus;
    children?: {
        [key: string]: TreeNode;
    };
    name: string;
}

export { type CheckboxPartialCheckedStatus, type Config, type ConfigLinks, type ConfigLinksFilter, type ConfigLinksOptions, type ConfigNodes, type ConfigNodesFilter, type ConfigNodesOptions, DARK_THEME_COLORS, DEFAULT_DARK_CLASS_STYLE, DEFAULT_DARK_INTERFACE_STYLE, DEFAULT_DARK_TYPE_STYLE, DEFAULT_DARK_UNION_STYLE, DEFAULT_DARK_VARIABLE_STYLE, DEFAULT_LIGHT_CLASS_STYLE, DEFAULT_LIGHT_INTERFACE_STYLE, DEFAULT_LIGHT_TYPE_STYLE, DEFAULT_LIGHT_UNION_STYLE, DEFAULT_LIGHT_VARIABLE_STYLE, DEFAULT_THEME, type ExportFormat, type Graph, LIGHT_THEME_COLORS, type LayoutAlgorithm, type Link, type LinkPathAlgorithm, type LinkType, type MsgLoadGraph, type MsgType, type MsgUpdateLayoutAlgorithm, type MsgUpdateLinkPathAlgorithm, type MsgUpdateVisibleNodes, type Node, type NodeAttribute, type NodeAttributeScope, type NodeAttributeType, type NodePosition, type NodeStyle, type NodeTitle, type NodeType, type Theme, type TreeNode, ZConfig, ZConfigLinks, ZConfigLinksFilter, ZConfigLinksOptions, ZConfigNodes, ZConfigNodesFilter, ZConfigNodesOptions, ZExportFormat, ZGraph, ZLayoutAlgorithm, ZLink, ZLinkPathAlgorithm, ZLinkType, ZMsgLoadGraph, ZMsgType, ZMsgUpdateLayoutAlgorithm, ZMsgUpdateLinkPathAlgorithm, ZMsgUpdateVisibleNodes, ZNode, ZNodeAttribute, ZNodeAttributeScope, ZNodeAttributeType, ZNodeStyle, ZNodeTitle, ZNodeType, ZTheme, createConfig, createConfigLinks, createConfigLinksFilter, createConfigLinksOptions, createConfigNodes, createConfigNodesFilter, createConfigNodesOptions, createGraph, createLink, createMsgLoadGraph, createMsgUpdateLayoutAlgorithm, createMsgUpdateLinkPathAlgorithm, createMsgUpdateVisibleNodes, createNode, createNodeAttribute, createNodePosition, createNodeStyle, createNodeTitle, is, update, updateDeep, validate };
