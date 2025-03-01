import { CheckboxPartial } from '@/components/checkbox-partial';
import { GraphManager } from '@/lib/graph-manager';
import {
  type CheckboxPartialCheckedStatus,
  type NodeType,
  ZNodeType,
  createMsgUpdateVisibleNodes,
} from '@ts2uml/models';
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
    if (filterByType.includes(type)) {
      filterByType = filterByType.filter((t) => t !== type);
    } else {
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
    window.postMessage(createMsgUpdateVisibleNodes());
  }

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <span className="text-xs">By type</span>
      <div className="">
        {ZNodeType.options.map((t) => (
          <div key={t} className="flex items-center justify-start gap-1">
            <CheckboxPartial checked={checkedStatusByType[t]} onClick={() => handleFilterTypeChange(t)} />
            <span className="text-sm">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
