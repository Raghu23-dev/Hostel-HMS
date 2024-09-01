// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:5173/');
//   await page.getByRole('link', { name: 'Admin Login' }).click();
//   await page.getByPlaceholder('Email').click();
//   await page.getByPlaceholder('Email').fill('raghu2308.dev@gmail.com');
//   await page.getByPlaceholder('Email').press('Tab');
//   await page.getByPlaceholder('Password').fill('123456789');
//   await page.getByPlaceholder('Password').press('Enter');
//   await page.locator('video').click();
//   await page.getByText('14Total Rooms').click();
//   await page.getByText('11Rooms Occupied').click();
//   await page.getByText('70Total Suggestions').click();
//   await page.getByText('2Total Complaints').click();
//   await page.getByText('26').click();
//   await page.locator('div').filter({ hasText: '14Total Rooms11Rooms' }).nth(3).click();
//   await page.getByText('2', { exact: true }).click();
//   await page.getByRole('link', { name: 'Register Student' }).click();
//   await page.getByRole('link', { name: 'All Students' }).click();
//   await page.getByRole('link', { name: 'Attendance' }).click();
//   await page.getByRole('link', { name: 'Complaints' }).click();
//   await page.getByRole('link', { name: 'Suggestions' }).click();
//   await page.getByRole('link', { name: 'Home' }).click();
// });