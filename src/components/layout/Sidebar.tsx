import {
  LayoutDashboard,
  Network,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { SiPostgresql, SiRedis, SiMongodb, SiDocker } from 'react-icons/si';
import type { ReactNode } from 'react';

interface SidebarItem {
  icon: ReactNode;
  label: string;
  id: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <FaGithub size={18} />, label: 'GitHub', id: 'github' },
  { icon: <SiPostgresql size={18} color="#336791" />, label: 'PostgreSQL', id: 'postgresql' },
  { icon: <SiRedis size={18} color="#FF4438" />, label: 'Redis', id: 'redis' },
  { icon: <SiMongodb size={18} color="#47A248" />, label: 'MongoDB', id: 'mongodb' },
  { icon: <SiDocker size={18} color="#2496ED" />, label: 'Services', id: 'cube' },
  { icon: <LayoutDashboard size={18} color="#EAB308" />, label: 'Grid', id: 'grid' },
  { icon: <Network size={18} color="#22C55E" />, label: 'Network', id: 'network' },
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
