import { test, expect } from '@playwright/test';

test('should navigate to the explore page', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.click('text=Open App');
  await expect(page).toHaveURL('http://localhost:4200/explore');
});
