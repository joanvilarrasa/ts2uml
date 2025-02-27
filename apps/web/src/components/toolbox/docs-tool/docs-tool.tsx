import { CheckboxPartial } from '@/components/checkbox-partial';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GraphManager } from '@/lib/graph-manager';
import { generateDocs } from '@ts2uml/core/src/docs/generate-docs';
import { Clipboard, FileText, ListTree, SquarePen, TableProperties } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { DocsToolMarkdown } from './docs-tool-markdown';

export function DocsTool() {
    const gm: GraphManager = GraphManager.getInstance();
    const [includeAttributes, setIncludeAttributes] = useState(true);
    const [includeTOC, setIncludeTOC] = useState(true);
    const [docsContent, setDocsContent] = useState<string>('');

    function handleGenerateDocs() {
        try {
            const currentGraph = gm.getGraph();
            const docs = generateDocs({
                graph: currentGraph,
                includeAttributes,
                includeTOC
            });
            setDocsContent(docs);
            toast.success('Documentation generated successfully');
        } catch (_) {
            toast.error('Failed to generate documentation');
        }
    };

    function handleCopyDocs() {
        navigator.clipboard.writeText(docsContent);
        toast.success('Documentation copied to clipboard');
    }

    return (
        <Sheet>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <FileText />
                            </Button>
                        </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Generate Docs</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <SheetContent className="w-[900px] sm:max-w-[900px]">
                <SheetHeader>
                    <SheetTitle className='flex w-full flex-col items-start justify-center gap-2'>
                        <span className="">{'Documentation'}</span>
                        <Separator orientation="horizontal" className="bg-foreground/10" />
                        <div className="flex w-full flex-col items-start gap-2">
                            <div className='flex w-full flex-col gap-2'>
                                <span className='text-muted-foreground text-xs'>
                                    {"Configure:"}
                                </span>
                                <div className="flex items-center gap-2 pb-2">
                                    <CheckboxPartial
                                        checked={includeTOC ? 'checked' : 'unchecked'}
                                        onClick={() => setIncludeTOC(!includeTOC)}
                                    />
                                    <ListTree className="h-4 w-4" />
                                    <span className="text-xs">Include Table of Contents</span>
                                </div>
                                <div className="flex items-center gap-2 pb-2">
                                    <CheckboxPartial
                                        checked={includeAttributes ? 'checked' : 'unchecked'}
                                        onClick={() => setIncludeAttributes(!includeAttributes)}
                                    />
                                    <TableProperties className="h-4 w-4" />
                                    <span className="text-xs">Include Attributes</span>
                                </div>
                            </div>
                            <Separator orientation="horizontal" className="bg-foreground/10" />
                            <div className="flex flex-col gap-2">
                                <span className='text-muted-foreground text-xs'>
                                    {"Generate:"}
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="default" onClick={handleGenerateDocs}>
                                        <span className="font-medium">Generate</span>
                                        <SquarePen />
                                    </Button>
                                    <Button variant="outline" onClick={handleCopyDocs}>
                                        <span className="font-medium">Copy</span>
                                        <Clipboard />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription className='mt-4 h-[calc(100vh-250px)]'>
                    {docsContent ? (
                        <DocsToolMarkdown content={docsContent} />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>Generate documentation to see it here</p>
                        </div>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
