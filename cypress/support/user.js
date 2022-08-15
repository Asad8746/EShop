Cypress.Commands.add("getUsersFixture", function () {
  cy.fixture("users.json").then(({ users, user, shippingAddress }) => {
    this.users = users;
    this.user = user;
    this.shippingAddress = shippingAddress;
  });
});
Cypress.Commands.add("formLogin", function (user) {
  cy.findByPlaceholderText(/email/i).type(user.email);
  cy.findByPlaceholderText(/password/i).type(user.password);
  cy.findByRole("button", { name: /login/i }).click();
});
Cypress.Commands.add("formRegisterUser", function (user) {
  cy.findByPlaceholderText(/name/i).type(user.name);
  cy.findByPlaceholderText(/email/i).type(user.email);
  cy.findAllByPlaceholderText(/password/i)
    .first()
    .type(user.password);
  cy.findByPlaceholderText(/confirm/i).type(user.confirmPassword);
  cy.findByRole("button", { name: /sign/i }).click();
});

Cypress.Commands.add(
  "login",
  function (email = "", password = "", populateContext = false) {
    const user = this.users[0];
    cy.request("POST", "/api/user/login", {
      email: email || user.email,
      password: password || user.password,
    }).then((response) => {
      const authHeader = `Bearer ${response.headers["authorization"]}`;
      if (authHeader) {
        localStorage.setItem("authorization", authHeader);
        cy.reload();
      }
      this.loginResponse = response;
    });
  }
);
