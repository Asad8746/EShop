import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

const user = "1";
describe("Input Component", () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  let [type, label, placeholder, blur, error] = [
    "text",
    "testLabel",
    "testPlaceholder",
    false,
    "",
  ];
  const renderInput = () => {
    render(
      <Input
        placeholder={placeholder}
        label={label}
        id="test"
        type={type}
        onChange={onChange}
        blur={blur}
        onBlur={onBlur}
        error={error}
      />
    );
  };
  beforeEach(() => {
    [type, label, placeholder, blur, error] = [
      "text",
      "testLabel",
      "testPlaceholder",
      false,
      "",
    ];
  });
  it("must render text input", () => {
    renderInput();
    const input = screen.getByRole("textbox", {
      name: label,
    });
    expect(input).toHaveAttribute("type", "text");
  });
  it("must render text input with correct label", () => {
    renderInput();
    const input = screen.getByLabelText(label);
    expect(input).toBeVisible();
  });
  it("must change value of input like a user do", async () => {
    renderInput();
    const input = screen.getByRole("textbox", {
      name: label,
    });
    await userEvent.type(input, user, { delay: 200 });
    expect(onChange).toHaveBeenCalledWith(user);
  });
  it("must show error if there is any", async () => {
    blur = true;
    error = "Oops This is required";
    renderInput();
    const errorMessage = screen.getByText(new RegExp(error, "i"));
    expect(errorMessage).toBeVisible();
  });
  it("must render textArea based on type prop", () => {
    type = "textarea";
    renderInput();
    const input = screen.getByRole("textbox", {
      name: label,
    });

    expect(input).toBeVisible();
  });
});
