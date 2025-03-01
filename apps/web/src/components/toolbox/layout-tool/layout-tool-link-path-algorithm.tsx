import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '@/components/ui/radio-group';
import { GraphManager } from '@/lib/graph-manager';
import { type LinkPathAlgorithm, ZLinkPathAlgorithm, createMsgUpdateLinkPathAlgorithm } from '@ts2uml/models';
import { ChevronLeft, Slash, Spline } from 'lucide-react';
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
    <div className="flex flex-col items-start justify-start gap-2">
      <span className="text-xs">Link path algorithm</span>
      <div className="flex flex-col items-start justify-start">
        <RadioGroup value={linkPathAlgorithm} onValueChange={handleLinkPathAlgorithmChange}>
          {ZLinkPathAlgorithm.options.map((t) => (
            <div className="flex items-center justify-start gap-2" key={t}>
              <RadioGroupItem value={t} id={t} />
              {t === 'straight' && <Slash className="h-4 w-4" />}
              {t === 'bezier' && <Spline className="h-4 w-4" />}
              {t === 'step' && <ChevronLeft className="h-4 w-4 rotate-45" />}
              <span className="text-sm">{t}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
