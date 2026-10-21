import { test, expect } from '@playwright/test';
import { loginPage, registrationPage } from '../page-objects/registration-and-login-page';
import { faker } from '@faker-js/faker';


test('login with valid data', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()
    await navigateTo.loginWithCredentials(process.env.Test_User_Mail!, process.env.Test_User_Password!)
    await expect(page).toHaveURL(/#\/search$/)
    await page.getByRole('button', { name: 'Account ' }).click()
    await expect(page.locator('.mat-mdc-menu-content')).toContainText(process.env.Test_User_Mail!)
})

test('login with unregistered email', async ({ page }) => {
    const navigateTo = new loginPage(page)
    const email = faker.internet.email({ provider: 'test.com' })
    await navigateTo.loginPage()
    await navigateTo.loginWithCredentials(email, process.env.Test_User_Password!)
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
    await expect(page).toHaveURL(/#\/login$/)
})

test('login with incorrect password', async ({ page }) => {
    const navigateTo = new loginPage(page)
    const password = faker.internet.password()
    await navigateTo.loginPage()
    await navigateTo.loginWithCredentials(process.env.Test_User_Mail!, password)
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
    await expect(page).toHaveURL(/#\/login$/)
})

test('Login with malformed user login', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()
    await navigateTo.loginWithCredentials("'", "testpassword")
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
    // Fail: The login form displays "[object Object]" instead of a user-friendly validation message when an email with special characters is entered.
})

test('login with empty email field', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()
    await navigateTo.enterLoginData("", process.env.Test_User_Password!)
    await expect(page.getByText('Please provide an email address.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeDisabled()
})

test('login with empty password field', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()
    await navigateTo.enterLoginData(process.env.Test_User_Mail!, "")
    await page.getByRole('textbox', { name: 'Text field for the login password' }).blur()
    await expect(page.getByText('Please provide a password.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeDisabled()
})

test('show password', async ({ page }) => {
    const navigateTo = new loginPage(page)
    const password = faker.internet.password()
    const email = faker.internet.email({ provider: 'test.com' })
    await navigateTo.loginPage()
    await navigateTo.enterLoginData(email, password)
    await page.getByRole('button', { name: 'Button to display the password' }).click()
    await expect(page.getByRole('textbox', { name: 'Text field for the login password' })).toHaveValue(password)
})

test('login with remember me checkbox', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()
    await navigateTo.enterLoginData(process.env.Test_User_Mail!, process.env.Test_User_Password!)
    const rememberMeCheckbox = page.getByRole('checkbox', { name: ' Checkbox to stay logged in or not logged in ' })
    await rememberMeCheckbox.check()
    await expect(rememberMeCheckbox).toBeChecked()
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('button', { name: 'Account ' }).click()
    await expect(page.locator('.mat-mdc-menu-content')).toContainText(process.env.Test_User_Mail!)
})

test('login with google account', async ({ page }) => {
    const navigateTo = new loginPage(page)
    await navigateTo.loginPage()

    const googleLoginButton = page.getByRole('button', { name: 'Login with Google' })
    await expect(googleLoginButton).toBeVisible()

    const googleAuthRequestPromise = page.waitForRequest(request => {
        const url = new URL(request.url())
        return url.origin === 'https://accounts.google.com' &&
            url.pathname === '/o/oauth2/v2/auth'
    })
    await googleLoginButton.click()

    const googleAuthUrl = new URL((await googleAuthRequestPromise).url())
    expect(googleAuthUrl.searchParams.get('response_type')).toBe('token')
    expect(googleAuthUrl.searchParams.get('scope')).toBe('email')
    expect(googleAuthUrl.searchParams.get('redirect_uri')).toBe('https://local3000.owasp-juice.shop')
})