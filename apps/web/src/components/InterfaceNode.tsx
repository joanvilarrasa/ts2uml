import { type NodeProps as RF_NodeProps, type Node as RF_Node, Handle as RF_Handle, Position as RF_Position } from '@xyflow/react';
import type { Node } from '@ts2uml/models';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

export function InterfaceNodeComponent(props: RF_NodeProps<RF_Node<{data: Node;}>>) {
    const node = props.data.data;
    const title = props.data.data.title;
    const attributes = props.data.data.attributes;

    return (

        <Card>
            <CardHeader className='bg-interface'>
                <CardDescription>{`<<${title.nodeType}>>`}</CardDescription>
                <CardTitle>{title.text}</CardTitle>
            </CardHeader>
            <CardContent>
                {attributes.map((attribute, index) => (
                    <div key={`${node.id}-${index}`}>
                        <p>{attribute.text}</p>
                        <RF_Handle type="source" position={RF_Position.Right} id={`${node.id}-${index}-${RF_Position.Right}`} />
                        <RF_Handle type="source" position={RF_Position.Bottom} id={`${node.id}-${index}-${RF_Position.Left}`} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}