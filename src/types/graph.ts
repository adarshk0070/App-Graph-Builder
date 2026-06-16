import type { Node, Edge } from '@xyflow/react';
import type { ServiceNodeData } from './node';

export type ServiceNode = Node<Record<string, unknown> & ServiceNodeData, 'service'>;
export type GraphEdge = Edge;

export interface GraphData {
  nodes: ServiceNode[];
  edges: GraphEdge[];
}
