# React TanStack Harmonic Modes Design

## Goal

Convert the current static Vite page to a typed React application and add navigation between the major and minor harmonic-field versions without duplicating the page structure.

## Architecture

- Keep Vite as the development and production build tool.
- Add React and TypeScript entry points: `src/main.tsx`, `src/App.tsx`, and `src/styles.css`.
- Use `@tanstack/react-router` with two typed routes:
  - `/` for the major harmonic field.
  - `/menor` for the minor harmonic field.
- Use TanStack `Link` components in the header beside the page title. The active route is visibly highlighted and exposes `aria-current="page"`.
- Use one shared page component driven by a `mode` data object. Only musical labels, degrees, descriptions, and examples vary between routes.
- Keep the existing dark visual language, responsive layout, Tailwind CDN configuration, and Portuguese copy style.

## Content

The major route preserves the current page content. The minor route uses the parallel natural-minor Nashville degrees and equivalent explanatory sections, with the heading changed to `Campo Harmônico (Menor)`. The route is a full navigable page, so browser back/forward and direct links work.

## Error Handling

TanStack Router's not-found route renders a small link back to the major page. Invalid or unknown routes must not produce a blank screen.

## Testing

- Unit tests verify the TypeScript app shell, route definitions, navigation labels, active route metadata, and both mode data sets.
- Playwright tests verify that the major page loads, the `MENOR` link navigates to `/menor`, the minor heading is visible, and navigation back to `MAIOR` works.
- Run the full unit and end-to-end suite plus the production build after implementation.

## Scope

This change does not add a chord/key calculator, persistence, authentication, or new visual theme. The existing page's information architecture remains intact while the implementation becomes typed and navigable.
