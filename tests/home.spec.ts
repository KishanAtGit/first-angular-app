import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('localhost:4200');
})

test('has placeholder text', async ({ page }) => {
    await expect(page.getByPlaceholder('Filter by city')).toBeVisible();
})

test.describe('Input Test', () => {

    test("Should allow me to take input and show input value", async ({ page }) => {
        await page.getByTestId('city-filter').fill('New York');

        await expect(page.getByTestId('city-filter')).toHaveValue('New York');
    })

    test('should render all housing locations when input is empty', async ({ page }) => {
        // Clear the input field if it's not already empty
        await page.getByTestId('city-filter').fill('');

        // Click the search button
        await page.getByRole('button', { name: /search/i }).click();

        const housingCounts = await page.locator('#housing-count').textContent();
        const expectedCount = Number(housingCounts)

        const housingCards = page.locator('app-housing-location');
        await expect(housingCards).toHaveCount(expectedCount);
    });

    // test('Should increase the count by 1 when clicked Increment button and should decrease the count by 2 when clicked Decreament button', async ({ page }) => {

    // })

})

