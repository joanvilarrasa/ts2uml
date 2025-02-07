import { CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Collapsible } from '@/components/ui/collapsible';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '@/components/ui/radio-group';
import { GraphManager } from '@/lib/graph-manager';
import { type LayoutAlgorithm, ZLayoutAlgorithm, createMsgUpdateLayoutAlgorithm } from '@ts2uml/models';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function LayoutToolLayoutAlgorithm() {
  const gm: GraphManager = GraphManager.getInstance();

  const [layoutAlgorithm, setLayoutAlgorithm] = useState<LayoutAlgorithm>(gm.getGraph().config.layoutAlgorithm);

  const handleLayoutAlgorithmChange = (layoutAlgorithmNew: LayoutAlgorithm) => {
    gm.updateGraph({
      config: {
        layoutAlgorithm: layoutAlgorithmNew,
      },
    });

    setLayoutAlgorithm(layoutAlgorithmNew);
    window.postMessage(createMsgUpdateLayoutAlgorithm({ layoutAlgorithm: layoutAlgorithmNew }));
  };

  return (
    <Collapsible defaultOpen={true} className="flex flex-col items-start justify-start">
      <div className="flex w-full items-center justify-between">
        <span className="pb-1 text-xs">Layout algorithm</span>
        <CollapsibleTrigger asChild>
          <div className="chevron-right-collapsible-icon">
            <ChevronRight className="chevron-icon h-4 w-4" />
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="">
        <RadioGroup value={layoutAlgorithm} onValueChange={handleLayoutAlgorithmChange}>
          {ZLayoutAlgorithm.options.map((t) => (
            <div className="flex items-center justify-start gap-2" key={t}>
              <RadioGroupItem value={t} id={t} />
              <span className="text-sm">{t}</span>
            </div>
          ))}
        </RadioGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
