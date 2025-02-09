import { CheckboxPartial } from '@/components/checkbox-partial';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ZGraph, createGraph, createMsgLoadGraph, is } from '@ts2uml/models';
import type { Graph } from '@ts2uml/models';
import { Upload } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
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
      // Ensure the file is a JSON file by checking the MIME type or file extension.
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        setSelectedFile(file);
      } else {
        // TODO: Warn the user that the file is not a JSON file.
      }
    }
  };

  const handleConfirmImport = () => {
    if (!selectedFile) {
      // TODO: Warn the user that no file was selected.
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonContent = JSON.parse(content);
        if (!is<Graph>(jsonContent, ZGraph)) {
          // TODO: Warn the user that the file is not a valid graph.
          return;
        }

        const graph = createGraph(jsonContent);
        window.postMessage(createMsgLoadGraph({ graph, applyLayoutOnLoad: applyLayout }));
      } catch (_) {
        // TODO: Warn the user that an error occurred while importing the diagram.
      }
    };
    reader.readAsText(selectedFile);
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={isOpen ? 'bg-accent' : ''}>
          <Upload />
          <span>Import</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-64 flex-col border border-primary p-4" sideOffset={10}>
        <Button variant="default" onClick={handleConfirmImport} disabled={!selectedFile}>
          <span className="font-medium">Import diagram</span>
          <Upload className="h-3 w-3" />
        </Button>
        <span className="pt-2 text-xs">{'Select a JSON file: '}</span>
        <Separator className="mt-1 mb-2" orientation="horizontal" />

        <div className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="import-diagram" type="file" accept=".json" onChange={handleFileChange} />
          </div>

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
