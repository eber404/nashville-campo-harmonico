# React TanStack Harmonic Modes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static harmonic-field page to Vite + React + TypeScript and add typed TanStack Router navigation between major and minor modes.

**Architecture:** Keep one shared React page and render its musical copy from typed major/minor data. Configure `@tanstack/react-router` with `/` and `/menor` routes, using `Link` controls beside the title. Preserve the current dark responsive styling while moving the document body into focused React components.

**Tech Stack:** Vite 5, React 18, TypeScript, `@tanstack/react-router`, Tailwind CDN, Vitest, Playwright.

---

## File Map

- Modify `package.json` and `package-lock.json`: add React, TanStack Router, TypeScript, and the Vite React plugin.
- Modify `index.html`: keep document metadata and Tailwind configuration, replace the static page body with the React root and module entry.
- Create `tsconfig.json`: enable strict browser TypeScript and JSX compilation.
- Modify `vite.config.js`: add the React plugin while preserving `host: '0.0.0.0'` and `allowedHosts`.
- Create `src/main.tsx`: mount the typed router provider.
- Create `src/router.tsx`: define the root, major, minor, and not-found routes.
- Create `src/App.tsx`: provide the shared shell, menu, sections, and mode-driven page.
- Create `src/data/harmonicModes.ts`: define typed musical content for major and natural-minor modes.
- Create `src/styles.css`: move the current global dark-theme CSS out of `index.html`.
- Create `tests/app-shell.test.js`: verify the new typed entry and root shell.
- Create `tests/modes.test.js`: verify both mode data sets and route paths.
- Create `e2e/harmonic-navigation.spec.js`: verify visible navigation in the browser.

### Task 1: Add Typed React Tooling

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `tsconfig.json`
- Modify: `vite.config.js`
- Modify: `index.html`
- Test: `tests/app-shell.test.js`

- [ ] **Step 1: Write the failing shell test**

```js
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

describe('React app shell', () => {
  it('loads the TypeScript React entry from a root mount', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('src="/src/main.tsx"');
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit -- tests/app-shell.test.js`

Expected: FAIL because the current `index.html` has neither the React root nor `src/main.tsx`.

- [ ] **Step 3: Install the runtime and type tooling**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm install react react-dom @tanstack/react-router && npm install --save-dev @vitejs/plugin-react typescript @types/react @types/react-dom`

Add `tsconfig.json` with strict browser JSX support:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "include": ["src", "vite.config.js"]
  }
}
```

- [ ] **Step 4: Replace the static body with the React mount**

Keep the existing `<html lang="pt-BR">`, viewport, title, Tailwind CDN, and Tailwind config. Replace everything inside `<body>` with:

```html
<body class="min-h-screen bg-black text-white antialiased">
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

- [ ] **Step 5: Configure Vite's React plugin without changing the bind address**

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['minipc.lan'],
  },
});
```

- [ ] **Step 6: Run the shell test and build**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit -- tests/app-shell.test.js && npm run build`

Expected: the shell test passes; the build may fail only because `src/main.tsx` is not created yet. Continue to Task 2 after recording that expected intermediate state.

### Task 2: Define Typed Mode Data and TanStack Routes

**Files:**
- Create: `src/data/harmonicModes.ts`
- Create: `src/router.tsx`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Test: `tests/modes.test.js`

- [ ] **Step 1: Write the failing data and route test**

```js
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

describe('harmonic modes and routes', () => {
  it('defines both typed modes and their TanStack paths', () => {
    const modes = fs.readFileSync(path.join(root, 'src/data/harmonicModes.ts'), 'utf8');
    const router = fs.readFileSync(path.join(root, 'src/router.tsx'), 'utf8');

    expect(modes).toContain("id: 'major'");
    expect(modes).toContain("id: 'minor'");
    expect(modes).toContain('Campo Harmônico (Menor)');
    expect(router).toContain("path: '/menor'");
    expect(router).toContain('Link');
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit -- tests/modes.test.js`

Expected: FAIL because the TypeScript data and router files do not exist.

- [ ] **Step 3: Add the typed content model**

Define `HarmonicMode` with `id`, `title`, `degrees`, `triplet`, `tripletDescription`, `progressions`, and `explanations`. Use the existing major copy unchanged. Define the minor mode with natural-minor Nashville degrees `1m | 2° | b3 | 4m | 5m | b6 | b7`, minor-focused triplet `1m | 4m | 5m`, and the same six section cards adapted to the minor labels. Export `harmonicModes` and `HarmonicModeId` so route components cannot use arbitrary mode strings.

- [ ] **Step 4: Add the typed TanStack route tree**

Implement `src/router.tsx` using `createRootRoute`, `createRoute`, `createRouter`, `Outlet`, and `RouterProvider`:

```tsx
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFound />,
});

const majorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <HarmonicPage mode="major" />,
});

const minorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/menor',
  component: () => <HarmonicPage mode="minor" />,
});

const routeTree = rootRoute.addChildren([majorRoute, minorRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

`NotFound` must include a typed `<Link to="/">Voltar para o maior</Link>`. `src/main.tsx` renders `<RouterProvider router={router} />` with `ReactDOM.createRoot`.

- [ ] **Step 5: Add the minimal shared app component**

Create `HarmonicPage({ mode }: { mode: HarmonicModeId })` in `src/App.tsx`, look up `harmonicModes[mode]`, and render the title, links, and mode title. Use:

```tsx
<nav aria-label="Campo harmônico">
  <Link to="/" activeProps={{ 'aria-current': 'page' }}>MAIOR</Link>
  <Link to="/menor" activeProps={{ 'aria-current': 'page' }}>MENOR</Link>
</nav>
```

- [ ] **Step 6: Run focused tests and type-check through the production build**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit -- tests/app-shell.test.js tests/modes.test.js && npm run build`

Expected: both tests pass and Vite emits `dist/index.html` without TypeScript or route errors.

### Task 3: Migrate the Existing Page into React Components

**Files:**
- Modify: `src/App.tsx`
- Create: `src/styles.css`
- Modify: `index.html`
- Test: `tests/theme.test.js`

- [ ] **Step 1: Write the failing render-contract assertions**

Extend `tests/theme.test.js` to read `src/App.tsx` and assert that it contains `Sistema Nashville de Comunicação`, `Progressões Mais Comuns`, `Como as Músicas Escondem os Padrões`, and `<Link to="/menor"`. This fails until the full page is moved into the React component.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit -- tests/theme.test.js`

Expected: FAIL because those strings still live only in the old static document.

- [ ] **Step 3: Extract the page into small typed React pieces**

In `src/App.tsx`, keep one file but use focused functions: `Header`, `SectionHeading`, `ProgressionCard`, `ExplanationCard`, and `HarmonicPage`. Map the mode data into the existing three numbered sections. Render the title and active menu beside each other in a responsive flex header. Use `aria-current` only on the active TanStack link and preserve keyboard focus styles.

- [ ] **Step 4: Move global CSS and preserve the visual system**

Create `src/styles.css` with the current `html`, `body`, `.grain`, `.section-line`, `.glow-border`, typography utility, hero, and mobile rules. Import it from `src/main.tsx`. Remove the duplicated `<style>` block from `index.html`; leave Tailwind CDN configuration in the document head because the existing class vocabulary relies on it.

- [ ] **Step 5: Run unit tests and verify the production page**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:unit && npm run build`

Expected: all unit tests pass and the built app contains the React entry and both menu labels.

### Task 4: Verify Browser Navigation and Responsive Behavior

**Files:**
- Create: `e2e/harmonic-navigation.spec.js`

- [ ] **Step 1: Write the failing browser test**

```js
import { test, expect } from '@playwright/test';

test('navigates between major and minor harmonic fields', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MENOR' })).toHaveAttribute('href', '/menor');

  await page.getByRole('link', { name: 'MENOR' }).click();
  await expect(page).toHaveURL(/\/menor$/);
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Menor)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MENOR' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('link', { name: 'MAIOR' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
});
```

- [ ] **Step 2: Run the browser test and confirm the initial failure**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test:e2e -- e2e/harmonic-navigation.spec.js`

Expected: FAIL before the React route and link implementation is complete.

- [ ] **Step 3: Make the browser test pass**

Ensure the Vite history fallback serves the React shell at `/menor`, the TanStack route tree recognizes the path, and the links render real anchors rather than click-only buttons.

- [ ] **Step 4: Run the full verification suite**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run test`

Expected: all unit and mobile Playwright tests pass.

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run build`

Expected: production build succeeds.

- [ ] **Step 5: Inspect the final diff and working tree**

Run: `git status --short` and `git diff -- index.html package.json vite.config.js src tests e2e`

Confirm only the React migration, typed routes, harmonic mode data, tests, and design/plan documents are present. This workspace is not currently a Git repository, so do not attempt a commit unless repository metadata becomes available.
