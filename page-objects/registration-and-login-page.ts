import { Page, expect } from "@playwright/test"
import { faker } from "@faker-js/faker";

export class registrationPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async RegistrationPage() {
        await this.page.goto('/');
        const welcomeDialog = this.page.getByRole('dialog').filter({
            has: this.page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' })
        })
        await welcomeDialog.getByRole('button', { name: 'Close Welcome Banner' }).click()

        await this.page.getByRole('button', { name: 'Show/hide account menu' }).click()
        await this.page.getByRole('menuitem', { name: 'Go to login page' }).click()
        await this.page.getByRole('link', { name: 'Not yet a customer?' }).click()
    }

    async registerWithValidData(email: string, password: string, answer: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Field for the password' }).fill(password);
        await this.page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(password);

        const securityQuestion = this.page.getByRole('combobox', {
            name: 'Selection list for the security question',
        });
        await securityQuestion.locator('.mat-mdc-select-arrow-wrapper').click();

        const securityQuestionOptions = this.page.getByRole('listbox').getByRole('option');
        await expect(securityQuestionOptions.first()).toBeVisible();
        const optionCount = await securityQuestionOptions.count();
        const randomOptionIndex = faker.number.int({ min: 0, max: optionCount - 1 });
        await securityQuestionOptions.nth(randomOptionIndex).click();

        await this.page.getByRole('textbox', {
            name: 'Field for the answer to the security question',
        }).fill(answer);
        await this.page.getByRole('button', { name: 'Button to complete the registration' }).click();
    }

    async enterRegistrationData(email: string, password: string, answer: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Field for the password' }).fill(password);
        await this.page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(password);

        const securityQuestion = this.page.getByRole('combobox', {
            name: 'Selection list for the security question',
        });
        await securityQuestion.locator('.mat-mdc-select-arrow-wrapper').click();

        const securityQuestionOptions = this.page.getByRole('listbox').getByRole('option');
        await expect(securityQuestionOptions.first()).toBeVisible();
        const optionCount = await securityQuestionOptions.count();
        const randomOptionIndex = faker.number.int({ min: 0, max: optionCount - 1 });
        await securityQuestionOptions.nth(randomOptionIndex).click();

        await this.page.getByRole('textbox', {
            name: 'Field for the answer to the security question',
        }).fill(answer);


    }
}

export class loginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async loginPage() {
        await this.page.goto('/')
        const welcomeDialog = this.page.getByRole('dialog').filter({
            has: this.page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' })
        })
        await welcomeDialog.getByRole('button', { name: 'Close Welcome Banner' }).click()
        await this.page.getByRole('button', { name: 'Account' }).click()
        await this.page.getByRole('menuitem', { name: 'Login' }).click()
    }

    async enterLoginData(email: string, password: string) {

        await this.page.getByRole('textbox', { name: 'Text field for the login email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Text field for the login password' }).fill(password);
    }

    async loginWithCredentials(email: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Text field for the login email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Text field for the login password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login', exact: true }).click();
    }
}