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
### Canvas View
<img width="960" height="542" alt="image" src="https://github.com/user-attachments/assets/2ddf06ac-58d4-4b71-96a3-16dc16a16d80" />
### Node Inspector
<img width="960" height="543" alt="image" src="https://github.com/user-attachments/assets/a642a8a8-83f6-46a7-9798-58e8ded95237" />

