// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/components/Tests', // Directory containing your test files
  timeout: 30000, // Timeout for each test
  retries: 1, // Retries on test failure
  use: {
    headless: true, // Run tests in headless mode
    baseURL: 'http://localhost:5173', // Replace with your Vite server URL if needed
  },
  reporter: [
    ['html', { open: 'never' }], // HTML report
    ['json', { outputFile: 'results.json' }], // JSON report
    ['junit', { outputFile: 'results.xml' }]  // JUnit report
  ],
});
