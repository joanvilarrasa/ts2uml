import { NODE_ATTRIBUTE_HEIGHT } from '@/lib/constants';
import type { Node } from '@ts2uml/models';
import {
  Handle as RF_Handle,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  Position as RF_Position,
} from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export function UnionNodeComponent(props: RF_NodeProps<RF_Node<{ data: Node }>>) {
  const node = props.data.data;
  const title = props.data.data.title;
  const attributes = props.data.data.attributes;

  return (
    <Card>
      <div className="flex flex-col bg-union/40 p-1">
        <CardHeader>
          <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
          <CardTitle>{title.text}</CardTitle>
        </CardHeader>
        <CardContent className="bg-card">
          {attributes.map((attribute, index) => (
            <div
              key={`${node.id}-${index}`}
              className="flex items-center justify-start px-4"
              style={{ height: NODE_ATTRIBUTE_HEIGHT }}
            >
              <p>{attribute.text}</p>
            </div>
          ))}
        </CardContent>
      </div>
      <RF_Handle type="source" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
      <RF_Handle type="target" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
    </Card>
  );
}
