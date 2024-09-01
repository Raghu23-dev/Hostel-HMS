import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto("http://localhost:5173/");
await page.getByRole('link', { name: 'Admin Login' }).click();
  await page.getByRole('link', { name: 'Student Login' }).click();
})