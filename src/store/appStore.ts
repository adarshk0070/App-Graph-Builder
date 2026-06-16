import { create } from 'zustand';

interface AppStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  activeInspectorTab: 'config' | 'runtime';
  isMobilePanelOpen: boolean;
  theme: 'dark' | 'light';

  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setActiveInspectorTab: (tab: 'config' | 'runtime') => void;
  toggleMobilePanel: () => void;
  setMobilePanelOpen: (open: boolean) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: '1',
  selectedNodeId: null,
  activeInspectorTab: 'config',
  isMobilePanelOpen: false,
  theme: 'dark',

  setSelectedAppId: (id) =>
    set({ selectedAppId: id, selectedNodeId: null }),

  setSelectedNodeId: (id) =>
    set({ selectedNodeId: id }),

  setActiveInspectorTab: (tab) =>
    set({ activeInspectorTab: tab }),

  toggleMobilePanel: () =>
    set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),

  setMobilePanelOpen: (open) =>
    set({ isMobilePanelOpen: open }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
