# OWASP Juice Shop – Playwright Test Automation

## About the Project

This is a QA Automation portfolio project focused on testing
the OWASP Juice Shop web application using Playwright and TypeScript.

The project demonstrates UI test automation, form validation,
and the Page Object Model (POM) design pattern.

This project is a work in progress and is being developed
as part of my QA Automation learning journey.


## Local Setup

### 1. Clone the repositories

Clone both repositories into the same parent directory:

```bash
git clone https://github.com/juice-shop/juice-shop.git
git clone https://github.com/kmarkieltg-png/juice-shop-playwright.git
```

The directory structure should look like this:

```text
parent-directory/
├── juice-shop/
└── juice-shop-playwright/
```

### 2. Install dependencies

Install the OWASP Juice Shop dependencies and build its server:

```bash
cd juice-shop
npm install
npm run build:server
```

Install the test project dependencies and Playwright browsers:

```bash
cd ../juice-shop-playwright
npm install
npx playwright install
```

### 3. Configure test credentials

Create a local `.env` file in the root of
`juice-shop-playwright`:

```env
Test_User_Mail=your-test-email@example.com
Test_User_Password=your-test-password
sSecurity_question=your-security-question
anwser=your-anwser
```

Replace the example values with your test account credentials.

On a fresh Juice Shop installation, create this account in the
application before running the login tests.

Do not commit `.env` files or real credentials.


Playwright is configured to start the OWASP Juice Shop application
automatically before running the tests.

## Project Structure

- `tests/` – automated test specifications
- `page-objects/` – Page Object Model classes
- `playwright.config.ts` – Playwright configuration
- `package.json` – project dependencies and scripts
