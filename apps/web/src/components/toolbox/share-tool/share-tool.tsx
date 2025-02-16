import { Separator } from '@/components/ui/separator';
import { GraphManager } from '@/lib/graph-manager';
import { LinkManager } from '@/lib/link-manager';
import { cn } from '@/lib/utils';
import { ts2umlToJson } from '@ts2uml/core/src/export/ts2uml-to-json';
import { Clipboard, RefreshCcw, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export function ShareTool() {
  const gm: GraphManager = GraphManager.getInstance();
  const linkManager: LinkManager = LinkManager.getInstance();
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');

  async function handleRefresh() {
    await linkManager.refreshLink();
    setLink(linkManager.getLink());
  }

  async function updatePastebinData() {
    const newContent = ts2umlToJson(gm.getGraph());
    await linkManager.updateLinkData(newContent);
    linkManager.copyLink(link);
  }

  useEffect(() => {
    if (isOpen) {
      setLink(linkManager.getLink());
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(isOpen && 'bg-accent')}>
          <Share2 />
          <span>Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-64 flex-col border border-primary" sideOffset={10}>
        <div className="flex flex-col">
          <span className="pt-2 text-xs">{'This link will expire in 24 hours: '}</span>
          <Separator className="mt-1 mb-2" orientation="horizontal" />
          <div className="flex gap-2">
            <div className="flex flex-grow items-center justify-center border border-border px-2">
              <span className="text-xs">{`ts2uml.com?id=${link}`}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="default" className="flex-grow" onClick={() => updatePastebinData()}>
                <span className="font-medium">Copy</span>
                <Clipboard className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="w-9" onClick={() => handleRefresh()}>
                <RefreshCcw />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
