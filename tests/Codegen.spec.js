import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').press('CapsLock');
  await page.locator('form input[name="name"]').fill('R');
  await page.locator('form input[name="name"]').press('CapsLock');
  await page.locator('form input[name="name"]').fill('Rabeeh');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('set@gmail.com');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.locator('div').filter({ hasText: 'Employed' }).nth(2).click();
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('1994-02-11');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('× Success! The Form has been')).toBeVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await expect(page.locator('#navbarResponsive')).toContainText('Checkout ( 2 ) (current)');
  await page.getByText('Checkout ( 2 ) (current)').click();
  await expect(page.getByRole('link', { name: 'iphone X' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Samsung Note' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  const deliveryLocation = page.getByRole('textbox', {
  name: 'Please choose your delivery'
});

// Enter delivery location
await deliveryLocation.fill('india');
//await page.locator('.suggestion').waitFor()
//await page.locator('.suggestion').click()

// Locate checkbox
const checkbox = page.locator('#checkbox2');

// Click the checkbox label
await page.locator('label[for="checkbox2"]').click();

// Verify checkbox is checked
await expect(checkbox).toBeChecked();

// Handle Terms and Conditions modal if it opens
const modal = page.getByRole('heading', {
  name: 'Terms And Conditions'
});

if (await modal.isVisible()) {
  await page.getByRole('button', {
    name: 'Close'
  }).last().click();
}

// Verify modal overlay is not blocking the page
await expect(
  page.locator('.nsm-overlay-open')
).toBeHidden();

// Verify delivery location
await expect(deliveryLocation).toHaveValue('india');

// Complete purchase
await page.getByRole('button', {
  name: 'Purchase'
}).click();

// Verify purchase success
await expect(
  page.getByText('Success! Thank you!', { exact: false })
).toBeVisible();
// Verify delivery location
await expect(deliveryLocation).toHaveValue('india');

// Verify checkout instructions
await expect(page.locator('app-checkout')).toContainText(
  'Please choose your delivery location. Then click on purchase button'
);

// Complete purchase
await page.getByRole('button', { name: 'Purchase' }).click();

// Verify purchase success
await expect(
  page.getByText('Success! Thank you!', { exact: false })
).toBeVisible();
});