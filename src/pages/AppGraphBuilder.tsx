import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from '@/components/layout/TopBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightPanel } from '@/components/layout/RightPanel';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { GraphCanvas } from '@/components/graph/GraphCanvas';
import { useAppStore } from '@/store/appStore';
import { useMobile } from '@/hooks/useMobile';
import { PanelRightOpen } from 'lucide-react';

export function AppGraphBuilder() {
  const { toggleMobilePanel } = useAppStore();
  const isMobile = useMobile();

  return (
    <ReactFlowProvider>
      <div className="app-layout">
        <TopBar />
        <Sidebar />
        <GraphCanvas />
        <RightPanel />
        <MobileDrawer />

        {isMobile && (
          <button
            className="mobile-fab"
            onClick={toggleMobilePanel}
            aria-label="Open panel"
          >
            <PanelRightOpen size={20} />
          </button>
        )}
      </div>
    </ReactFlowProvider>
  );
}
