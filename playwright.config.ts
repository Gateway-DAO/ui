import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const baseURL = process.env.TEST_BASEURL || 'http://localhost:3000';

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
  globalSetup: './tests/config/globalSetup.ts',
  use: {
    baseURL,
    storageState: './tests/config/storageState.json',
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
