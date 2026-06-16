import { useQuery } from '@tanstack/react-query';
import { fetchGraphByAppId } from '../api/mockApi';

export function useGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraphByAppId(appId!),
    enabled: !!appId,
    staleTime: 2 * 60 * 1000,
  });
}
