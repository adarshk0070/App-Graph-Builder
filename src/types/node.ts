export type NodeStatus = 'healthy' | 'degraded' | 'down';
export type CloudProvider = 'AWS' | 'GCP' | 'Azure';

export interface ServiceNodeData {
  [key: string]: unknown;
  label: string;
  icon: string;
  cpu: number;
  memory: number;
  disk: number;
  region: string;
  cost: number;
  status: NodeStatus;
  provider: CloudProvider;
  description: string;
}
