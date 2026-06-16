import { useCallback } from 'react';
import { useReactFlow, useNodesData } from '@xyflow/react';
import { useAppStore } from '@/store/appStore';
import { MousePointerClick } from 'lucide-react';
import type { ServiceNodeData, NodeStatus } from '@/types/node';
import type { ServiceNode } from '@/types/graph';

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore();
  const reactFlowInstance = useReactFlow();

  // Use useNodesData to reactively subscribe to the selected node's data
  const nodeData = useNodesData<ServiceNode>(selectedNodeId ?? '')?.data as ServiceNodeData | undefined;

  const updateNodeData = useCallback(
    (updates: Partial<ServiceNodeData>) => {
      if (!selectedNodeId) return;
      reactFlowInstance.updateNodeData(selectedNodeId, updates);
    },
    [selectedNodeId, reactFlowInstance]
  );

  if (!selectedNodeId || !nodeData) {
    return (
      <div className="inspector-section">
        <div className="inspector-header">
          <span className="inspector-title">Node Inspector</span>
        </div>
        <div className="inspector-empty">
          <MousePointerClick size={32} />
          <span>Select a node on the canvas<br />to inspect its properties</span>
        </div>
      </div>
    );
  }

  const statusColors: Record<NodeStatus, { bg: string; color: string; dot: string }> = {
    healthy: { bg: 'hsl(152 69% 31% / 0.15)', color: 'hsl(152 69% 53%)', dot: 'hsl(152 69% 53%)' },
    degraded: { bg: 'hsl(38 92% 50% / 0.15)', color: 'hsl(38 92% 60%)', dot: 'hsl(38 92% 60%)' },
    down: { bg: 'hsl(0 84% 60% / 0.15)', color: 'hsl(0 84% 70%)', dot: 'hsl(0 84% 70%)' },
  };

  const sc = statusColors[nodeData.status];

  return (
    <div className="inspector-section">
      <div className="inspector-header">
        <span className="inspector-title">Node Inspector</span>
      </div>
      <div className="inspector-content">
        {/* Status Badge */}
        <div
          className="status-badge"
          style={{ background: sc.bg, color: sc.color }}
        >
          <div className="status-dot" style={{ background: sc.dot }} />
          {nodeData.status}
        </div>

        {/* Tabs */}
        <div className="inspector-tabs">
          <button
            className={`inspector-tab ${activeInspectorTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveInspectorTab('config')}
            id="inspector-tab-config"
          >
            Config
          </button>
          <button
            className={`inspector-tab ${activeInspectorTab === 'runtime' ? 'active' : ''}`}
            onClick={() => setActiveInspectorTab('runtime')}
            id="inspector-tab-runtime"
          >
            Runtime
          </button>
        </div>

        {activeInspectorTab === 'config' ? (
          <ConfigTab nodeData={nodeData} updateNodeData={updateNodeData} />
        ) : (
          <RuntimeTab nodeData={nodeData} />
        )}
      </div>
    </div>
  );
}

/* ===== Config Tab ===== */

function ConfigTab({
  nodeData,
  updateNodeData,
}: {
  nodeData: ServiceNodeData;
  updateNodeData: (updates: Partial<ServiceNodeData>) => void;
}) {
  const handleCpuSliderChange = (value: number) => {
    updateNodeData({ cpu: Math.round(value * 100) / 100 });
  };

  const handleCpuInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0 && val <= 1) {
      updateNodeData({ cpu: Math.round(val * 100) / 100 });
    }
  };

  return (
    <div>
      {/* Node Name */}
      <div className="inspector-field">
        <label className="inspector-field-label" htmlFor="inspector-name">
          Node Name
        </label>
        <input
          id="inspector-name"
          className="inspector-field-input"
          value={nodeData.label}
          onChange={(e) => updateNodeData({ label: e.target.value })}
        />
      </div>

      {/* CPU Slider + Numeric Input */}
      <div className="inspector-field">
        <label className="inspector-field-label">CPU</label>
        <div className="slider-field">
          <input
            type="range"
            className="slider-input"
            min="0"
            max="1"
            step="0.01"
            value={nodeData.cpu}
            onChange={(e) => handleCpuSliderChange(parseFloat(e.target.value))}
            id="inspector-cpu-slider"
          />
          <input
            type="number"
            className="slider-value-input"
            min="0"
            max="1"
            step="0.01"
            value={nodeData.cpu}
            onChange={handleCpuInputChange}
            id="inspector-cpu-value"
          />
        </div>
      </div>

      {/* Memory */}
      <div className="inspector-field">
        <label className="inspector-field-label" htmlFor="inspector-memory">
          Memory (GB)
        </label>
        <input
          id="inspector-memory"
          className="inspector-field-input"
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={nodeData.memory}
          onChange={(e) => {
            const val = parseFloat(e.target.value) || 0
            const clamped = Math.min(val, 10)
            updateNodeData({ memory: clamped })
          }}
        />
      </div>

      {/* Description */}
      <div className="inspector-field">
        <label className="inspector-field-label" htmlFor="inspector-description">
          Description
        </label>
        <textarea
          id="inspector-description"
          className="inspector-field-textarea"
          value={nodeData.description}
          onChange={(e) => updateNodeData({ description: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}

/* ===== Runtime Tab ===== */

function RuntimeTab({ nodeData }: { nodeData: ServiceNodeData }) {
  const stats = [
    { label: 'CPU', value: `${nodeData.cpu.toFixed(2)} cores` },
    { label: 'Memory', value: `${nodeData.memory.toFixed(2)} GB` },
    { label: 'Disk', value: `${nodeData.disk} GB` },
    { label: 'Region', value: nodeData.region },
    { label: 'Provider', value: nodeData.provider },
    { label: 'Cost', value: `$${nodeData.cost.toFixed(2)}/hr` },
    { label: 'Status', value: nodeData.status },
  ];

  return (
    <div>
      {stats.map((stat) => (
        <div className="runtime-stat" key={stat.label}>
          <span className="runtime-stat-label">{stat.label}</span>
          <span className="runtime-stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
