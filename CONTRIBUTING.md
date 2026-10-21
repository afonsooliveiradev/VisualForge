# Contributing to VisualForge

**Language / Idioma:** English | [Português (Brasil)](CONTRIBUTING.pt-BR.md)

Thank you for helping improve VisualForge, an open-source React and TypeScript component library for dashboards and data visualization.

## Before contributing

For significant features or API changes, open a GitHub issue first to discuss the proposal.

## Local setup

Requirements: Node.js 24, npm 11, and Git.

```bash
git clone https://github.com/afonsooliveiradev/VisualForge.git
cd VisualForge
npm ci
npm run dev
```

## Development workflow

1. Start from an up-to-date `main` branch and create a feature branch.
2. Keep the change focused; avoid unrelated refactors.
3. Add or update tests when modifying component behavior.
4. Export new public components and their types through `packages/react/src/index.ts`.
5. Add a gallery example for any new visual component.
6. Run the quality checks below and open a pull request.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm audit
```

## Component guidelines

- Prefer explicit TypeScript interfaces for public component props.
- Handle empty or invalid datasets without crashing.
- Consider responsive layout, accessibility, and meaningful labels.
- Avoid unnecessary breaking changes to existing component APIs.
- Keep examples consistent with actual exported types and props.

## Pull request checklist

- Explain what changed and why.
- Describe how the change was tested.
- Include screenshots for gallery or visual changes.
- Document API changes and known limitations.
- Do not include credentials, access tokens, or sensitive `.env` files.

## License

Contributions are submitted under the repository's [MIT License](LICENSE).
