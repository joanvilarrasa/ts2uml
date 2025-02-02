import { Filter } from 'lucide-react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { FilterToolByPath } from './filter-tool-by-path';
import { FilterToolByType } from './filter-tool-by-type';

export function FilterTool() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col">
          <div className="flex items-center justify-start">
            <h2>Filter</h2>
            <Filter />
          </div>

          <FilterToolByType />
          <FilterToolByPath />
        </div>
      </PopoverContent>
    </Popover>
  );
}
