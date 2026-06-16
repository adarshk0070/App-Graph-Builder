import { useAppStore } from '@/store/appStore';
import { useApps } from '@/hooks/useApps';
import {
  Lightbulb,
  MoreHorizontal,
  Share2,
  Moon,
  Sun,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';

export function TopBar() {
  const { theme, toggleTheme, toggleMobilePanel, selectedAppId } = useAppStore();
  const { data: apps } = useApps();
  const isMobile = useMobile();

  const selectedApp = apps?.find((a) => a.id === selectedAppId);

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        {isMobile && (
          <button
            className="top-bar-icon-btn mobile-menu-btn"
            onClick={toggleMobilePanel}
            aria-label="Toggle panel"
          >
            <Menu size={18} />
          </button>
        )}
        <div className="top-bar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="url(#logo-grad)" />
              <path d="M7 8h10M7 12h10M7 16h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <button className="top-bar-icon-btn" aria-label="Quick insights">
            <Lightbulb size={16} />
          </button>
        </div>
        <div className="top-bar-divider" />
        <button className="app-selector-btn">
          <span className="app-selector-name">
            {selectedApp?.name ?? 'Select app'}
          </span>
          <ChevronDown size={14} className="app-selector-chevron" />
        </button>
        <button className="top-bar-icon-btn" aria-label="More options">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="top-bar-right">
        <button className="share-btn">
          <Share2 size={14} />
          <span>Share</span>
        </button>
        <button
          className="top-bar-icon-btn theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="avatar">
          <span>A</span>
        </div>
      </div>
    </header>
  );
}
