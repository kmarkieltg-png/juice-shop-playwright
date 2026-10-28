import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { productPage } from '../page-objects/product-page';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const welcomeDialog = page.getByRole('dialog').filter({
        has: page.getByRole('heading', { name: 'Welcome to OWASP Juice Shop!' })
    })
    await welcomeDialog.getByRole('button', { name: 'Close Welcome Banner' }).click()

    const cookieConsent = page.getByRole('dialog', { name: 'cookieconsent' })
    if (await cookieConsent.isVisible()) {
        await cookieConsent.getByRole('button', { name: 'dismiss cookie message' }).click()
    }
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

test('Add two different products to basket', async ({ page }) => {
    const productName1 = 'Basil Smoothie'
    const quantity1 = 2
    const productName2 = 'Carrot Juice (1000ml)'
    const quantity2 = 3
    const navigateTo = new productPage(page)
    await navigateTo.AddSelectedProductToBasket(productName1, quantity1)
    await navigateTo.AddSelectedProductToBasket(productName2, quantity2)
    await expect(page.getByRole('button', { name: 'Show the shopping cart' })).toContainText(String(quantity1 + quantity2))
    await page.getByLabel('Show the shopping cart').click()
    await expect(page.getByRole('heading', { name: 'Your Basket' })).toBeVisible()
    const productRow1 = page.getByRole('row', { name: productName1 })
    await expect(productRow1).toBeVisible()
    await expect(productRow1).toContainText(String(quantity1))
    const productRow2 = page.getByRole('row', { name: productName2 })
    await expect(productRow2).toBeVisible()
    await expect(productRow2).toContainText(String(quantity2))
})

test('items per page', async ({ page }) => {
    const itemsPerPage = page.getByRole('combobox', { name: 'Items per page:' })
    const paginator = page.locator('mat-paginator')
    const productCards = page.locator('mat-card')
    const totalProducts = Number((await paginator.innerText()).match(/of\s+(\d+)/)?.[1])
    expect(totalProducts).toBeGreaterThan(0)
    await itemsPerPage.press('Enter')
    const options = page.getByRole('listbox').getByRole('option')
    const pageSizes = await options.allTextContents()
    await itemsPerPage.press('Escape')
    for (const pageSize of pageSizes) {
        await paginator.scrollIntoViewIfNeeded()
        await itemsPerPage.press('Enter')
        await page.getByRole('listbox').getByRole('option', { name: pageSize.trim(), exact: true }).click()
        await expect(productCards).toHaveCount(Math.min(Number(pageSize), totalProducts))
    }
})