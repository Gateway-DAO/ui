import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

import { navigateTo } from './events/base.events';
dotenv.config();

test.describe('Credential issue flow', async () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await navigateTo(page, '/model/efe039f0-5451-400f-8250-e2401b40230d');
    await page.click('text=Issue Credential');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should open model upon click to Issue credential', async () => {
    await page.waitForSelector('div[role="dialog"]');
    await expect(page.locator('h5:text("Issue Credential")')).toBeVisible();
  });

  test('should have all field filled with the correct data', async () => {
    await page.waitForSelector('div[role="dialog"]');
    await expect(page.locator('h5:text("Issue Credential")')).toBeVisible();
    await page.fill('input[name="claim.integerField"]', '21');

    expect(
      await page.locator('input[name="claim.integerField"]').inputValue()
    ).toBe('21');

    await page.fill('input[name="claim.stringField"]', 'Test string');
    expect(
      await page.locator('input[name="claim.stringField"]').inputValue()
    ).toBe('Test string');

    await page.fill('#data-model-field-arrayField-0', 'test array 1');
    expect(
      await page.locator('#data-model-field-arrayField-0').inputValue()
    ).toBe('test array 1');

    await page.fill(
      '#issuanceflow-textfield-recipient',
      '0xAED8e054F0D185a524879753c5178EE7709a0F15'
    );
    expect(
      await page.locator('#issuanceflow-textfield-recipient').inputValue()
    ).toBe('0xAED8e054F0D185a524879753c5178EE7709a0F15');
  });

  test('should have input fields filled as expected', async () => {
    await page.waitForSelector('div[role="dialog"]');
    await expect(page.locator('h5:text("Issue Credential")')).toBeVisible();
    await page.fill('input[name="claim.integerField"]', '21');
    await page.fill('input[name="claim.stringField"]', 'Test string');
    await page.fill('#data-model-field-arrayField-0', 'test array 1');
    await page.fill(
      '#issuanceflow-textfield-recipient',
      '0xAED8e054F0D185a524879753c5178EE7709a0F15'
    );

    await page.click('#issuanceflow-button-issue');
    await page.waitForSelector('h5:has-text("Credential issued successfully")');

    expect(
      await page.locator('h5:has-text("Credential issued successfully")')
    ).toBeVisible();
  });

  test('should fill in the form and submit with success', async () => {
    await page.waitForSelector('div[role="dialog"]');
    await expect(page.locator('h5:text("Issue Credential")')).toBeVisible();
    await page.fill('input[name="claim.integerField"]', '21');
    await page.fill('input[name="claim.stringField"]', 'Test string');
    await page.fill('#data-model-field-arrayField-0', 'test array 1');
    await page.fill(
      '#issuanceflow-textfield-recipient',
      '0xAED8e054F0D185a524879753c5178EE7709a0F15'
    );

    await page.click('#issuanceflow-button-issue');
    await page.waitForSelector('h5:has-text("Credential issued successfully")');

    expect(
      await page.locator('h5:has-text("Credential issued successfully")')
    ).toBeVisible();
  });

  test('should return error validation trying to send without fill', async () => {
    await page.waitForSelector('div[role="dialog"]');
    await expect(page.locator('h5:text("Issue Credential")')).toBeVisible();
    await page.click('#issuanceflow-button-issue');

    expect(await page.locator('text=must be integer')).toBeVisible();
  });
});
