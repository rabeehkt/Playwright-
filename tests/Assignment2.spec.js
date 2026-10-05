
const {test,expect} = require ('@playwright/test')
const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const password = 'Test123@';
const username = 'rabeehktvpm@gmail.com';

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'Browse Events →' })
  ).toBeVisible();
}


test('Single ticket booking is eligible for refund', async ({page}) => {
    await login(page);
    await page.goto(`${BASE_URL}/events`);
    await page.locator('#event-card').first().locator('#book-now-btn').click();
    await page.getByPlaceholder('Your full name').fill('Akash');
    await page.getByPlaceholder('you@email.com').fill('Akash@gmail.com');
    await page.locator('#phone').fill('9999123456');
    await page.locator('#confirm-booking').click();
await page.locator('#nav-bookings').click()
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByRole("button",{name:"View Details"}).first().click();
await expect(page.getByText('Booking Information')).toBeVisible();

const bookingref = await page.locator('span.font-mono').first().textContent()
const title =await page.locator('h1.font-bold').textContent()
await expect(bookingref?.trim().charAt(0)).toBe(title?.trim().charAt(0));
await page.locator('#check-refund-btn').click();
await expect(page.locator('#refund-spinner')).toBeVisible();
await expect(page.locator('#refund-spinner')).toBeHidden({timeout:6000});
const refundres = await page.locator('#refund-result')
await expect(refundres).toBeVisible();
await expect(refundres).toContainText('Eligible for refund');
await expect(refundres).toContainText('Single-ticket bookings qualify for a full refund');








})


test(' Group ticket booking is NOT eligible for refund', async ({page}) => {
     await login(page);
    await page.goto(`${BASE_URL}/events`);
    await page.locator('#event-card').first().locator('#book-now-btn').click();
    await page.getByRole("button",{name:"+"}).dblclick();
    await page.getByPlaceholder('Your full name').fill('Akash');
    await page.getByPlaceholder('you@email.com').fill('Akash@gmail.com');
    await page.locator('#phone').fill('9999123456');
    await page.locator('#confirm-booking').click();
   

await page.locator('#nav-bookings').click()
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByRole("button",{name:"View Details"}).first().click();
await expect(page.getByText('Booking Information')).toBeVisible();

const bookingref = await page.locator('span.font-mono').first().textContent()
const title =await page.locator('h1.font-bold').textContent()
await expect(bookingref?.trim().charAt(0)).toBe(title?.trim().charAt(0));
await page.locator('#check-refund-btn').click();
await expect(page.locator('#refund-spinner')).toBeVisible();
await expect(page.locator('#refund-spinner')).toBeHidden({timeout:6000});
const refundres = await page.locator('#refund-result')
await expect(refundres).toContainText('Not eligible for refund');
await expect(refundres).toContainText('Group bookings (3 tickets) are non-refundable');


});