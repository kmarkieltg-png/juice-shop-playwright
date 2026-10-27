import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { productPage } from '../page-objects/product-page';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const welcomeDialog = page.getByRole('dialog').filter({
        has: page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' })
    })
    await welcomeDialog.getByRole('button', { name: 'Close Welcome Banner' }).click()
})



test('Add product to basket ', async ({ page }) => {
    const productName = 'Basil Smoothie'
    const quantity = 2
    const navigateTo = new productPage(page)
    await navigateTo.AddSelectedProductToBasket(productName, quantity)
    await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText(String(quantity))
    await page.getByLabel('Show the shopping cart').click()
    await expect(page.getByRole('heading', { name: 'Your Basket' })).toBeVisible()
    const productRow = page.getByRole('row', { name: productName })
    await expect(productRow).toBeVisible()
    await expect(productRow).toContainText(String(quantity))
})

