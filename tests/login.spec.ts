import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { navigateTo } from './events/base.events';
dotenv.config();

test.describe('Login flow', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should open dialog on click to connect wallet', async () => {
    await navigateTo(page, '/explore');
    await page.click('text=Connect Wallet');
    await page.waitForSelector('text=Sign In');
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('should open dialog on click on EVM', async () => {
    await navigateTo(page, '/explore');
    await page.click('text=Connect Wallet');
    await page.click('text=EVM');
    await expect(
      page.locator('#rk_connect_title:has-text("Connect a Wallet")')
    ).toBeVisible();
  });

  test('should close dialog on click on Cancel', async () => {
    await navigateTo(page, '/explore');
    await page.click('text=Connect Wallet');
    await page.click('text=Cancel');
    await expect(
      page.locator('#rk_connect_title:has-text("Connect a Wallet")')
    ).not.toBeVisible();
  });

  // test('user information shown upon succeed login', async () => {
  //   await navigateTo(page, '/explore');
  //   await page.click('text=Connect Wallet');
  //   await page.click('text=EVM');
  //   await page.click('text=Metamask');
  //   await expect(
  //     page.locator('.MuiPaper-root p:has-text("Disconnect')
  //   ).toBeVisible();
  // });
});
