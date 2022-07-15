Cypress.Commands.add("getProductsFixture", function () {
  cy.fixture("products.json").then(({ products, product }) => {
    this.products = products;
    this.product = product;
  });
});
Cypress.Commands.add("createProduct", function () {
  const product = this.product;
  cy.findByPlaceholderText(/name/i).type(product.name);
  cy.findByPlaceholderText(/description/i).type(product.description);
  cy.get("input[type='file']").attachFile("product.jpg");
  cy.findByPlaceholderText(/brand/i).type(product.brand);
  cy.findByPlaceholderText(/category/i).type(product.category);
  cy.findByPlaceholderText(/price/i).type(product.price);
  cy.findByPlaceholderText(/stock/i).type(product.stockCount);
  cy.findByRole("button", { name: /save/i }).click();
});

Cypress.Commands.add("editProduct", function () {
  const product = this.product;
  cy.findByPlaceholderText(/name/i).clear().type(product.name);
  cy.findByPlaceholderText(/description/i)
    .clear()
    .type(product.description);
  cy.findByPlaceholderText(/brand/i).clear().type(product.brand);
  cy.findByPlaceholderText(/category/i)
    .clear()
    .type(product.category);
  cy.findByPlaceholderText(/price/i).clear().type(product.price);
  cy.findByPlaceholderText(/stock/i).clear().type(product.stockCount);
  cy.findByRole("button", { name: /save/i }).click();
});
