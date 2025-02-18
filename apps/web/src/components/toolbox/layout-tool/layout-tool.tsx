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
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className={cn(isOpen && 'bg-accent')}>
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
          <Separator className="mt-1 mb-2" orientation="horizontal" />

          {/* <div>Button to refresh the layout</div> */}
          <LayoutToolLayoutAlgorithm />
          <Separator className="mt-1 mb-2 bg-border/20" orientation="horizontal" />
          <LayoutToolLinkPathAlgorithm />
        </div>
      </PopoverContent>
    </Popover>
  );
}
