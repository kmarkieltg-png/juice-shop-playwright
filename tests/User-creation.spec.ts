import { test, expect } from '@playwright/test';
import { loginPage, registrationPage } from '../page-objects/registration-and-login-page';
import { faker } from '@faker-js/faker';


test('opening registration page', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await expect(page.getByText('User Registration')).toBeVisible()
});

test('show password advice', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await page.getByRole('switch', { name: 'Show Password Advice' }).click()

    const passwordadviceItems = [
        'contains at least one lower character',
        'contains at least one upper character',
        'contains at least one digit',
        'contains at least one special character',
        'contains at least 8 characters',
    ];

    for (const item of passwordadviceItems) {
        await expect(page.getByText(item, { exact: true })).toBeVisible()
    }
});

test('show password advice and then hide it', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await page.getByRole('switch', { name: 'Show Password Advice' }).click()
    await expect(page.getByText('contains at least one lower character', { exact: true })).toBeVisible()
    await page.getByRole('switch', { name: 'Show Password Advice' }).click()
    await expect(page.locator('mat-card-content')).not.toBeVisible()
});

test('Password with less than 5 characters', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const email = faker.internet.email({ provider: 'test.com' })
    const shortPassword = faker.internet.password({ length: 4 })
    await navigateTo.enterRegistrationData(email, shortPassword, 'test')
    await expect(page.getByText('Password must be 5-40 characters long. ')).toBeVisible()
    await expect(page.getByText('Password must be 5-40 characters long. ')).toHaveCSS('color', 'rgb(244, 67, 54)')
    await expect(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})

test('Password with more than 40 characters', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const email = faker.internet.email({ provider: 'test.com' })
    const longPassword = faker.internet.password({ length: 41 })
    await navigateTo.enterRegistrationData(email, longPassword, 'test')
    await expect(page.getByText('Password must be 5-40 characters long. ')).toBeVisible()
    await expect(page.getByText('Password must be 5-40 characters long. ')).toHaveCSS('color', 'rgb(244, 67, 54)')
    await expect(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})

test('missing security anwser', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const email = faker.internet.email({ provider: 'test.com' })
    const password = faker.internet.password()
    await navigateTo.enterRegistrationData(email, password, '')
    await page.getByRole('textbox', { name: 'Email' }).click()
    await expect(page.getByText(' Please provide an answer to your security question.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})


test('registration with invalid email', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const password = faker.internet.password()
    await navigateTo.enterRegistrationData('testmail', password, 'test')
    await expect(page.getByText('Email address is not valid.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})
test('registration with password mismatch ', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const password = faker.internet.password()
    const email = faker.internet.email({ provider: 'test.com' })
    await navigateTo.enterRegistrationData(email, password, 'test')
    await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(`${password}test`)
    await expect(page.getByText(' Passwords do not match')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})

test('registration with an existing email', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const email = faker.internet.email({ provider: 'test.com' })
    const password = faker.internet.password()
    await navigateTo.registerWithValidData(email, password, 'test')
    await expect(page.getByText('Registration completed successfully. You can now log in.')).toBeVisible()
    await page.getByRole('link', { name: 'Not yet a customer?' }).click()
    await navigateTo.registerWithValidData(email, password, 'test')
    await expect(page.getByText('Email must be unique', { exact: true })).toBeVisible()
})

test('registration with malformed email address', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await navigateTo.enterRegistrationData('""', 'testpassword', 'test')
    await expect(page).toHaveURL(/#\/register$/)
    await expect(page.getByText('Email address is not valid.')).toBeVisible()
})

test('User registration and login with valid data', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const email = faker.internet.email({ provider: 'test.com' })
    const password = faker.internet.password()
    await navigateTo.registerWithValidData(email, password, 'test')
    await expect(page.getByText('Registration completed')).toBeVisible()
    await expect(page).toHaveURL(/#\/login$/)
    const login = new loginPage(page);
    await login.loginWithCredentials(email, password);
    await expect(page).toHaveURL(/#\/search$/)
    await page.getByRole('button', { name: 'Account ' }).click()
    await expect(page.locator('.mat-mdc-menu-content')).toContainText(email)
})

test('Change the password field after filling the confirmation password', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const password = faker.internet.password()
    const email = faker.internet.email({ provider: 'test.com' })
    await navigateTo.enterRegistrationData(email, password, 'test')
    await page.getByRole('textbox', { name: 'Field for the password' }).fill('testwitchpassword')
    await expect.soft(page.getByText(' Passwords do not match')).toBeVisible()
    await expect.soft(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
    //FAIL: It is possible to register a new user after changing the password field with both password fields filled
})

test('Change the confirmation password after filling the first password field', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    const password = faker.internet.password()
    const email = faker.internet.email({ provider: 'test.com' })
    await navigateTo.enterRegistrationData(email, password, 'test')
    await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('testwitchpassword')
    await expect.soft(page.getByText(' Passwords do not match')).toBeVisible()
    await expect.soft(page.getByRole('button', { name: 'Button to complete the registration' })).toBeDisabled()
})

test('Password field letter counter', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await page.getByRole('textbox', { name: 'Field for the password' }).fill('a'.repeat(40))
    await expect(page.getByText('40/40', { exact: true })).toBeVisible()
    //FAIL: Letter counter for the password field is incorrectly set to max of 20 instead of 40
})

test('Password confirmation field letter counter', async ({ page }) => {
    const navigateTo = new registrationPage(page)
    await navigateTo.RegistrationPage()
    await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('a'.repeat(40))
    await expect(page.getByText('40/40', { exact: true })).toBeVisible()
})