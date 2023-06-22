import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

import { navigateTo } from './events/base.events';
dotenv.config();

test.describe('Organization Signup flow', async () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await navigateTo(page, '/explore');
    (
      await page.waitForSelector(
        'nav[aria-label="sidebar navigation"] ul > button:last-child'
      )
    ).isVisible();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('open signup modal', async () => {
    await page.click(
      'nav[aria-label="sidebar navigation"] ul > button:last-child'
    );
    expect(
      page.locator('h4:has-text("Create your organization profile")')
    ).toBeVisible();
  });

  test('finish the flow with success', async () => {
    await page.click(
      'nav[aria-label="sidebar navigation"] ul > button:last-child'
    );
    await page.click("text=Let's get started");
    await page
      .locator('input[name="name"]')
      .fill(`E2E Test Organization ${Date.now()}`);
    await page.click('text=Continue');
    await page.locator('input[name="gatewayId"]').type(`e2etest_${Date.now()}`);
    await page.click('text=Continue');
    await page.locator('input[name="categories"]').type('Defi');
    await page.locator('li:has-text("Defi")').click();
    await page.click('text=Continue');
    await page
      .locator('textarea[name="about"]')
      .type('E2E Test Organization About');
    await page.click('text=Continue');
    await page.locator('input[name="website"]').focus();
    await page.locator('input[name="website"]').type('mygateway.xyz');
    await page.click('text=Continue');
    await page.locator('input[name="email"]').type('e2e@mygateway.xyz');
    await page.click('text=Continue');
    await page.locator('input[name="role"]').type('E2e Quality Assurance');
    await page.click('text=Continue');
    await page.locator('input[name="twitter"]').type('Gateway_xyz');
    await page.click('text=Continue');
    await page.locator('input[name="telegram"]').type('Gateway_xyz');
    await page.click('text=Finish');
    const successfulMessage = await page.locator(
      'text=Aplication submitted sucessfully'
    );
    await successfulMessage.waitFor({
      state: 'visible',
    });
    expect(
      await page.locator('text=Aplication submitted sucessfully')
    ).toBeVisible();
  });
});
