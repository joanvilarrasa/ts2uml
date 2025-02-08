import { NODE_ATTRIBUTE_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Node } from '@ts2uml/models';
import {
  Handle as RF_Handle,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  Position as RF_Position,
} from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export function ClassNodeComponent(props: RF_NodeProps<RF_Node<{ data: Node }>>) {
  const node = props.data.data;
  const title = props.data.data.title;
  const attributes = props.data.data.attributes.filter((attribute) => attribute.type === 'attribute');
  const methods = props.data.data.attributes.filter((attribute) => attribute.type === 'method');
  const hasAttributes = attributes.length > 0;
  const hasMethods = methods.length > 0;

  return (
    <Card>
      <CardHeader className="bg-class">
        <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
        <CardTitle>{title.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasAttributes && (
          <div
            key={`${node.id}-ATTRIBUTES-TITLE`}
            className={cn('flex items-center justify-start border-border/10 border-b px-4')}
            style={{ height: NODE_ATTRIBUTE_HEIGHT }}
          >
            <span className="font-bold text-sm">Attributes</span>
          </div>
        )}
        {attributes.map((attribute, index) => (
          <div
            key={`${node.id}-${index}`}
            className={cn(
              'flex items-center justify-start border-border/10 border-b px-4',
              index === attributes.length - 1 && 'border-border'
            )}
            style={{ height: NODE_ATTRIBUTE_HEIGHT }}
          >
            <p>{attribute.text}</p>
          </div>
        ))}
        {hasMethods && (
          <div
            key={`${node.id}-METHODS-TITLE`}
            className={cn('flex items-center justify-start border-border/10 border-b px-4')}
            style={{ height: NODE_ATTRIBUTE_HEIGHT }}
          >
            <span className="font-bold text-sm">Methods</span>
          </div>
        )}
        {methods.map((method, index) => (
          <div
            key={`${node.id}-${attributes.length + index}`}
            className={cn('flex items-center justify-start border-border/10 border-b px-4')}
            style={{ height: NODE_ATTRIBUTE_HEIGHT }}
          >
            <p>{method.text}</p>
          </div>
        ))}
      </CardContent>
      <RF_Handle type="source" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
      <RF_Handle type="target" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
    </Card>
  );
}
