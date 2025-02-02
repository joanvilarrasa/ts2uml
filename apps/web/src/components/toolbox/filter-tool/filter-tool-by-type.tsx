import { useGraph } from '@/contexts/graph-context';
import { type NodeType, ZNodeType } from '@ts2uml/models';
import { Checkbox } from '../../ui/checkbox';

export function FilterToolByType() {
  const { graph, updateGraph } = useGraph();

  const handleFilterTypeChange = (type: NodeType) => {
    let filterByType = graph.config.nodes.filter.filter_type;
    if (filterByType.includes(type)) {
      filterByType = filterByType.filter((t) => t !== type);
    } else {
      filterByType.push(type);
    }

    updateGraph({
      config: {
        nodes: {
          filter: {
            filter_type: filterByType,
          },
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <span className="text-xs">By type</span>
      {ZNodeType.options.map((t) => (
        <div key={t} className="flex items-center justify-start">
          <Checkbox
            checked={!graph.config.nodes.filter.filter_type.includes(t)}
            onClick={() => handleFilterTypeChange(t)}
          />
          <span className="text-sm">{t}</span>
        </div>
      ))}
    </div>
  );
}
