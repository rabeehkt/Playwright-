// Setup

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
let context;
const GMAIL_USER = 'rabeehktvpm@gmail.com';


// - Create Two accounts: ex : Yahoo email , Gmail email   - (Dummies can be ok no need of giving real emails)

// Have below link handy for API Documentation
// https://api.eventhub.rahulshettyacademy.com/api/docs/



const {test,expect,request} =require('@playwright/test');

async function loginAs(page, GMAIL_USER) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  const password = 'Test123@';
  

  await page.getByPlaceholder('you@email.com').fill(GMAIL_USER);
  await page.getByLabel('Password').fill(password);
  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'Browse Events →' })
  ).toBeVisible();


}


// ---

// Steps
test(' Navigate to Yahoos booking URL as Gmail user', async({browser})=>
{
context = await browser.newContext();
const apicontext = await request.newContext();

const loginResponse =await apicontext.post(  `https://api.eventhub.rahulshettyacademy.com/api/auth/login`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email: 'rabeeh@yahoo.com',
        password: 'secret123'
      }
    }
  );
console.log('Status:', loginResponse.status());
console.log('Response:', await loginResponse.text());
  expect(loginResponse.ok()).toBeTruthy()
   const loginResponsejson = await loginResponse.json();
  const token = loginResponsejson.token



// - Parse the JSON response and extract token — you will use this for all subsequent API calls



// Step 2 — Fetch events via API to get a valid event ID

const eventResponse = await apicontext.get(
  `https://api.eventhub.rahulshettyacademy.com/api/events`,
  {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
);
console.log('Status:', eventResponse.status());
console.log('Response:', await eventResponse.text());
expect(eventResponse.ok()).toBeTruthy();

const eventResponseJson = await eventResponse.json();

const eventid =eventResponseJson.data[0].id


// - Use request.get() to call GET /api/events - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Events/get_events)

// - Pass Authorization: Bearer <token> in the request headers

// - Assert the response is OK

// - Parse the JSON, read data[0].id — store this as eventId
const BookingResponse =await apicontext.post(  `https://api.eventhub.rahulshettyacademy.com/api/bookings`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
      data: {
        
  "eventId": eventid,
  "customerName": "Yahoo User",
  "customerEmail": "rabeeh@yahoo.com",
  "customerPhone": "+91-9876543210",
  "quantity": 1
}
}
    
  );

  console.log('Status:', BookingResponse.status());
console.log('Response:', await  BookingResponse.text());

  expect(BookingResponse.ok()).toBeTruthy();
  const BookingResponseJson = await BookingResponse.json();

const yahooBookingId =BookingResponseJson.data.id
const page = await context.newPage();
await loginAs(page,'rabeehktvpm@gmail.com');
await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`,{  waitUntil: 'networkidle' });
await page.pause()
await expect(
  page.getByText('Access Denied')
).toBeVisible();
await expect(
  page.getByText('You are not authorized to view this booking', {
    exact: false
  })
).toBeVisible();


});