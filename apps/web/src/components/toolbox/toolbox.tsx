import { Settings, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { FilterTool } from './filter-tool/filter-tool';
import { LayoutTool } from './layout-tool/layout-tool';

export function Toolbox() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-2 p-2">
        <FilterTool />
        <LayoutTool />
        {/* <Button variant="outline" size="icon">
          <LockKeyholeOpen />
        </Button> */}
        <Separator orientation="vertical" />
        <Button variant="outline" disabled>
          <SquareArrowOutUpRight />
          <span>Export (wip)</span>
        </Button>
        <Separator orientation="vertical" />
        <Button variant="outline" size="icon" disabled>
          <Settings />
        </Button>
      </CardContent>
    </Card>
  );
}
