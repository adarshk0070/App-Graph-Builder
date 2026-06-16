// import { useCallback, useEffect, useMemo, useState } from 'react';
// import {
//   ReactFlow,
//   Background,
//   Controls,
//   MiniMap,
//   BackgroundVariant,
//   useNodesState,
//   useEdgesState,
//   type NodeMouseHandler,
//   type Node,
//   type Edge,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { useAppStore } from '@/store/appStore';
// import { useGraph } from '@/hooks/useGraph';
// import { CustomNode } from './CustomNode';
// import { RefreshCw } from 'lucide-react';

// export function GraphCanvas() {
//   const { selectedAppId, selectedNodeId, setSelectedNodeId } = useAppStore();
//   const { data: graphData, isLoading, isError, refetch } = useGraph(selectedAppId);

//   const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
//   const [rfInstance, setRfInstance] = useState<{ fitView: () => void } | null>(null);

//   const nodeTypes = useMemo(() => ({ service: CustomNode }), []);

//   // Sync graph data from TanStack Query into ReactFlow state
//   useEffect(() => {
//     if (graphData) {
//       setNodes(graphData.nodes as Node[]);
//       setEdges(graphData.edges as Edge[]);
//       // Fit view after loading
//       setTimeout(() => rfInstance?.fitView(), 100);
//     }
//   }, [graphData, setNodes, setEdges, rfInstance]);

//   const onNodeClick: NodeMouseHandler = useCallback(
//     (_event, node) => {
//       setSelectedNodeId(node.id);
//     },
//     [setSelectedNodeId]
//   );

//   const onPaneClick = useCallback(() => {
//     setSelectedNodeId(null);
//   }, [setSelectedNodeId]);

//   const onNodesDelete = useCallback(
//     (deletedNodes: Node[]) => {
//       if (deletedNodes.some((n) => n.id === selectedNodeId)) {
//         setSelectedNodeId(null);
//       }
//     },
//     [selectedNodeId, setSelectedNodeId]
//   );

//   // Update selected state on nodes
//   useEffect(() => {
//     setNodes((nds) =>
//       nds.map((node) => ({
//         ...node,
//         selected: node.id === selectedNodeId,
//       }))
//     );
//   }, [selectedNodeId, setNodes]);

//   if (!selectedAppId) {
//     return (
//       <div className="graph-canvas-wrapper">
//         <div className="graph-empty">
//           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             <rect x="3" y="3" width="18" height="18" rx="2" />
//             <path d="M9 12h6M12 9v6" />
//           </svg>
//           <span>Select an application to view its graph</span>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="graph-canvas-wrapper">
//         <div className="graph-loading">
//           <div className="spinner" />
//           <span>Loading graph...</span>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="graph-canvas-wrapper">
//         <div className="graph-error">
//           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             <circle cx="12" cy="12" r="10" />
//             <path d="M12 8v4M12 16h.01" />
//           </svg>
//           <span>Something went wrong loading the graph</span>
//           <button className="graph-error-btn" onClick={() => refetch()}>
//             <RefreshCw size={14} style={{ marginRight: 6, display: 'inline' }} />
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="graph-canvas-wrapper">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         onPaneClick={onPaneClick}
//         onNodesDelete={onNodesDelete}
//         onInit={(instance) => setRfInstance(instance)}
//         fitView
//         deleteKeyCode={['Backspace', 'Delete']}
//         minZoom={0.3}
//         maxZoom={2}
//         defaultEdgeOptions={{
//           type: 'smoothstep',
//           style: { strokeWidth: 2 },
//         }}
//       >
//         <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(217 33% 15%)" />
//         <Controls showInteractive={false} />
//         <MiniMap
//           nodeColor={() => 'hsl(245 82% 67%)'}
//           maskColor="hsl(222 47% 6% / 0.8)"
//           style={{ width: 120, height: 80 }}
//         />
//       </ReactFlow>
//     </div>
//   );
// }



import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '@/store/appStore';
import { useGraph } from '@/hooks/useGraph';
import { CustomNode } from './CustomNode';
import { RefreshCw } from 'lucide-react';

export function GraphCanvas() {
  const { selectedAppId, selectedNodeId, setSelectedNodeId } = useAppStore();
  const { data: graphData, isLoading, isError, refetch } = useGraph(selectedAppId);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = useState<{ fitView: () => void } | null>(null);

  const prevAppId = useRef<string | null>(null);

  const nodeTypes = useMemo(
    () => ({
      service: CustomNode,
    }),
    []
  );

  useEffect(() => {
    if (graphData && prevAppId.current !== selectedAppId) {
      prevAppId.current = selectedAppId;

      setNodes(graphData.nodes as Node[]);
      setEdges(graphData.edges as Edge[]);

      setTimeout(() => rfInstance?.fitView(), 100);
    }
  }, [graphData, selectedAppId, setNodes, setEdges, rfInstance]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      if (deletedNodes.some((n) => n.id === selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setSelectedNodeId]
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
      }))
    );
  }, [selectedNodeId, setNodes]);

  if (!selectedAppId) {
    return (
      <div className="graph-canvas-wrapper">
        <div className="graph-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 12h6M12 9v6" />
          </svg>
          <span>Select an application to view its graph</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="graph-canvas-wrapper">
        <div className="graph-loading">
          <div className="spinner" />
          <span>Loading graph...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="graph-canvas-wrapper">
        <div className="graph-error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>

          <span>Something went wrong loading the graph</span>

          <button className="graph-error-btn" onClick={() => refetch()}>
            <RefreshCw size={14} style={{ marginRight: 6, display: 'inline' }} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={onNodesDelete}
        onInit={(instance) => setRfInstance(instance)}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(217 33% 15%)"
        />

        <Controls showInteractive={false} />

        <MiniMap
          nodeColor={() => 'hsl(245 82% 67%)'}
          maskColor="hsl(222 47% 6% / 0.8)"
          style={{ width: 120, height: 80 }}
        />
      </ReactFlow>
    </div>
  );
}

