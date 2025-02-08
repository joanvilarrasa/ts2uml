import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { EXPORT_IMAGE_HEIGHT } from '@/lib/constants';
import { EXPORT_IMAGE_WIDTH } from '@/lib/constants';
import { cn, dataURLToBlob } from '@/lib/utils';
import { ts2umlToJson } from '@ts2uml/core/src/export/ts2uml-to-json';
import { type ExportFormat, ZExportFormat } from '@ts2uml/models';
import { getViewportForBounds } from '@xyflow/react';
import { getNodesBounds } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { Clipboard, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { GraphManager } from '../../../lib/graph-manager';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export function ExportTool() {
  const gm: GraphManager = GraphManager.getInstance();
  const { getNodes } = useReactFlow();
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const exportFormatFileOptions = ZExportFormat.extract(['json']);
  const exportFormatImageOptions = ZExportFormat.extract(['png', 'png-transparent']);

  async function handleExport(target: 'download' | 'clipboard') {
    if (exportFormat === 'json') {
      const content = ts2umlToJson(gm.getGraph());
      if (target === 'download') {
        exportJson(content);
      } else {
        clipboardJson(content);
      }
    } else if (exportFormat === 'png') {
      const content = await toPngImage(true);
      if (target === 'download') {
        exportPng(content);
      } else {
        clipboardPng(content);
      }
    } else if (exportFormat === 'png-transparent') {
      const content = await toPngImage();
      if (target === 'download') {
        exportPng(content);
      } else {
        clipboardPng(content);
      }
    }
  }

  function exportJson(content: string) {
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(content)}`;
    const a = document.createElement('a');
    a.setAttribute('download', 'ts2uml.json');
    a.setAttribute('href', dataUri);
    a.click();
  }
  function clipboardJson(content: string) {
    navigator.clipboard.writeText(content);
  }

  function exportPng(dataUrl: string) {
    const a = document.createElement('a');
    a.setAttribute('download', 'ts2uml.png');
    a.setAttribute('href', dataUrl);
    a.click();
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

  async function toPngImage(withBackground?: boolean): Promise<string> {
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
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(isOpen && 'bg-accent')}>
          <SquareArrowOutUpRight />
          <span>Export</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-64 flex-col border border-primary" sideOffset={10}>
        <div className="flex flex-col">
          <div className="flex w-full gap-2">
            <Button variant="default" className="flex-grow" onClick={() => handleExport('download')}>
              <span className="font-medium">Export diagram</span>
              <SquareArrowOutUpRight className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleExport('clipboard')}>
              <Clipboard className="h-3 w-3" />
            </Button>
          </div>

          <span className="pt-2 text-xs">{'Choose a format: '}</span>
          <Separator className="mt-1 mb-2" orientation="horizontal" />

          <RadioGroup value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
            <span className="text-xs">{'Image'}</span>
            <div className="flex flex-col gap-2">
              {exportFormatImageOptions.options.map((t) => (
                <div className="flex items-center justify-start gap-2" key={t}>
                  <RadioGroupItem value={t} id={t} />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
            <span className="text-xs">{'File'}</span>
            <div className="flex flex-col gap-2">
              {exportFormatFileOptions.options.map((t) => (
                <div className="flex items-center justify-start gap-2" key={t}>
                  <RadioGroupItem value={t} id={t} />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
