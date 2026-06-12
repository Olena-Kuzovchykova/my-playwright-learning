# Final Project Test Plan

## Target Site
SauceDemo
https://www.saucedemo.com

## Project Scope
The project covers the main user journey including login, cart management, and checkout.

## Test Cases

### 1. Verify that a valid user can log in and access the inventory page
Expected Result:
- User is redirected to the inventory page
- Products page is displayed

### 2. Verify that a locked user cannot log in and sees the correct error message
Expected:
- Error message "Sorry, this user has been locked out." is displayed

### 3. Verify that a user can add two products to the cart and the badge count updates correctly
Expected Result:
- Cart badge displays "2"

### 4. Verify that a user can remove a product from the cart and the badge count updates correctly
Expected Result:
- Cart badge updates from "2" to "1"

### 5. Verify that a user can complete checkout and see the order confirmation message
Expected Result:
- Order is completed successfully
- "Thank you for your order!" message is displayed