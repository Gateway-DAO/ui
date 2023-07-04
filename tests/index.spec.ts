import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { navigateTo } from './events/base.events';
dotenv.config();

test.describe('Index flow', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should navigate to the explore page', async () => {
    await navigateTo(page, '/');
    await page.click('text=Open App');
    await expect(page).toHaveURL(`${process.env.TEST_BASEURL}/explore`);
  });
});
