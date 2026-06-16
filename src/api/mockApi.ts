import { appsData, graphsData } from './data';
import type { App } from '../types/app';
import type { GraphData } from '../types/graph';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchApps(): Promise<App[]> {
  await delay(400);
  return appsData;
}

export async function fetchGraphByAppId(appId: string): Promise<GraphData> {
  await delay(600);
  const graph = graphsData[appId];
  if (!graph) {
    throw new Error(`Graph not found for app: ${appId}`);
  }
  return graph;
}
