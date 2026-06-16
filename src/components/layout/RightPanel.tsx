import { AppList } from '@/components/apps/AppList';
import { NodeInspector } from '@/components/inspector/NodeInspector';

export function RightPanel() {
  return (
    <div className="right-panel">
      <AppList />
      <NodeInspector />
    </div>
  );
}
