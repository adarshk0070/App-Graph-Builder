import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Settings } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import { SERVICE_ICONS, STATUS_COLORS } from '@/utils/constants';
import type { ServiceNodeData } from '@/types/node';

type CustomNodeProps = NodeProps & {
  data: ServiceNodeData;
  selected?: boolean;
};

function CustomNodeComponent({ data, selected }: CustomNodeProps) {
  const statusStyle = STATUS_COLORS[data.status] ?? STATUS_COLORS.healthy;
  const icon = SERVICE_ICONS[data.icon] ?? '📦';

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`service-node ${selected ? 'selected' : ''}`}>
        {/* Header */}
        <div className="node-header">
          <div className="node-header-left">
            <span className="node-icon">{icon}</span>
            <span className="node-name">{data.label}</span>
            <span className="node-cost-badge">${data.cost.toFixed(2)}/hr</span>
          </div>
          <button
            className="node-settings-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="Node settings"
          >
            <Settings size={14} />
          </button>
        </div>

        {/* Stats */}
        <div className="node-stats">
          <div className="node-stat">
            <span className="node-stat-value">{data.cpu.toFixed(2)}</span>
            <span className="node-stat-label">CPU</span>
          </div>
          <div className="node-stat">
            <span className="node-stat-value">{data.memory.toFixed(2)} GB</span>
            <span className="node-stat-label">Memory</span>
          </div>
          <div className="node-stat">
            <span className="node-stat-value">{data.disk} GB</span>
            <span className="node-stat-label">Disk</span>
          </div>
          <div className="node-stat">
            <span className="node-stat-value">{data.region.split('-').length}</span>
            <span className="node-stat-label">Region</span>
          </div>
        </div>

        {/* Slider */}
        <div className="node-slider-row">
          <input
            type="range"
            className="node-slider"
            min="0"
            max="1"
            step="0.01"
            value={data.cpu}
            readOnly
          />
          <div className="node-slider-value">
            <span>{data.cpu.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="node-footer">
          <div
            className="node-status-badge"
            style={{
              background: statusStyle.bg.replace('bg-', '').includes('emerald')
                ? 'hsl(152 69% 31% / 0.15)'
                : statusStyle.bg.replace('bg-', '').includes('amber')
                ? 'hsl(38 92% 50% / 0.15)'
                : 'hsl(0 84% 60% / 0.15)',
              color: statusStyle.bg.replace('bg-', '').includes('emerald')
                ? 'hsl(152 69% 53%)'
                : statusStyle.bg.replace('bg-', '').includes('amber')
                ? 'hsl(38 92% 60%)'
                : 'hsl(0 84% 70%)',
            }}
          >
            <div
              className="node-status-dot"
              style={{
                background: statusStyle.bg.replace('bg-', '').includes('emerald')
                  ? 'hsl(152 69% 53%)'
                  : statusStyle.bg.replace('bg-', '').includes('amber')
                  ? 'hsl(38 92% 60%)'
                  : 'hsl(0 84% 70%)',
              }}
            />
            {data.status}
          </div>
          <span className="node-provider">
            {data.provider === 'AWS' ? <FaAws className="text-[#FF9900] text-2xl" /> : data.provider}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export const CustomNode = memo(CustomNodeComponent);
