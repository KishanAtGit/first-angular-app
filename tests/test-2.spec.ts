import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('RxJs & Observables', () => {

    test('dynamic counter test', async ({ page }) => {

        let counterValue = 1;
        const counterText = () => `Counter: ${counterValue}`;

        // Check initial value
        await expect(page.locator('h3')).toHaveText(counterText());
        let counter = Number(await page.getByTestId('counter-check').textContent());
        expect(counterValue).toBe(counter);

        // Click Increment (adds 1)
        await page.getByRole('button', { name: 'Increment' }).click();
        counterValue += 1;
        await expect(page.locator('h3')).toHaveText(counterText());
        counter = Number(await page.getByTestId('counter-check').textContent());
        expect(counterValue).toBe(counter);

        // Click Increment again
        await page.getByRole('button', { name: 'Increment' }).click();
        counterValue += 1;
        await expect(page.locator('h3')).toHaveText(counterText());
        counter = Number(await page.getByTestId('counter-check').textContent());
        expect(counterValue).toBe(counter);


        // Click Decrement (subtracts 2)
        await page.getByRole('button', { name: 'Decrement' }).click();
        counterValue -= 2;
        await expect(page.locator('h3')).toHaveText(counterText());
        counter = Number(await page.getByTestId('counter-check').textContent());
        expect(counterValue).toBe(counter);
    });

    test('should load observable values from 1 to 5', async ({ page }) => {
        await page.locator('app-housing-location').filter({ hasText: 'Acme Fresh Start' }).getByRole('link').click();

        // Click the button
        await page.getByRole('button', { name: 'Test Observable' }).click();

        // Wait until 5 items appear
        await expect(page.locator('.test-observable div')).toHaveCount(5, { timeout: 8000 });

        // Validate that the values are 1 through 5
        const values = await page.locator('.test-observable div').allTextContents();
        const expectedValues = ['1', '2', '3', '4', '5'];

        expect(values).toEqual(expectedValues);
    });
})

