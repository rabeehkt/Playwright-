const {test,expect,request} =require('@playwright/test');

const {  basictest } = require('../utils/Eventhub.js');


basictest('Create booking through API', async ({
  authenticatedPage,token,
  createEvents
}) => {

    await authenticatedPage.goto(
    'https://eventhub.rahulshettyacademy.com/events'
  );
 await authenticatedPage.pause();
  await expect(
    authenticatedPage.getByText('Tech Summit 2026')
  ).toBeVisible({ timeout: 15000 });

});