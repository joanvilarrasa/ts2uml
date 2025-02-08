import { type Graph, createMsgLoadGraph } from '@ts2uml/models';
import { Settings, SquareArrowOutUpRight } from 'lucide-react';
import demoGraph from '../../assets/demo-graph.json';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { FilterTool } from './filter-tool/filter-tool';
import { LayoutTool } from './layout-tool/layout-tool';

export function Toolbox() {
  function loadGraph() {
    window.postMessage(createMsgLoadGraph({ graph: demoGraph as Graph }));
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-2 p-2">
        <FilterTool />
        <LayoutTool />
        {/* <Button variant="outline" size="icon">
          <LockKeyholeOpen />
        </Button> */}
        <Separator orientation="vertical" />
        <Button variant="outline" disabled onClick={loadGraph}>
          <SquareArrowOutUpRight />
          <span>Export</span>
        </Button>
        <Separator orientation="vertical" />
        <Button variant="outline" size="icon" disabled>
          <Settings />
        </Button>
      </CardContent>
    </Card>
  );
}
