import { HoverManager } from '@/lib/hover-manager';
import { cn } from '@/lib/utils';
import { NODE_ATTRIBUTE_HEIGHT, type Node } from '@ts2uml/models';
import {
  Handle as RF_Handle,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  Position as RF_Position,
} from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { OpenNodeCodeButton } from './open-node-code';

export function ClassNodeComponent(props: RF_NodeProps<RF_Node<{ data: Node }>>) {
  const node = props.data.data;
  const title = props.data.data.title;
  const attributes = props.data.data.attributes.filter((attribute) => attribute.type === 'attribute');
  const methods = props.data.data.attributes.filter((attribute) => attribute.type === 'method');
  const hasAttributes = attributes.length > 0;
  const hasMethods = methods.length > 0;
  const isExtension = import.meta.env.VITE_ENV === 'extension';
  const hoverManager = HoverManager.getInstance();

  const handleMouseEnter = () => {
    hoverManager.setHoveredNode(node);
  };

  const handleMouseLeave = () => {
    hoverManager.setHoveredNode(null);
  };

  return (
    <Card
      id={node.id}
      className="hover:shadow-[0px_0px_25px_5px_hsl(var(--class))]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="group flex flex-col bg-class/40 p-1">
        <CardHeader>
          <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
          <CardTitle>{title.text}</CardTitle>
          {isExtension && (
            <div className="absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
              <OpenNodeCodeButton node={node} />
            </div>
          )}
        </CardHeader>
        <CardContent className="bg-card">
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
              id={attribute.id}
              key={`${attribute.id}`}
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
          {methods.map((method) => (
            <div
              id={method.id}
              key={`${method.id}`}
              className={cn('flex items-center justify-start border-border/10 border-b px-4')}
              style={{ height: NODE_ATTRIBUTE_HEIGHT }}
            >
              <p>{method.text}</p>
            </div>
          ))}
        </CardContent>
      </div>
      <RF_Handle type="source" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
      <RF_Handle type="target" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
    </Card>
  );
}
