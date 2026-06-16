# App Graph Builder

A React + TypeScript graph visualization dashboard 
built as a frontend intern assignment.

## Tech Stack
- React + Vite
- TypeScript (strict)
- ReactFlow (xyflow)
- Zustand
- TanStack Query
- shadcn/ui
- MSW (Mock Service Worker)

## Setup Instructions

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Type check
npm run typecheck
```

## Key Decisions
- Used MSW for mock API (realistic fetch simulation)
- Zustand for UI state only (not server data)
- TanStack Query for all server data + caching
- CustomNode renders full card inside ReactFlow
- useNodesData() for reactive node data sync

## Known Limitations
- Mock data resets on page refresh
- No persistent storage
- Mobile drawer basic implementation

## Canvas View
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/b63208f8-300a-4258-b149-69ac3f10507a" />

## Node Inspector
<img width="960" height="544" alt="image" src="https://github.com/user-attachments/assets/f7c48b2c-9a60-427f-80a3-ad280b564f46" />


