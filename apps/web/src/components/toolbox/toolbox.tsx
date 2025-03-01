import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { DocsTool } from './docs-tool/docs-tool';
import { FilterTool } from './filter-tool/filter-tool';
import { ImportTool } from './import-tool/import-tool';
import { LayoutTool } from './layout-tool/layout-tool';
import { SaveTool } from './save-tool/save-tool';
import { ShareTool } from './share-tool/share-tool';
import ThemeToggle from './theme-toggle';

export function Toolbox() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-2 px-2 py-1">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <FilterTool />
            <LayoutTool />
          </div>
          <div className="flex justify-center">
            <span className="text-[0.7rem] text-foreground/60">Edit graph</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-14 bg-foreground/10" />
        <div className="flex flex-col items-center">
          <div className="flex items-center ">
            <ImportTool />
            <SaveTool />
            <ShareTool />
            <DocsTool />
          </div>
          <div className="flex justify-center">
            <span className="text-[0.7rem] text-foreground/60">Manage file</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-14 bg-foreground/10" />
        <div className="flex flex-col items-center">
          <div className="flex items-center ">
            <ThemeToggle />
          </div>
          <div className="flex justify-center">
            <span className="text-[0.7rem] text-foreground/60">Theme</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
