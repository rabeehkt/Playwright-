

const {test,expect} =require('@playwright/test');
const { setTimeout } = require('node:timers');

function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 10); // tomorrow

  const pad = n => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function login(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  const password = 'Test123@';
  const username = 'rabeehktvpm@gmail.com';

  await page.getByPlaceholder('you@email.com').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'Browse Events →' })
  ).toBeVisible();
}




test('Booking page actions', async ({page}) => {
     const BASE_URL= 'https://eventhub.rahulshettyacademy.com'
    await login(page);
    await page.getByRole("button",{name:'Admin'}).click();
    await page.getByRole("link",{name:'Manage Events'}).first().click();
    const Eventtitle=`Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(Eventtitle);
    await page.locator('#admin-event-form textarea').fill('New Event for');
   await  page.getByLabel("city").fill('Kochi');
    await page.getByLabel("venue").fill('InfoPark Kakkanad');
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel('Price ($)').fill('100.00');
    await page.getByLabel('Total Seats').fill('50');
   await  page.locator('#add-event-btn').click();
   await  expect(page.getByText('Event created!')).toBeVisible();

    await page.locator('#nav-events').click();

    const eventcards= page.locator('#event-card');
  
    const createdeventcard = eventcards.filter({
    has: page.getByText(Eventtitle, { exact: true })
});

await expect(createdeventcard).toBeVisible({ timeout: 5000 });

    const seatsBeforeBooking = (await createdeventcard.getByText(/seats available/i).innerText()).split(' ')[0];
    await createdeventcard.locator('#book-now-btn').click();
    expect(page.locator('#ticket-count')).toContainText('1');
    await page.getByLabel('Full name').fill('Akash');
    await page.locator('#customer-email').fill('akash@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('9999912345');
    await page.locator('button.confirm-booking-btn').click();
    const bookingidloc=page.locator('.booking-ref');

    await expect(bookingidloc).toBeVisible();
    const bookref = (await bookingidloc.innerText()).trim();
 await page.locator('#nav-bookings').click();
 await expect(page).toHaveURL(`${BASE_URL}/bookings`);
 const bookingcards =page.locator('#booking-card');
 await expect(bookingcards.first()).toBeVisible();
 const matchedCard = bookingcards.filter({
    has: page.locator('.booking-ref').filter({ hasText: bookref })
});

await expect(matchedCard).toBeVisible();

await expect (matchedCard).toContainText(Eventtitle);

await page.locator('#nav-events').click();
await expect(page.locator('#event-card').first()).toBeVisible();

await expect(createdeventcard).toBeVisible();
const seatsAfterBooking = (await createdeventcard.getByText(/seats available/i).innerText()).split(' ')[0];

await expect(seatsAfterBooking===seatsBeforeBooking-1)















});



/*




- Assert: seatsAfterBooking === seatsBeforeBooking - 1













*/
