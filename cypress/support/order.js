Cypress.Commands.add("addProductToCart", function () {
  this.products.slice(0, 2).forEach((product, idx) => {
    cy.findByText(new RegExp(product.name, "i")).click();
    cy.findByRole("button", { name: /add to cart/i }).click();
    cy.visit("/");
  });
});

Cypress.Commands.add("fillShippingAddress", function () {
  const shippingAddress = this.shippingAddress;
  cy.findByPlaceholderText(/address/i).type(shippingAddress.address);
  cy.findByPlaceholderText(/city/i).type(shippingAddress.city);
  cy.findByPlaceholderText(/post/i).type(shippingAddress.postalCode);
  cy.findByPlaceholderText(/country/i).type(shippingAddress.country);
});

Cypress.Commands.add("fillDetailsForOrder", function () {
  cy.findByRole("button", { name: /checkout/i }).click();
  cy.fillShippingAddress();
  cy.findByRole("button", { name: /continue/i }).click();
});
Cypress.Commands.add("verifyDetails", function () {
  const shippingAddress = this.shippingAddress;
  let total = 0;
  Object.keys(shippingAddress).forEach((key) => {
    const value = shippingAddress[key];
    cy.findByText(new RegExp(value, "i")).should("be.visible");
  });
  this.products.slice(0, 2).forEach(({ name, price }) => {
    total += price;
    cy.findByText(new RegExp(name, "i")).should("be.visible");
    cy.get(".price").contains(new RegExp(`1 x ${price}`, "i"));
  });
  cy.findByText(`$${total}`).should("be.visible");
});

Cypress.Commands.add("order", function (paymentType) {
  cy.findByTestId(paymentType).click();
  cy.findByRole("button", { name: /continue/i }).click();
  cy.verifyDetails();
  cy.findByRole("button", { name: /place/i }).click();
  cy.visit("/orders");
  cy.get(".order-card").first().click();
  cy.verifyDetails();
  cy.get("p").contains(paymentType).should("be.visible");
});
