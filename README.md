App Graph Builder

A responsive ReactFlow-based graph visualization dashboard built as a Frontend Intern Assignment.

Live Demo

https://app-graph-builder-flame.vercel.app

GitHub Repository

https://github.com/adarshk0070/App-Graph-Builder

Features
Responsive layout for desktop, tablet, and mobile
ReactFlow graph visualization
Custom service nodes
Node selection and deletion
Zoom, pan, and fit-view support
Node Inspector with:
Status badge
Config/Runtime tabs
Editable node name
Synced slider and numeric input
Application switching
Mobile drawer support
Loading and error states
Mock API integration using MSW
Tech Stack
React + Vite
TypeScript (Strict Mode)
ReactFlow (xyflow)
Zustand
TanStack Query
shadcn/ui
MSW (Mock Service Worker)
Setup Instructions
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
Architecture Decisions
MSW used to simulate backend APIs with realistic latency
Zustand used only for UI state management
TanStack Query used for server state, caching, and data fetching
ReactFlow custom nodes used to render service cards
Inspector updates node data through ReactFlow state management
Responsive layout implemented using CSS breakpoints and mobile drawer
Known Limitations
Mock data resets on page refresh
No backend persistence
Mobile drawer implementation is intentionally lightweight

Screenshots

## Canvas View
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/b63208f8-300a-4258-b149-69ac3f10507a" />

## Node Inspector
<img width="960" height="544" alt="image" src="https://github.com/user-attachments/assets/f7c48b2c-9a60-427f-80a3-ad280b564f46" />


