import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup } from '@/components/ui/radio-group';
import { GraphManager } from '@/lib/graph-manager';
import { type LayoutAlgorithm, ZLayoutAlgorithm, createMsgUpdateLayoutAlgorithm } from '@ts2uml/models';
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
    <div className="flex flex-col items-start justify-start gap-2">
      <span className="text-xs">Layout algorithm</span>
      <div className="flex flex-col items-start justify-start">
        <RadioGroup value={layoutAlgorithm} onValueChange={handleLayoutAlgorithmChange}>
          {ZLayoutAlgorithm.options.map((t) => (
            <div className="flex items-center justify-start gap-2" key={t}>
              <RadioGroupItem value={t} id={t} />
              <span className="text-sm">{t}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
