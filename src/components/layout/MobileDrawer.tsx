import { useAppStore } from '@/store/appStore';
import { AppList } from '@/components/apps/AppList';
import { NodeInspector } from '@/components/inspector/NodeInspector';
import { X } from 'lucide-react';

export function MobileDrawer() {
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore();

  if (!isMobilePanelOpen) return null;

  return (
    <>
      <div
        className="mobile-drawer-overlay"
        onClick={() => setMobilePanelOpen(false)}
      />
      <div className="mobile-drawer">
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Panel</span>
          <button
            className="mobile-drawer-close"
            onClick={() => setMobilePanelOpen(false)}
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mobile-drawer-body">
          <AppList />
          <NodeInspector />
        </div>
      </div>
    </>
  );
}
