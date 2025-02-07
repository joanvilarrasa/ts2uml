import { CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Collapsible } from '@/components/ui/collapsible';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '@/components/ui/radio-group';
import { GraphManager } from '@/lib/graph-manager';
import { type LinkPathAlgorithm, ZLinkPathAlgorithm, createMsgUpdateLinkPathAlgorithm } from '@ts2uml/models';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function LayoutToolLinkPathAlgorithm() {
  const gm: GraphManager = GraphManager.getInstance();

  const [linkPathAlgorithm, setLinkPathAlgorithm] = useState<LinkPathAlgorithm>(
    gm.getGraph().config.links.linkPathAlgorithm
  );

  const handleLinkPathAlgorithmChange = (linkPathAlgorithmNew: LinkPathAlgorithm) => {
    gm.updateGraph({
      config: {
        links: {
          linkPathAlgorithm: linkPathAlgorithmNew,
        },
      },
    });

    setLinkPathAlgorithm(linkPathAlgorithmNew);
    window.postMessage(createMsgUpdateLinkPathAlgorithm({ linkPathAlgorithm: linkPathAlgorithmNew }));
  };

  return (
    <Collapsible defaultOpen={true} className="flex flex-col items-start justify-start">
      <div className="flex w-full items-center justify-between">
        <span className="pb-1 text-xs">Link path algorithm</span>
        <CollapsibleTrigger asChild>
          <div className="chevron-right-collapsible-icon">
            <ChevronRight className="chevron-icon h-4 w-4" />
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="">
        <RadioGroup value={linkPathAlgorithm} onValueChange={handleLinkPathAlgorithmChange}>
          {ZLinkPathAlgorithm.options.map((t) => (
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
