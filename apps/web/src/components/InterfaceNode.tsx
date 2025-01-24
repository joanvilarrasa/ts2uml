import { NODE_ATTRIBUTE_HEIGHT, NODE_TITLE_HEIGHT } from '@/lib/constants';
import type { Node } from '@ts2uml/models';
import { Handle as RF_Handle, type Node as RF_Node, type NodeProps as RF_NodeProps, Position as RF_Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

function getAttributeTop(index: number) {
  return NODE_TITLE_HEIGHT + index * NODE_ATTRIBUTE_HEIGHT + NODE_ATTRIBUTE_HEIGHT / 2;
}

export function InterfaceNodeComponent(props: RF_NodeProps<RF_Node<{ data: Node }>>) {
  const node = props.data.data;
  const title = props.data.data.title;
  const attributes = props.data.data.attributes;

  return (
    <Card>
      <CardHeader className="bg-interface">
        <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
        <CardTitle>{title.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {attributes.map((attribute, index) => (
          <div key={`${node.id}-${index}`} className="flex items-center justify-start" style={{ height: NODE_ATTRIBUTE_HEIGHT }}>
            <p>{attribute.text}</p>
            <RF_Handle
              type="source"
              position={RF_Position.Left}
              style={{ top: getAttributeTop(index) }}
              id={`${node.id}-${index}-${RF_Position.Right}`}
            />
            <RF_Handle
              type="source"
              position={RF_Position.Right}
              style={{ top: getAttributeTop(index) }}
              id={`${node.id}-${index}-${RF_Position.Left}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
