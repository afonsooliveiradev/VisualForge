# VisualForge — Integration Examples

This directory is reserved for integration examples demonstrating how to consume `@visualforge/react` in React applications.

## Current status

VisualForge is currently in private alpha (`0.1.0-alpha.0`).

The React package can be built locally, but it is not published to the npm registry.

There is no standalone integration application in this directory yet.

## Explore the components

The existing gallery is the recommended starting point for exploring the component library.

From the repository root:

```bash
npm ci
npm run build -w @visualforge/react
npm run dev
```

Open the local address displayed by Vite.

The gallery demonstrates the components within the repository's npm workspace.

## Build the library

To generate the compiled package:

```bash
npm run build -w @visualforge/react
```

The build generates:

- `packages/react/dist/index.js` — JavaScript entry point
- `packages/react/dist/index.d.ts` — TypeScript declarations

The package exports are defined in `packages/react/package.json`.

## Local integration

The package is configured for consumption through its compiled exports.

Developers can inspect the package API and build artifacts before integrating it into another React application.

The package has not yet been published to npm. Installation and compatibility in independent applications require separate validation.

For the public component API, see [Component Reference](../docs/components.md).

For package-specific information, see [React Package README](../packages/react/README.md).

## Planned examples

Future iterations may include:

- A standalone React dashboard
- Local package installation using an npm tarball
- Integration with JSON datasets
- Integration with REST APIs
- Responsive dashboard layouts
- Advanced component composition

These examples are planned and should not be considered implemented features.

## Contributing

Suggestions and contributions are welcome.

See the [Contributing Guide](../CONTRIBUTING.md).

---

**VisualForge — Build. Visualize. Reuse.**