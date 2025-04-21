import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByTestId('city-filter').click();
  await page.getByTestId('city-filter').fill('New York');
  await page.getByRole('button', { name: 'Search' }).click();
});