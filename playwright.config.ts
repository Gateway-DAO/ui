import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'tests'),
  retries: 1,
  fullyParallel: true,
  outputDir: 'tests/test-results/',
  webServer: {
    command: 'pnpm build && pnpm start',
    port: 3000,
    timeout: 120 * 1000,
  },

  use: {
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
  ],
};
export default config;
