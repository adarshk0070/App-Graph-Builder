import {
  GitBranch,
  Database,
  HardDrive,
  Box,
  LayoutGrid,
  Network,
  Container,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface SidebarItem {
  icon: ReactNode;
  label: string;
  id: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <GitBranch size={18} />, label: 'GitHub', id: 'github' },
  { icon: <Database size={18} />, label: 'PostgreSQL', id: 'postgresql' },
  { icon: <HardDrive size={18} />, label: 'Redis', id: 'redis' },
  { icon: <Container size={18} />, label: 'MongoDB', id: 'mongodb' },
  { icon: <Box size={18} />, label: 'Services', id: 'cube' },
  { icon: <LayoutGrid size={18} />, label: 'Grid', id: 'grid' },
  { icon: <Network size={18} />, label: 'Network', id: 'network' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      {sidebarItems.map((item, index) => (
        <div key={item.id}>
          {index === 4 && <div className="sidebar-separator" />}
          <button
            className={`sidebar-icon-btn ${index === 0 ? 'active' : ''}`}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        </div>
      ))}
    </aside>
  );
}
