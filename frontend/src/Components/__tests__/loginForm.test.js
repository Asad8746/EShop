import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test-utils";
import { LoginForm } from "../LoginForm";

describe("LoginForm", () => {
  it("must render with disabled button", () => {
    customRender(<LoginForm />);
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeDisabled();
  });
  it("must render both inputs for email and password", () => {
    customRender(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
  });
  it("must show error if email or password is not given and hide errors if inputs are valid", async () => {
    let email = "";
    let password = "";
    customRender(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.click(emailInput);
    fireEvent.click(passwordInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);
    let emailErrorMessage = screen.getByText(/email is not suppose to empty/i);
    const passwordErrorMessage = screen.getByText(
      /password is not suppose to be empty/i
    );
    expect(emailErrorMessage).toBeVisible();
    expect(passwordErrorMessage).toBeVisible();
    expect(button).toBeDisabled();
    email = "asad";
    await userEvent.type(emailInput, email);
    emailErrorMessage = screen.getByText(/invalid email/i);
    expect(passwordErrorMessage).toBeVisible();
    expect(emailErrorMessage).toBeVisible();
    expect(button).toBeDisabled();
    email = "asad@gmail.com";
    password = "12345";
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    expect(emailErrorMessage).not.toBeVisible();
    expect(passwordErrorMessage).not.toBeVisible();
    expect(button).toBeEnabled();
  });
});
