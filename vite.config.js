import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserPagesRepository = repositoryName?.endsWith('.github.io');
const base = process.env.VITE_BASE_PATH ?? (
  repositoryName && !isUserPagesRepository ? `/${repositoryName}/` : '/'
);

export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    host: '0.0.0.0',
    allowedHosts: ['minipc.lan'],
  },
});
