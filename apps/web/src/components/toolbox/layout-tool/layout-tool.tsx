import { Separator } from '@/components/ui/separator';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Workflow } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { LayoutToolLayoutAlgorithm } from './layout-tool-layout-algorithm';
import { LayoutToolLinkPathAlgorithm } from './layout-tool-link-path-algorithm';

export function LayoutTool() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isOpen && 'bg-accent')}>
                <Workflow />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Layout</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="flex min-w-64 flex-col border border-primary" sideOffset={10}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-medium">Layout configuration</span>
            <Workflow className="h-3 w-3" />
          </div>
          <Separator className="mt-1 mb-2 bg-foreground/20" orientation="horizontal" />
          <div className="flex gap-4">
            <LayoutToolLayoutAlgorithm />
            <Separator className="h-44 bg-foreground/10" orientation="vertical" />
            <LayoutToolLinkPathAlgorithm />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
