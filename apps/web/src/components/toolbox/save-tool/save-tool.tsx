import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { cn, dataURLToBlob } from '@/lib/utils';
import { ts2umlToExcalidraw } from '@ts2uml/core/src/export/ts2uml-to-excalidraw';
import { ts2umlToJson } from '@ts2uml/core/src/export/ts2uml-to-json';
import { EXPORT_IMAGE_HEIGHT, EXPORT_IMAGE_WIDTH } from '@ts2uml/models';
import { getViewportForBounds } from '@xyflow/react';
import { getNodesBounds } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { Clipboard, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { GraphManager } from '../../../lib/graph-manager';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export function SaveTool() {
  type ExportFormat = 'png' | 'png-transparent' | 'json' | 'excalidraw';
  const gm: GraphManager = GraphManager.getInstance();
  const { getNodes } = useReactFlow();
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [exportName, setExportName] = useState('');

  async function handleExport(target: 'download' | 'clipboard') {
    const actualExportName = exportName === '' ? 'ts2uml' : exportName;
    gm.updateNodePositions(getNodes());

    if (exportFormat === 'json' || exportFormat === 'excalidraw') {
      await exportJson(actualExportName, target);
    } else if (exportFormat === 'png' || exportFormat === 'png-transparent') {
      await exportPng(actualExportName, target);
    }
  }

  async function exportJson(name: string, target: 'download' | 'clipboard') {
    const content = exportFormat === 'json' ? ts2umlToJson(gm.getGraph()) : ts2umlToExcalidraw(gm.getGraph());
    if (target === 'download') {
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(content)}`;
      const a = document.createElement('a');
      a.setAttribute('download', `${name}.json`);
      a.setAttribute('href', dataUri);
      a.click();
    } else {
      const loaderToastId = toast.loading('Copying JSON to clipboard...');
      await navigator.clipboard.writeText(content);
      toast.dismiss(loaderToastId);
      toast.success('JSON copied to clipboard!', { style: { border: '1px solid hsl(var(--primary))' } });
    }
  }

  async function exportPng(name: string, target: 'download' | 'clipboard') {
    const loaderToastId = toast.loading('Generating PNG...');
    const content = await ts2uml2Png(exportFormat === 'png');
    toast.dismiss(loaderToastId);
    if (target === 'download') {
      const a = document.createElement('a');
      a.setAttribute('download', `${name}.png`);
      a.setAttribute('href', content);
      a.click();
    } else {
      await clipboardPng(content);
      toast.success('PNG copied to clipboard!', { style: { border: '1px solid hsl(var(--primary))' } });
    }
  }

  async function clipboardPng(dataUrl: string) {
    const blob = dataURLToBlob(dataUrl);
    try {
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
    } catch (_) {
      // Do nothing
    }
  }

  async function ts2uml2Png(withBackground?: boolean): Promise<string> {
    const nodesBounds = getNodesBounds(getNodes().filter((n) => !n.hidden));
    const viewport = getViewportForBounds(nodesBounds, EXPORT_IMAGE_WIDTH, EXPORT_IMAGE_HEIGHT, 0.1, 10, 0);

    const options: { [key: string]: unknown } = {
      backgroundColor: withBackground ? 'hsl(var(--background))' : 'transparent',
      width: EXPORT_IMAGE_WIDTH,
      height: EXPORT_IMAGE_HEIGHT,
      style: {
        width: `${EXPORT_IMAGE_WIDTH}px`,
        height: `${EXPORT_IMAGE_HEIGHT}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    };
    const element = document.querySelector('.react-flow__viewport') as HTMLElement;
    const dataUrl = await toPng(element, options);
    return dataUrl;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isOpen && 'bg-accent')}>
                <Save />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Save</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="flex min-w-64 flex-col border border-primary" sideOffset={10}>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <div className="relative">
              <Input
                className="h-9"
                type="text"
                placeholder="ts2uml"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                .{exportFormat.includes('png') ? 'png' : 'json'}
              </span>
            </div>
            <Button variant="default" className="flex-grow" onClick={() => handleExport('download')}>
              <span className="font-medium">Save</span>
              <Save className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleExport('clipboard')}>
              <Clipboard className="h-3 w-3" />
            </Button>
          </div>

          <span className="pt-4 text-xs">{'Choose a format: '}</span>
          <Separator className="mt-1 mb-2 bg-foreground/10" orientation="horizontal" />

          <RadioGroup value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs">{'Image'}</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem value={'png'} />
                    <span className="text-sm">{'png'}</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem value={'png-transparent'} />
                    <span className="text-sm">{'png-transparent'}</span>
                  </div>
                </div>
              </div>
              <Separator className="h-11/12 bg-foreground/10" orientation="vertical" />
              <div className="flex flex-col gap-2">
                <span className="text-xs">{'JSON'}</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem value={'json'} />
                    <span className="text-sm">{'ts2uml'}</span>
                  </div>
                  {/* This is work in progress */}
                  {/* <div className="flex items-center justify-start gap-2">
                    <RadioGroupItem value={'excalidraw'} />
                    <span className="text-sm">{'excalidraw'}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
