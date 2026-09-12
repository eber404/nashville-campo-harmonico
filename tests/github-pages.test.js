import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

describe('GitHub Pages deployment', () => {
  it('derives the Vite base path from the repository name', () => {
    const viteConfig = fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8');
    const router = fs.readFileSync(path.join(root, 'src/router.tsx'), 'utf8');

    expect(viteConfig).toContain('GITHUB_REPOSITORY');
    expect(viteConfig).toContain('base:');
    expect(router).toContain('basepath:');
  });

  it('defines an Actions workflow that publishes the built dist directory', () => {
    const workflowPath = path.join(root, '.github/workflows/deploy-pages.yml');

    expect(fs.existsSync(workflowPath)).toBe(true);
    const workflow = fs.readFileSync(workflowPath, 'utf8');
    expect(workflow).toContain('actions/upload-pages-artifact');
    expect(workflow).toContain('actions/deploy-pages');
    expect(workflow).toContain('dist');
  });
});
