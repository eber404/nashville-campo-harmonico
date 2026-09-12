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
