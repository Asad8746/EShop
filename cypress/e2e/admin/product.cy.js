describe("Product Section", () => {
  beforeEach(() => {
    cy.__init();
    cy.visit("/admin");
    cy.get(".tab-item__content")
      .contains(/products/i)
      .click();
  });
  afterEach(() => {
    cy.deleteData();
  });
  describe("Create Product Form", () => {
    beforeEach(() => {
      cy.findByRole("button", {
        name: /new product/i,
      }).click();
    });
    it("must create a new product if all inputs are valid", function () {
      const product = this.product;
      cy.createProduct();
      cy.findByRole("heading", {
        name: new RegExp(product.name, "i"),
      }).should("be.visible");
    });
  });
  it("can delete Product", function () {
    const product = this.products[0];
    cy.get(".product-card")
      .contains(new RegExp(product.name, "i"))
      .parent()
      .findByRole("button", { name: /delete/i })
      .click();
    cy.location("href").then((url) => {
      const id = url.split("/").pop();
      cy.findByRole("button", { name: /yes/i }).click();
      cy.request({
        url: `/api/products/${id}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  it("can edit Product", function () {
    const product = this.products[0];
    const editProduct = this.product;
    cy.get(".product-card")
      .contains(new RegExp(product.name, "i"))
      .parent()
      .findByRole("button", { name: /edit/i })
      .click();
    cy.editProduct();
    cy.findByRole("heading", {
      name: new RegExp(editProduct.name, "i"),
    }).should("be.visible");
  });
});
