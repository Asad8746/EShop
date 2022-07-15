describe("Auth Page/Signup Form", () => {
  beforeEach(function () {
    cy.importData();
    cy.getUsersFixture();
    cy.visit("/auth");
    cy.get("label").contains(/login/i).click();
  });
  afterEach(() => {
    cy.deleteData();
  });
  describe("if Inputs are valid", () => {
    it("will login user if all inputs are valid", function () {
      const user = this.users[0];
      cy.formLogin(user);
      cy.findByText(new RegExp(user.name, "i")).should("be.visible");
    });
    it("will show error message if user is not a registered user", function () {
      const user = this.users[2];
      cy.formLogin(user);
      cy.findByText(/invalid email or password/i).should("be.visible");
    });
  });
});
