# VisualForge Architecture

VisualForge uses npm workspaces in one GitHub repository.

- `packages/react`: reusable React component source. It must never depend on the gallery.
- `apps/gallery`: Vite/React showcase importing `@visualforge/react`.
- `examples`: integration recipes in future sprints.

Dark Tech colors are for the gallery. Library components will be themeable.

Sprint 01 delivers the foundation, not finished charts or npm publication.
