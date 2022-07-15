describe("Create Order", () => {
  beforeEach(() => {
    cy.__init();
    cy.visit("/");
    cy.addProductToCart();
    cy.visit("/cart");
  });
  afterEach(() => {
    cy.deleteData();
  });
  describe("if all Valid Information is Provided", () => {
    beforeEach(() => {
      cy.fillDetailsForOrder();
    });
    it("User can Create an Order with multiple Products using CashOnDelivery(cod) as payment Method ", function () {
      cy.order("cod");
    });
    it("User can Create an Order with multiple Products using paypal as payment Method ", function () {
      cy.order("paypal");
    });
  });
});
