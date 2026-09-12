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
