# shadcn Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current custom-styled single-page layout with a shadcn-style UI built from reusable component primitives.

**Architecture:** Keep the app as a Vite single page, but move repeated UI patterns into small React components that mirror shadcn primitives. Use a minimal component layer for `Card`, `Badge`, and section markers, then restyle the page with the shadcn visual language: neutral borders, muted backgrounds, higher whitespace, and stronger typography hierarchy.

**Tech Stack:** Vite, React, Tailwind CSS, shadcn-style component patterns, Vitest, Playwright.

---

### Task 1: Bootstrap React App Shell

**Files:**
- Modify: `package.json`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Modify: `index.html`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('app shell', () => {
  it('loads a React root entry', () => {
    const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
    expect(html).toContain('src/main.jsx');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit`
Expected: FAIL because `src/main.jsx` is not referenced yet.

- [ ] **Step 3: Write minimal implementation**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json index.html src/main.jsx src/App.jsx src/styles.css
git commit -m "feat: bootstrap react shell"
```

### Task 2: shadcn-style Components

**Files:**
- Create: `src/components/ui/card.jsx`
- Create: `src/components/ui/badge.jsx`
- Create: `src/components/ui/section-heading.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write the failing test**

```js
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('ui primitives', () => {
  it('defines shadcn-style card markup', () => {
    const app = fs.readFileSync(path.resolve(process.cwd(), 'src/App.jsx'), 'utf8');
    expect(app).toContain('Card');
    expect(app).toContain('Badge');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit`
Expected: FAIL because the components are not created yet.

- [ ] **Step 3: Write minimal implementation**

```jsx
export function Card({ className = '', children }) {
  return <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>{children}</div>;
}
```

```jsx
export function Badge({ className = '', children }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
}
```

```jsx
export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      {description ? <p className="text-muted-foreground">{description}</p> : null}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/card.jsx src/components/ui/badge.jsx src/components/ui/section-heading.jsx src/App.jsx
git commit -m "feat: add shadcn-style primitives"
```

### Task 3: Migrate Page Layout

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Write the failing test**

```js
import { test, expect } from '@playwright/test';

test('uses shadcn-style layout on mobile', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  await expect(page.getByRole('heading', { name: 'Campo Harmônico (Maior)' })).toBeVisible();
  await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(9, 9, 11)');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e`
Expected: FAIL because the current layout is still custom-styled and not shadcn-like.

- [ ] **Step 3: Write minimal implementation**

```jsx
// Replace the current custom cards and section blocks with Card + Badge + SectionHeading.
// Use neutral surfaces, softer borders, and shadcn spacing/typography.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: migrate layout to shadcn style"
```

### Task 4: Final Verification

**Files:**
- None

- [ ] **Step 1: Run the full suite**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Validate visually on mobile**

Run: `npm run test:e2e`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: convert ui to shadcn style"
```
