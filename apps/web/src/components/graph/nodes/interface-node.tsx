import { NODE_ATTRIBUTE_HEIGHT } from '@/lib/constants';
import type { Node } from '@ts2uml/models';
import {
  Handle as RF_Handle,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  Position as RF_Position,
} from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

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
          <div
            key={`${node.id}-${index}`}
            className="flex items-center justify-start border-border/10 border-b px-4"
            style={{ height: NODE_ATTRIBUTE_HEIGHT }}
          >
            <p>{attribute.text}</p>
          </div>
        ))}
      </CardContent>
      <RF_Handle type="source" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
      <RF_Handle type="target" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
    </Card>
  );
}
