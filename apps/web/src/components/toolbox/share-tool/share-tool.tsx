import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GraphManager } from '@/lib/graph-manager';
import { LinkManager } from '@/lib/link-manager';
import { cn } from '@/lib/utils';
import { ts2umlToJson } from '@ts2uml/core/src/export/ts2uml-to-json';
import { Clipboard, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';

export function ShareTool() {
  const gm: GraphManager = GraphManager.getInstance();
  const linkManager: LinkManager = LinkManager.getInstance();
  const [isOpen, setIsOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [link, setLink] = useState('');

  async function handleShareClick() {
    setIsOpen(true);
    const loaderToastId = toast.loading('Creating new link...');
    setIsLinkCopied(false);
    const linkContent = ts2umlToJson(gm.getGraph());
    const newLink = await linkManager.createNewLink(linkContent);
    toast.dismiss(loaderToastId);
    if (newLink) {
      setLink(newLink);
      setIsOpen(true);
    } else {
      toast.error('Failed to create the link', { style: { border: '1px solid hsl(var(--destructive))' } });
    }
  }

  async function updatePastebinData() {
    const loaderToastId = toast.loading('Copying link to clipboard...');
    const linkCopiedSuccessfully = await linkManager.copyLinkToClipboard(link);
    toast.dismiss(loaderToastId);
    if (linkCopiedSuccessfully) {
      toast.success('Link copied to clipboard!', { style: { border: '1px solid hsl(var(--primary))' } });
      setIsLinkCopied(true);
    } else {
      toast.error('Failed to copy the link to clipboard', { style: { border: '1px solid hsl(var(--destructive))' } });
    }
  }

  useEffect(() => {
    if (!isOpen && !isLinkCopied) {
      linkManager.deleteLink();
    }
  }, [isOpen, isLinkCopied]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(isOpen && 'bg-accent')}
                onClick={(e) => {
                  e.preventDefault();
                  handleShareClick();
                }}
              >
                <Share2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Share</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="flex min-w-64 flex-col border border-primary">
        <DialogTitle className="flex items-end gap-2 border-foreground/50 border-b pb-1 text-sm">
          <span className="text-sm">{'Share the link!'}</span>
          <span className="text-foreground/50 text-xs">{'(Expires in 24h)'}</span>
        </DialogTitle>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <DialogDescription className="flex flex-grow items-center justify-start border border-foreground/50 p-2 text-foreground/70 text-xs">{`ts2uml.com?id=${link}`}</DialogDescription>
            <div className="flex gap-2">
              <Button variant="default" className="flex-grow" onClick={() => updatePastebinData()}>
                <span className="font-medium">Copy</span>
                <Clipboard className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
