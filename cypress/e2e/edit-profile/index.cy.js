describe("Edit Profile", function () {
  beforeEach(function () {
    cy.__init();
    cy.visit("/user/edit");
  });
  afterEach(() => {
    cy.deleteData();
  });
  it("must allow user to edit their profile information", function () {
    const name = "test_user";
    const password = "12345";
    cy.findByPlaceholderText(/name/i).clear().type(name);
    cy.findByPlaceholderText(/password/i).type(password);
    cy.findByRole("button", { name: /save/i }).click();
    cy.findByText(new RegExp(name, "i")).should("be.visible");
    cy.reload();
    cy.findByText(new RegExp(name, "i")).should("be.visible");
  });
});
