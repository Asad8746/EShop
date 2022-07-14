import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test-utils";
import { SignupForm } from "../SignupForm";

describe("SignupForm", () => {
  it("must render with disabled button", () => {
    customRender(<SignupForm />);
    const button = screen.getByRole("button", { name: /signup/i });
    expect(button).toBeDisabled();
  });
  it("must show error if name,email,password is not given and hide errors if inputs are valid", async () => {
    let [name, email, password] = ["", "", ""];
    customRender(<SignupForm />);
    // finding inputs on screen
    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getAllByPlaceholderText(/password/i)[0];
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm/i);
    const button = screen.getByRole("button", { name: /signup/i });
    // Click Events so that i can check whether component show error messages when blur event occurs
    fireEvent.click(nameInput);
    fireEvent.click(emailInput);
    fireEvent.click(passwordInput);
    // Blur Events
    fireEvent.blur(nameInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);
    // Finding ErrorMessages on Screen to check if they are visible on screen
    let nameErrorMessage = screen.getByText(/name is not suppose to be empty/i);
    let emailErrorMessage = screen.getByText(/email is not suppose to empty/i);
    const passwordErrorMessage = screen.getByText(
      /password is not suppose to be empty/i
    );
    expect(nameErrorMessage).toBeVisible();
    expect(emailErrorMessage).toBeVisible();
    expect(passwordErrorMessage).toBeVisible();
    // expecting button is still disable
    expect(button).toBeDisabled();
    // checking if email is invalid whether it show error Message for it or not?
    email = "asad";
    await userEvent.type(emailInput, email);
    emailErrorMessage = screen.getByText(/invalid email/i);
    // expectation for invalid Email error Message
    expect(emailErrorMessage).toBeVisible();
    expect(button).toBeDisabled();
    // Happy Path for my test
    name = "Asad khan";
    email = "asad@gmail.com";
    password = "12345";
    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    // Checking if confirmPassword and password are not same it show error or not?
    await userEvent.type(confirmPasswordInput, "asad");
    fireEvent.blur(confirmPasswordInput);
    const confirmPasswordMessage = screen.getByText(
      /confirm password must match password/i
    );
    expect(confirmPasswordMessage).toBeVisible();
    expect(button).toBeDisabled();
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, password);
    // Checking if all inputs are valid then no error messages must be shown and button must be enabled
    expect(nameErrorMessage).not.toBeVisible();
    expect(emailErrorMessage).not.toBeVisible();
    expect(passwordErrorMessage).not.toBeVisible();
    expect(confirmPasswordMessage).not.toBeVisible();
    expect(button).toBeEnabled();
  });
});
