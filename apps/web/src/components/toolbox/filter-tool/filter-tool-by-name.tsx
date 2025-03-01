import { Input } from '@/components/ui/input';
import { GraphManager } from '@/lib/graph-manager';
import { createMsgUpdateVisibleNodes } from '@ts2uml/models';
import { useState } from 'react';

export function FilterToolByName() {
  const gm: GraphManager = GraphManager.getInstance();

  function getValue(type: 'starts_with' | 'ends_with' | 'includes') {
    return gm.getGraph().config.nodes.filter.filter_name[type];
  }

  const [startsWithFilter, setStartsWithFilter] = useState(getValue('starts_with'));
  const [endsWithFilter, setEndsWithFilter] = useState(getValue('ends_with'));
  const [includesFilter, setIncludesFilter] = useState(getValue('includes'));

  function handleInputChange(type: 'starts_with' | 'ends_with' | 'includes', value: string) {
    if (type === 'starts_with') {
      setStartsWithFilter(value);
    } else if (type === 'ends_with') {
      setEndsWithFilter(value);
    } else if (type === 'includes') {
      setIncludesFilter(value);
    }

    const newFilterName = {
      starts_with: type === 'starts_with' ? value : startsWithFilter,
      ends_with: type === 'ends_with' ? value : endsWithFilter,
      includes: type === 'includes' ? value : includesFilter,
    };

    gm.updateGraph({
      config: {
        nodes: {
          filter: {
            filter_name: newFilterName,
          },
        },
      },
    });
    window.postMessage(createMsgUpdateVisibleNodes());
  }

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <span className=" text-xs">By name</span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-xs">{'Starts with:'}</span>
          <div className="flex items-center justify-start gap-1">
            <Input
              className="h-6 w-28"
              type="text"
              placeholder="Something"
              value={startsWithFilter}
              onChange={(e) => handleInputChange('starts_with', e.target.value)}
            />
            <span className="text-foreground/20 text-xs">{'...'}</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-xs">{'Ends with:'}</span>
          <div className="flex items-center justify-start gap-1">
            <Input
              className="h-6 w-28"
              type="text"
              placeholder="Something"
              value={endsWithFilter}
              onChange={(e) => handleInputChange('ends_with', e.target.value)}
            />
            <span className="text-foreground/20 text-xs">{'...'}</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-xs">{'Includes:'}</span>
          <div className="flex items-center justify-start gap-1">
            <span className="text-foreground/20 text-xs">{'...'}</span>
            <Input
              className="h-6 w-28"
              type="text"
              placeholder="Something"
              value={includesFilter}
              onChange={(e) => handleInputChange('includes', e.target.value)}
            />
            <span className="text-foreground/20 text-xs">{'...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
