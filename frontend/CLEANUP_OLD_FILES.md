# Old Next.js Files to Remove

The frontend is now fully React with Vite. The following old Next.js files can be safely deleted:

## Old Directories (Not Used):
- `frontend/app/` - Old Next.js pages (replaced by `src/pages/`)
- `frontend/components/` - Old Next.js components (replaced by `src/components/`)
- `frontend/store/` - Old store location (replaced by `src/store/`)
- `frontend/lib/` - Old lib location (replaced by `src/lib/`)
- `frontend/middleware/` - Old middleware (not needed for React)

## Old Files:
- `frontend/next.config.js` - Next.js config (not needed for Vite)
- `frontend/env.local.example` - Old Next.js env format

## Current React Structure (ACTIVE):
✅ `frontend/src/` - All React code here
✅ `frontend/src/pages/` - React page components
✅ `frontend/src/components/` - React components
✅ `frontend/src/store/` - Redux store
✅ `frontend/src/lib/` - Utilities
✅ `frontend/vite.config.js` - Vite configuration
✅ `frontend/index.html` - HTML entry point
✅ `frontend/src/main.jsx` - React entry point

## To Clean Up:
You can manually delete the old folders, or they can be ignored as they're not being used.

