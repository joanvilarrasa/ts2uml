import { type Graph, createMsgLoadGraph } from '@ts2uml/models';
import { Settings } from 'lucide-react';
import demoGraph from '../../assets/demo-graph.json';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { FilterTool } from './filter-tool/filter-tool';
import { ImportTool } from './import-tool/import-tool';
import { LayoutTool } from './layout-tool/layout-tool';
import { SaveTool } from './save-tool/save-tool';
import { ShareTool } from './share-tool/share-tool';
import ThemeToggle from './theme-toggle';

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
        <Separator orientation="vertical" className="h-4 bg-border/20" />
        <ImportTool />
        <SaveTool />
        <ShareTool />
        <Separator orientation="vertical" className="h-4 bg-border/20" />
        <Button variant="outline" size="icon" disabled={true} onClick={loadGraph}>
          <Settings />
        </Button>
        <ThemeToggle />
      </CardContent>
    </Card>
  );
}
