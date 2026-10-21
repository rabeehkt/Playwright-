const base = require('@playwright/test');
const { expect, request } = require('@playwright/test');
let webcontext;

exports.basictest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com');

    const password = 'Test123@';
    const username = 'rabeehktvpm@gmail.com';

    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();

    await expect(
      page.getByRole('link', { name: 'Browse Events →' })
    ).toBeVisible();

    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webcontext = await browser.newContext({ storageState: 'state.json' });

    await use(page);
  },

  token: async ({ authenticatedPage }, use) => {
    const token = await authenticatedPage.evaluate(() => {
      return localStorage.getItem('eventhub_token');
    });
   

    await use(token);
  },

  createEvents: async ({ request,token }, use) => {
   
    const response = await request.post(
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          
  title: "Tech Summit 2026",
  description: "A premier technology conference.",
  category: "Conference",
  venue: "Bangalore International Centre",
  city: "Bangalore",
  eventDate: "2026-12-15T09:00:00.000Z",
  price: 1500,
  totalSeats: 500,
  imageUrl: "https://example.com/banner.jpg"

        },
      }
    );



    const eventresponse = await response.json();
      console.log('API Status:', response.status());
  console.log('Event Response:', eventresponse);

  expect(response.ok()).toBeTruthy();

    await use(eventresponse);
  },
});

