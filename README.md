# Final Project – Playwright Test Suite

## Overview

This project contains automated UI tests for the SauceDemo web application built with Playwright and TypeScript.

The test suite validates the main user journey:

**Login → Cart → Checkout**

## Test Target

SauceDemo web application

https://www.saucedemo.com

## Covered Scenarios

### Login functionality

* Standard user can log in and see the inventory page
* Locked user cannot log in and sees the correct error message
* User sees an error message when the password is incorrect
* User sees a validation error when the username is empty

### Cart functionality

* Cart badge shows the correct count after adding a product
* Cart page shows the selected product
* Removing a product updates the cart
* Cart badge shows the correct count after adding multiple products

### Checkout functionality

* User can complete checkout successfully

## Project Structure

```text
pages/
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
└── CheckoutPage.ts

test-data/
└── users.ts

tests/
├── login.spec.ts
├── cart.spec.ts
└── checkout.spec.ts

playwright.config.ts
```

## Technologies

* Playwright
* TypeScript
* Page Object Model (POM)

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in Chromium only:

```bash
npx playwright test --project=chromium
```

Run tests multiple times to verify stability:

```bash
npx playwright test --repeat-each=3
```

## Viewing the Report

```bash
npx playwright show-report
```

## Design Decisions

* Page Object Model is used to improve maintainability and readability
* Test data is separated from test logic
* Semantic locators are used (`getByTestId`, `getByRole`)
* Tests are independent and can run in any order
* Shared setup is implemented with `beforeEach`
* Web-first assertions are used throughout the project

## Notes

* No hard waits (`waitForTimeout`) are used
* Assertions rely on Playwright auto-waiting
* The checkout flow uses `test.step()` for improved reporting

## Known Limitations

* The suite covers only the selected user journey
* Product sorting functionality was not implemented
* Not all possible edge cases are covered
