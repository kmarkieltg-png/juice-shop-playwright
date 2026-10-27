# Main page

## Acceptance criteria

1. **Open the main page**
   - Given the user opens the Juice Shop application
   - Then the user is taken to `/search` and the product catalog is displayed.

2. **Browse products**
   - Given the user is on `/search`
   - Then each product in the catalog shows its name, price, and an option to add it to the basket.

3. **Search for a product**
   - Given the user is on `/search`
   - When the user searches for a product by name
   - Then the catalog shows products matching the search.

4. **Show no results for an unmatched search**
   - Given the user is on `/search`
   - When the user searches for a name that does not match any product
   - Then no products are shown as search results.

5. **Add a product to the basket**
   - Given the user is viewing a product in the catalog
   - When the user selects the option to add that product to the basket
   - Then the basket count increases and the product appears in the basket.