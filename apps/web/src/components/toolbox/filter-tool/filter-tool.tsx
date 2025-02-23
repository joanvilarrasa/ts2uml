import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { FilterToolByPath } from './filter-tool-by-path';
import { FilterToolByType } from './filter-tool-by-type';

export function FilterTool() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isOpen && 'bg-accent')}>
                <Filter />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Filter</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="flex min-h-80 min-w-64 flex-col border border-primary" sideOffset={10}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-medium">Filter nodes</span>
            <Filter className="h-3 w-3" />
          </div>
          <Separator className="mt-1 mb-2" orientation="horizontal" />

          <FilterToolByType />
          <Separator className="mt-1 mb-2 bg-border/20" orientation="horizontal" />
          <FilterToolByPath />
        </div>
      </PopoverContent>
    </Popover>
  );
}
