// Define possible types for relationship filters
export type LinkType = "inheritance" | "association" | "aggregation" | "composition" | "dependency" | "realization";
export const LinkTypeList: LinkType[] = ["inheritance", "association", "aggregation", "composition", "dependency", "realization"];

export type Link = {
    sourceId: string;
    sourcePortId?: string;
    targetId: string;
    targetPortId?: string;
    type: LinkType;
    text?: string;
};

export function newLink(data?: Partial<Link>): Link {
    return {
        sourceId: data?.sourceId ?? "",
        sourcePortId: data?.sourcePortId ?? undefined,
        targetId: data?.targetId ?? "",
        targetPortId: data?.targetPortId ?? undefined,
        type: data?.type ?? "association",
        text: data?.text ?? undefined,
    };
}