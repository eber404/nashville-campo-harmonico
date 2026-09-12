import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'bash -c "source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npm run dev -- --host 0.0.0.0"',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      SHELL: '/bin/zsh',
    },
  },
  projects: [
    {
      name: 'chromium-mobile',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
        baseURL: 'http://127.0.0.1:5173',
      },
    },
  ],
});
