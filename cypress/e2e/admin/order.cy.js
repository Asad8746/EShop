describe("Order Section", () => {
  beforeEach(() => {
    cy.__init();
    cy.visit("/admin");
    cy.get(".tab-item__content")
      .contains(/orders/i)
      .click();
  });
  afterEach(() => {
    cy.deleteData();
  });
  it("can mark Order as Delivered", () => {
    cy.get(".order-card")
      .first()
      .findByRole("button", { name: /delivered/i })
      .click();
    cy.get(".order-card__status")
      .contains(/delivered/i)
      .should("be.visible");
    cy.get(".order-card")
      .first()
      .findByRole("button", { name: /delivered/i })
      .should("be.disabled");
  });
  it("can mark Order as Paid", () => {
    cy.get(".order-card")
      .first()
      .findByRole("button", { name: /paid/i })
      .click();
    cy.get(".order-card__status").contains(/paid/i).should("be.visible");
    cy.get(".order-card")
      .first()
      .findByRole("button", { name: /paid/i })
      .should("be.disabled");
  });
});
