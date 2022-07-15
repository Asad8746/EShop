describe("Users Section", () => {
  beforeEach(() => {
    cy.__init();
    cy.visit("/admin");
  });
  it("can delete User", function () {
    const user = this.users[1];
    cy.findByRole("cell", { name: new RegExp(user.email, "i") })
      .parent()
      .find(".trash")
      .click();
    cy.findByRole("button", { name: /yes/i }).click();
    cy.url().should("include", "/admin");
    cy.findByRole("cell", { name: /asad@gmail\.com/i }).should("not.exist");
  });
  it("can remove a User as an Admin", function () {
    const user = this.users[1];
    cy.findByRole("cell", { name: new RegExp(user.email, "i") })
      .parent()
      .findByRole("checkbox")
      .click();
    cy.reload();
    cy.findByRole("cell", { name: new RegExp(user.email, "i") })
      .parent()
      .findByRole("checkbox")
      .should("not.be.checked");
  });
});
