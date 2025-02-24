import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Node, createMsgOpenNodeCode } from "@ts2uml/models";
import { CodeXml, EllipsisVertical } from "lucide-react";

export function OpenNodeCodeButton(props: { node: Node }) {
    const handleClick = () => {
        window.postMessage(createMsgOpenNodeCode({ node: props.node }));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-transparent"
                >
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48">
                <DropdownMenuItem
                    onClick={handleClick}
                    className="flex items-center gap-2"
                >
                    <CodeXml className="h-4 w-4" />
                    <span>View source code</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
