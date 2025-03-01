import { NODE_ATTRIBUTE_HEIGHT } from '@/lib/constants';
import { HoverManager } from '@/lib/hover-manager';
import type { Node } from '@ts2uml/models';
import {
  Handle as RF_Handle,
  type Node as RF_Node,
  type NodeProps as RF_NodeProps,
  Position as RF_Position,
} from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { OpenNodeCodeButton } from './open-node-code';

export function InterfaceNodeComponent(props: RF_NodeProps<RF_Node<{ data: Node }>>) {
  const node = props.data.data;
  const title = props.data.data.title;
  const attributes = props.data.data.attributes;
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
      className="hover:shadow-[0px_0px_25px_5px_hsl(var(--interface))]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="group flex flex-col bg-interface/40 p-1">
        <CardHeader className="relative">
          <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
          <CardTitle>{title.text}</CardTitle>
          {isExtension && (
            <div className="absolute top-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
              <OpenNodeCodeButton node={node} />
            </div>
          )}
        </CardHeader>
        <CardContent className="bg-card">
          {attributes.map((attribute) => (
            <div
              id={attribute.id}
              key={`${attribute.id}`}
              className="flex items-center justify-between px-4"
              style={{ height: NODE_ATTRIBUTE_HEIGHT }}
            >
              <p>{attribute.text}</p>
              {attribute.extended && (
                <span className="ml-2 text-muted-foreground text-xs">{`(${attribute.extended.ancestorNodeName})`}</span>
              )}
            </div>
          ))}
        </CardContent>
      </div>
      <RF_Handle type="source" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
      <RF_Handle type="target" position={RF_Position.Top} id={`${node.id}`} style={{ opacity: 0 }} />
    </Card>
  );
}
