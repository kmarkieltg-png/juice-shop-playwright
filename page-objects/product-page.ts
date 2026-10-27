import { Page } from "@playwright/test"

export class productPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async AddSelectedProductToBasket(product: string, quantity: number) {
        const productCard = this.page.locator('mat-card').filter({
            has: this.page.getByText(product, { exact: true }),
        })
        const addToBasketButton = productCard.getByRole('button', { name: 'Add to Basket' })
        for (let i = 0; i < quantity; i++) {
            await addToBasketButton.click()
        }
    }
}