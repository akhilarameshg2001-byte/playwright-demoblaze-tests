# playwright Test Automation - Demoblaze
UI test automation framework for the Demoblaze demo e-commerce website, built with playwright (Javascript) and the Page Object Model.
## What is tested
10 UI test cases covering:
- Signup and account creation
- Login and logout
- Product browsing
- Add to cart
- Checkout and placing an order
## Tech stack
- Playwright (Javascript)
- Page Object Model (POM)
- Data-driven tests (`Test-Data/`)
- Cross-browser execution (see `playwright.config.js`)
- Github Actions workflow (`.github/workflows`)
## Project structure

    pages/       Page Object classes (Login, Signup, Home, Product, Cart, Checkout)
    tests/       Test specs
    Test-Data/   Test data
    playwright.config.js

## How to run

    npm install
    npx playwright install
    npx playwright test
    npx playwright show-report

## Author

Akhila Ramesh G | Trivandrum, India

https://www.linkedin.com/in/akhila-ramesh-g/
