import { CheckboxPartial } from '@/components/checkbox-partial';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Collapsible } from '@/components/ui/collapsible';
import { GraphManager } from '@/lib/graph-manager';
import {
  type CheckboxPartialCheckedStatus,
  type NodeType,
  ZNodeType,
  createMsgUpdateVisibleNodes,
} from '@ts2uml/models';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function FilterToolByType() {
  const gm: GraphManager = GraphManager.getInstance();
  function getCheckedStatus(type: NodeType) {
    return gm.getGraph().config.nodes.filter.filter_type.includes(type) ? 'unchecked' : 'checked';
  }

  const [checkedStatusByType, setCheckedStatusByType] = useState<Record<NodeType, CheckboxPartialCheckedStatus>>({
    class: getCheckedStatus('class'),
    union: getCheckedStatus('union'),
    interface: getCheckedStatus('interface'),
    type: getCheckedStatus('type'),
    variable: getCheckedStatus('variable'),
  });

  function updateCheckedStatusByType() {
    setCheckedStatusByType({
      class: getCheckedStatus('class'),
      union: getCheckedStatus('union'),
      interface: getCheckedStatus('interface'),
      type: getCheckedStatus('type'),
      variable: getCheckedStatus('variable'),
    });
  }

  function handleFilterTypeChange(type: NodeType) {
    let filterByType = gm.getGraph().config.nodes.filter.filter_type;
    let nodeIdsToAdd: string[] = [];
    let nodeIdsToRemove: string[] = [];
    if (filterByType.includes(type)) {
      nodeIdsToAdd = getNodeIdsByType(type);
      filterByType = filterByType.filter((t) => t !== type);
    } else {
      nodeIdsToRemove = getNodeIdsByType(type);
      filterByType.push(type);
    }

    gm.updateGraph({
      config: {
        nodes: {
          filter: {
            filter_type: filterByType,
          },
        },
      },
    });

    updateCheckedStatusByType();
    window.postMessage(createMsgUpdateVisibleNodes({ nodeIdsToAdd, nodeIdsToRemove }));
  }

  function getNodeIdsByType(type: NodeType) {
    const nodeIds: string[] = [];
    for (const node of gm.getGraph().nodes) {
      if (node.type === type) {
        nodeIds.push(node.id);
      }
    }
    return nodeIds;
  }

  return (
    <Collapsible defaultOpen={true} className="flex flex-col items-start justify-start">
      <div className="flex w-full items-center justify-between">
        <span className="pb-1 text-xs">By type</span>
        <CollapsibleTrigger asChild>
          <div className="chevron-right-collapsible-icon">
            <ChevronRight className="chevron-icon h-4 w-4" />
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="">
        {ZNodeType.options.map((t) => (
          <div key={t} className="flex items-center justify-start gap-1">
            <CheckboxPartial checked={checkedStatusByType[t]} onClick={() => handleFilterTypeChange(t)} />
            <span className="text-sm">{t}</span>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
