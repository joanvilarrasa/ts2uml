import { CheckboxPartial } from '@/components/checkbox-partial';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ZGraph, createGraph, createMsgLoadGraph, is } from '@ts2uml/models';
import type { Graph } from '@ts2uml/models';
import { Download, Upload } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

export function ImportTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [applyLayout, setApplyLayout] = useState(false);

  // Handler for changes via the file input element.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        setSelectedFile(file);
      } else {
        toast.error('Invalid file', { style: { border: '1px solid hsl(var(--destructive))' } });
      }
    }
  };

  const handleConfirmImport = () => {
    if (!selectedFile) {
      toast.error('No file selected', { style: { border: '1px solid hsl(var(--destructive))' } });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonContent = JSON.parse(content);
        if (!is<Graph>(jsonContent, ZGraph)) {
          toast.error('Invalid file', { style: { border: '1px solid hsl(var(--destructive))' } });
          return;
        }

        const graph = createGraph(jsonContent);
        window.postMessage(createMsgLoadGraph({ graph, applyLayoutOnLoad: applyLayout }));
      } catch (_) {
        toast.error('Error importing diagram', { style: { border: '1px solid hsl(var(--destructive))' } });
      }
    };
    reader.readAsText(selectedFile);
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isOpen && 'bg-accent')}>
                <Download />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Import</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="flex min-w-64 flex-col border border-primary p-4" sideOffset={10}>
        <span className="text-xs">{'Select a JSON file: '}</span>
        <Separator className="mt-1 mb-2" orientation="horizontal" />

        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="import-diagram" type="file" accept=".json" onChange={handleFileChange} />
          </div>

          <Button variant="default" onClick={handleConfirmImport} disabled={!selectedFile}>
            <span className="font-medium">Import diagram</span>
            <Upload className="h-3 w-3" />
          </Button>

          <div className="flex items-center gap-2">
            <CheckboxPartial
              checked={applyLayout ? 'checked' : 'unchecked'}
              onClick={() => setApplyLayout(!applyLayout)}
            />
            <span className="text-xs">Apply layout on import</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
