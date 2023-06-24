const { test, expect } = require("@playwright/test");
const { paste } = require("@testing-library/user-event/dist/paste");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

//test case to check the Add Task Button of the To Do App

test("To Do Addition Test", async ({ page }) => {
  page.get;
  const taskCount = await page.getByTestId("task").count();
  await page
    .locator('form[name="newtask"]')
    .getByRole("textbox")
    .type("Test Task 1");
  await page.getByRole("button", { name: "+" }).click();
  expect(await page.getByTestId("task").count()).toEqual(taskCount + 1);
});

//test case to check Delete Button of the To Do App

test("To Do Delete Test", async ({ page }) => {
  page.get;
  const taskCount = await page.getByTestId("task").count();
  await page.getByRole("button", { name: "Delete" }).first().click();
  expect(await page.getByTestId("task").count()).toEqual(taskCount - 1);
});

//test case to check the Completed Task Filter Button

test("Completed Task Flter", async ({ page }) => {
  page.get;
  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: "Completed Task: 1" }).click();
  expect(await page.getByTestId("task").count()).toEqual(1);
});

//test case to check the Remaining Task Filter Button

test("Remaining Task Flter", async ({ page }) => {
  page.get;
  await page.getByRole("checkbox").uncheck();
  await page.getByRole("button", { name: "Remaining Task: 1" }).click();
  expect(await page.getByTestId("task").count()).toEqual(1);
});

//test case to check the All Task Filter Button

test("All Task Flter", async ({ page }) => {
  page.get;
  await page.getByRole("button", { name: "Task Count: 1" }).click();
  expect(await page.getByTestId("task").count()).toEqual(1);
});
