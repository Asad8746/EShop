describe("Auth Page/Signup Form", () => {
  beforeEach(function () {
    cy.importData();
    cy.getUsersFixture();
    cy.visit("/auth");
    cy.get("label").contains(/sign/i).click();
  });
  afterEach(() => {
    cy.deleteData();
  });
  describe("if Inputs are valid", function () {
    it("will login user if all inputs are valid", function () {
      const user = this.user;
      cy.formRegisterUser(user);
      cy.findByText(new RegExp(user.name, "i")).should("be.visible");
    });
    it("will show error message if user with given email is already a registered user", function () {
      const user = this.users[0];
      cy.formRegisterUser(user);
      cy.findByText(/Email Already Registered/i).should("be.visible");
    });
  });
});
